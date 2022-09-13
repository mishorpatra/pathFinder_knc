import React from "react";
import config from "../config";
import { connect } from "react-redux";
import { floorList, imgDetails, getAllElements } from "../store/actions/index";
import { css } from "emotion";
import Drawer from "react-drag-drawer";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Link } from "react-router-dom";
import LayerModal from './LayerModal';

const Card = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 40px auto;

  @media (min-width: 768px) {
    border-radius: 0;
  }

  button {
    margin-top: 50px;
  }
`;



const modal = css`
  position: absolute;
  top: 30px;
  background-color: white;
  width: 100%;
  max-width: 700px;
  min-height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Sidebar = css`
  ${modal} top: 0;
  max-width: 300px;
  border-radius: 0;
  left: 0;
  background: linear-gradient(to bottom, #09203f, #1d4a6d);
`;

class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
    this.Adjweights = new Map();
  }
  addVertex(v) {
    this.AdjList.set(v, []);
    this.Adjweights.set(v, []);
  }
  hasvertex(v) {
    return this.AdjList.has(v);
  }
  edges(v) {
    return this.AdjList.get(v);
  }
  addEdge(v, w, wt, undir) {
    if (undir) {
      this.AdjList.get(v).push(w);
      this.Adjweights.get(v).push(wt);
      this.AdjList.get(w).push(v);
      this.Adjweights.get(w).push(wt);
    } else {
      this.AdjList.get(v).push(w);
      this.Adjweights.get(v).push(wt);
    }
  }

  printGraph() {
    var get_keys = this.AdjList.keys();
    for (var i of get_keys) {
      var get_values = this.AdjList.get(i);
      var val = this.Adjweights.get(i);
      var conc = "";
      var conc2 = "";
      for (var j of get_values) conc += j + " ";
      for (var j of val) conc2 += j + " ";
    }
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildingName: "",
      srcName: "none",
      srcfloor: "none",
      dstfloor: "none",
      list: [],
      dstName: "none",
      srcVal: null,
      dstVal: null,
      scale: 2.6,
      srcfloorL: null,
      srcfloorB: null,
      dstfloorL: null,
      dstfloorB: null,
      samefloor: true,
      canvaslist: [],
      ind: 0,
      sideDrawerOpen: false,
      flrList: [],
      isLoading: false,
      sidebarLeft: false,
      srcList: [],
      dstList: [],
      srDisable: false,
      dstDisable: true,
      slide: false,
      showLayer:false,
      showContent:false,
      imgList:null,
      allNodes:[]
    };
    this.shortestPathVar = [];
    this.grids_all = [];
    this.grids = [];
    this.visited = [];
    this.shortestpath = [];
    this.minimumcost = [];
    this.leaves = [];
    this.graph = null;
    this.flrconn = [];
    this.num_floors = 0;
    this.ctx = null;
    this.canvas = null;
    this.img = null;
  }

  find_floor = (key, array) => {
    if (array !== undefined) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].floor === key) {
          return i;
        }
      }
    }
    return -1;
  };

  toggle = (type, value) => event => {
    this.setState(state => {
      return {
        [type]: value
      };
    });
  };

  color_canvas_spl = (i, canvasid, color, srcfloorL) => {
    let { scale } = this.state;
    var canvas = document.getElementById(canvasid);
    var context = canvas.getContext("2d");
    var pos_x = scale * (i % srcfloorL);
    var pos_y = scale * parseInt(i / srcfloorL);
    context.fillStyle = color;
    context.fillRect(pos_x, pos_y, scale, scale);
  };

  color_canvas = (i, place, color) => {
    if (place === "srcmap") {
      let { srcfloorL, scale } = this.state;
      var canvas = document.getElementById("myCanvassrc");
      var context = canvas.getContext("2d");

      var animate = document.getElementById("animate");
      var ctx = animate.getContext("2d");

      var pos_x = scale * (i % srcfloorL);
      var pos_y = scale * parseInt(i / srcfloorL);

      var half_scale = scale / 2;
      pos_x = pos_x + half_scale;
      pos_y = pos_y + half_scale;
      var x = scale,
        y = 0,
        value = 2;

      if (i === this.state.srcVal) {
        context.shadowBlur = 10;
        context.beginPath();
        context.shadowColor = "green";
        context.arc(pos_x, pos_y, scale, 0, 2 * Math.PI);
        context.fillStyle = "green";
        context.fill();
      } else {
        requestAnimationFrame(animateFunction);
        function animateFunction() {
          ctx.clearRect(0, 0, animate.width, animate.height);
          ctx.beginPath();
          ctx.shadowBlur = 10;
          ctx.shadowColor = "black";
          ctx.beginPath();
          ctx.shadowColor = "#8b1200";
          ctx.arc(pos_x, pos_y, x / 3, 0, 2 * Math.PI);
          ctx.fillStyle = "#8b1200";
          ctx.fill();
          if (x >= 0) {
            x += value;
            if (x > 15) {
              y += value;
              x -= value;
            }
          }
          if (y > 175) {
            x = scale;
            y = 0;
          }
          requestAnimationFrame(animateFunction);
        }
      }
    } else {
      let { dstfloorL, scale } = this.state;
      var canvas = document.getElementById("myCanvasdst");
      var context = canvas.getContext("2d");
      var pos_x = scale * (i % dstfloorL);
      var pos_y = scale * parseInt(i / dstfloorL);
      context.fillStyle = color;
      context.fillRect(pos_x, pos_y, scale, scale);
    }
  };

  srcChange = e => {
    let name = null;
    let val = null;
    let floor = null;
    let file = null;
    let nodes = this.props.allNodes[0];
    let nodes_n = this.props.allNodes[0].nodes;
    if (e.length > 0) {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if (e[0].name === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
      var ind = this.find_floor(floor, this.props.fList);
      this.setState(
        {
          srcName: name,
          srcfloor: floor,
          srcVal: parseInt(val),
          srcfloorL: this.props.fList[ind].floorL,
          srcfloorB: this.props.fList[ind].floorB
        },
        () => {
          this.handleSubmit();
        }
      );
    }
  };

  dstChange = e => {
    let name = null;
    let val = null;
    let floor = null;
    let nodes = this.props.allNodes[0];
    let nodes_n = this.props.allNodes[0].nodes;
    if (e.length > 0) {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if (e[0].name === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
      var ind = this.find_floor(floor, this.props.fList);
      this.setState(
        {
          dstName: name,
          dstfloor: floor,
          dstVal: parseInt(val),
          dstfloorL: this.props.fList[ind].floorL,
          dstfloorB: this.props.fList[ind].floorB,
          slide:true,
          showContent:true,
          scale:9.6
        },
        () => {
          this.handleSubmit();
        }
      );
    }
  };

  componentDidMount() {
    const img = new Image();
    const url = window.location.href;
    this.buildingName = null;
    this.floor = null;
    this.file = null;
    this.flrLists = [];
    this.fileList = [];
    try {
      let name = url.split("=")[1];
      this.buildingName = name.split("&&")[0];
    } catch {
      this.buildingName = null;
      this.file = null;
    }
    if (this.buildingName) {
      localStorage.clear();
      localStorage.setItem("buildingName", this.buildingName);
      this.props.floorList(this.buildingName, () => {
        this.num_floors = this.props.fList[0].num_floors;
        for (let i = 0; i < this.props.fList.length; i++) {
          this.flrLists.push(this.props.fList[i].floor);
          this.fileList.push(this.props.fList[i].fileName)
        }
      });
      this.grids_all = [];
      this.props.getAllElements(() => {
        let nodes = this.props.allNodes[0].nodes;
        this.setState({
          allNodes:nodes
        })
        let lists = [];
        let num_vert = 0;
        let fc = new Map();
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].floorElement === "FloorConnection") {
            num_vert++;
            var v = nodes[i].type + "," + nodes[i].name;
            var val = nodes[i].floor + "," + nodes[i].node;
            if (fc.has(v) === false) {
              fc.set(v, [val]);
            } else {
              fc.get(v).push(val);
            }
          }
        }
        this.graph = new Graph(num_vert + 2);
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].name) {
            var sel = nodes[i];
            lists.push(sel);
          }
          if (nodes[i].floorElement === "FloorConnection") {
            var val = nodes[i].floor + "," + nodes[i].node;
            this.graph.addVertex(val);
          }
          if (nodes[i].floorElement === "Floor") {
            if (nodes[i].length == 8) {
              var v = nodes[i].frConn[0].split(",");
              var flrmatrix = nodes[i].flr_dist_matrix[0].split(",");
              var len = v.length / 2;
              if (v.length % 2 === 0) {
                for (var j = 0; j < v.length; j = j + 2) {
                  var val =
                    parseInt(nodes[i].length) * parseInt(v[j + 1]) +
                    parseInt(v[j]);
                  var vert1 = nodes[i].floor + "," + val;
                  for (var k = j + 2; k < v.length; k = k + 2) {
                    val =
                      parseInt(nodes[i].length) * parseInt(v[k + 1]) +
                      parseInt(v[k]);
                    var vert2 = nodes[i].floor + "," + val;
                    this.graph.addEdge(
                      vert1,
                      vert2,
                      flrmatrix[len * (j / 2) + k / 2],
                      true
                    );
                  }
                }
              } else {
              }
            }
            this.grids_all.push(nodes[i]);
          }
        }
        var get_keys = fc.keys();
        for (var i of get_keys) {
          var get_values = fc.get(i);
          var cnt = 0;
          var prev = null;
          for (var j of get_values) {
            if (cnt > 0) {
              this.graph.addEdge(prev, j, 0, true);
              prev = j;
            }
            if (cnt === 0) {
              prev = j;
            }
            cnt++;
          }
        }
        this.setState({
          list: lists,
          flrList: this.flrLists,
          buildingName: this.buildingName,
          imgList: this.fileList
        });
      });
    }
  }

  find = (key, array) => {
    if (array !== undefined) {
      for (let i = 0; i < array.length; i++) {
        if (parseInt(array[i].node) === key) {
          return i;
        }
      }
    }
    return -1;
  };
  find_fl = (key, array) => {
    if (array !== undefined) {
      for (let i = 0; i < array.length; i++) {
        if (
          parseInt(array[i].node) === key &&
          array[i].floor === "floorconnection"
        ) {
          return i;
        }
      }
    }
    return -1;
  };

  handleSubmit = () => {
    let { srcVal, srcfloor, dstfloor, dstVal } = this.state;
    if (srcVal != null && dstVal != null) {
      var divimg = document.getElementById("mydiv1");
      var divcan = document.getElementById("mydiv");
      var animate = document.getElementById("animate");

      var len = divimg.childNodes.length;
      for (var i = 0; i < len; i++) {
        var elem = divimg.childNodes[0].remove();
      }
      len = divcan.childNodes.length;
      for (var i = 0; i < len; i++) {
        var elem = divcan.childNodes[0].remove();
      }

      if (srcfloor === dstfloor) {
        this.setState({
          samefloor: true
        });
        var ind = this.find_floor(srcfloor, this.props.fList);

        this.props.getImage[1] = "";
        var img1 = new Image();

        this.props.imgDetails(
          this.state.buildingName,
          srcfloor,
          this.props.fList[ind].fileName,
          () => {
            img1.src = `${config.imgUrl}${this.props.getImage[1]}`;
          }
        );
        img1.hidden = true;
        divimg.appendChild(img1);
        var ctx = document.getElementById("myCanvassrc");
        if (ctx.getContext) {
          ctx = ctx.getContext("2d");
          var canvas = ctx.canvas;
          var img1 = document.getElementById("myImage");
          var color_canvas = this.color_canvas;
          var me = this;
          var dest_x = this.state.dstVal % this.state.dstfloorL;
          var dest_y = parseInt(this.state.dstVal / this.state.dstfloorL);
          img1.onload = function() {
            ctx.drawImage(
              img1,
              0,
              0,
              img1.width,
              img1.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            // ctx.scale(this.state.scale, this.state.scale);
            // ctx.translate(dest_x, dest_y);
              me.trackTransforms(ctx)
              me.zoom(img1,canvas,ctx);
            // me.callwhile(
            //   me.state.srcfloor,
            //   me.state.srcVal,
            //   me.state.srcfloorL,
            //   me.state.srcfloorB,
            //   dest_x,
            //   dest_y,
            //   true,
            //   "myCanvassrc"
            // );
            // color_canvas(srcVal, "srcmap", "red");
            // color_canvas(dstVal, "srcmap", "green");
          };
        }
      } else {
        this.setState({
          samefloor: false
        });
        this.findpath();
      }
    } else {
    }
  };

  findpath() {
    var srcvert =
      this.state.srcfloor + "," + this.state.srcVal + "," + "virtual";
    var dstvert =
      this.state.dstfloor + "," + this.state.dstVal + "," + "virtual";
    if (this.graph.hasvertex(srcvert)) {
    } else {
      this.graph.addVertex(srcvert);
      let nodes = this.props.allNodes[0].nodes;
      this.flrconn = [];
      for (var i = 0; i < nodes.length; i++) {
        if (
          nodes[i].floor == this.state.srcfloor &&
          nodes[i].floorElement == "FloorConnection"
        ) {
          var coord = nodes[i].coordinates.split(",");
          var vert = nodes[i].floor + "," + nodes[i].node;
          this.flrconn.push([coord[0], coord[1], vert]);
        }
      }
      this.callwhile(
        this.state.srcfloor,
        this.state.srcVal,
        this.state.srcfloorL,
        this.state.srcfloorB,
        null,
        null,
        false,
        null
      );
    }
    if (this.graph.hasvertex(dstvert)) {
    } else {
      this.graph.addVertex(dstvert);
      let nodes = this.props.allNodes[0].nodes;
      this.flrconn = [];
      for (var i = 0; i < nodes.length; i++) {
        if (
          nodes[i].floor == this.state.dstfloor &&
          nodes[i].floorElement == "FloorConnection"
        ) {
          var coord = nodes[i].coordinates.split(",");
          var vert = nodes[i].floor + "," + nodes[i].node;
          this.flrconn.push([coord[0], coord[1], vert]);
        }
      }
      this.callwhile(
        this.state.dstfloor,
        this.state.dstVal,
        this.state.dstfloorL,
        this.state.dstfloorB,
        null,
        null,
        false,
        null
      );
    }
    this.specialcallwhile(
      this.state.srcfloor,
      srcvert,
      this.state.dstfloor,
      dstvert
    );
  }
  specialcallwhile(srcfloor, srcvert, dstfloor, dstvert) {
    var min = Number.MAX_VALUE;
    var minleave = null;
    var var_i;
    var notthere;
    let shortestpath = new Map();
    let visited = new Map();
    let minimumcost = new Map();
    let leaves = [];
    var get_keys = this.graph.AdjList.keys();
    for (var i of get_keys) {
      minimumcost.set(i, min);
      visited.set(i, false);
    }

    leaves.push(srcvert);
    shortestpath.set(srcvert, [srcvert]);
    minimumcost.set(srcvert, 0);
    this.graph.printGraph();
    while (leaves.length > 0) {
      min = Number.MAX_VALUE;
      for (let i = 0; i < leaves.length; i++) {
        if (min > minimumcost.get(leaves[i])) {
          min = minimumcost.get(leaves[i]);
          minleave = leaves[i];
          var_i = i;
        }
      }
      visited.set(minleave, true);

      if (minleave === dstvert) {
        break;
      }
      leaves.splice(var_i, 1);
      var get_values = this.graph.AdjList.get(minleave);
      var get_dist = this.graph.Adjweights.get(minleave);
      for (var jj = 0; jj < get_values.length; jj++) {
        var j = get_values[jj];
        var l = j.split(",");
        var neighbour = false;
        if (l.length == 2) {
          neighbour = true;
        } else if (l.length == 3) {
          if (j == dstvert) {
            neighbour = true;
          }
        }
        if (visited.get(j) == false && neighbour) {
          if (minimumcost.get(j) > minimumcost.get(minleave) + get_dist[jj]) {
            minimumcost.set(j, minimumcost.get(minleave) + get_dist[jj]);
            var dum = [];
            dum = shortestpath.get(minleave);
            dum = dum.concat([j]);
            shortestpath.set(j, dum);
            notthere = 1;
            for (var p = 0; p < leaves.length; p++) {
              if (leaves[p] == j) {
                notthere = 0;
              }
            }
            if (notthere == 1) {
              leaves.push(j);
            }
          }
        }
      }
    }
    this.createcanvas(shortestpath.get(dstvert), false);
  }
  createcanvas(list, samefloor) {
    if (samefloor === false) {
      let ans = new Map();
      for (var i = 0; i < list.length; i++) {
        var e = list[i].split(",");
        if (ans.has(e[0])) {
          ans.get(e[0]).push(e[1]);
        } else {
          ans.set(e[0], [e[1]]);
        }
      }
      var get_keys = ans.keys();
      let clist = [];
      let floorLlist = [];
      var cnt = 0;
      for (var i of get_keys) {
        var ind1 = this.find_floor(i, this.props.fList);
        var ind = this.find_floor(i, this.grids_all);
        floorLlist.push(this.grids_all[ind].length);
        clist.push({
          id: cnt,
          scale: 10,
          floorL: this.grids_all[ind].length,
          floorB: this.grids_all[ind].breadth
        });
        cnt++;
      }
      this.setState({
        canvaslist: clist
      });
      this.callimage(0, ans, cnt, clist, floorLlist);
    }
  }
  callmark(ans, floorLlist) {
    var get_keys = ans.keys();
    var cnt = 0;
    for (var i of get_keys) {
      var canvasid = "canvas" + cnt;
      var get_val = ans.get(i);
      for (var j of get_val) {
        this.color_canvas_spl(j, canvasid, "#bbbdbf", floorLlist[cnt]);
      }

      cnt++;
    }
  }
  
  callimage(cnt, ans, count, clist, floorLlist) {
    if (cnt === count - 1) {
      var i = Array.from(ans.keys())[cnt];
      var ind = this.find_floor(i, this.props.fList);
      var ctx = document.getElementById("mydiv");
      var canvas = document.createElement("canvas");
      var canvas = document.createElement("canvas");
      canvas.id = "canvas" + cnt;
      canvas.width = this.state.scale * clist[cnt].floorL;
      canvas.height = this.state.scale * clist[cnt].floorB;
      canvas.style.margin = "10px";
      canvas.style.border = "1px solid";
      ctx.appendChild(canvas);
      ctx = canvas;
      if (ctx.getContext) {
        ctx = ctx.getContext("2d");
        var canvas = ctx.canvas;
        var div = document.getElementById("mydiv1");
        this.props.getImage[1] = "";
        var img1 = new Image();

        this.props.imgDetails(
          this.state.buildingName,
          i,
          this.props.fList[ind].fileName,
          () => {
            img1.src = `${config.imgUrl}${this.props.getImage[1]}`;
          }
        );
        img1.hidden = true;
        div.appendChild(img1);
        var me = this;
        var get_val = ans.get(i);
        var loaded = false;
        img1.onload = function() {
          if (loaded === false) {
            ctx.drawImage(
              img1,
              0,
              0,
              img1.width,
              img1.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            var id = "canvas" + cnt;
            var index = me.find_floor(i, me.grids_all);
            var m = me.grids_all[index].length;
            var n = me.grids_all[index].breadth;
            for (var j = 0; j < get_val.length - 1; j++) {
              var dest_x = get_val[j + 1] % m;
              var dest_y = parseInt(get_val[j + 1] / m);
              me.callwhile(i, get_val[j], m, n, dest_x, dest_y, true, id);
            }
            var node_count = 0;
            for (var j of get_val) {
              if (node_count == get_val.length - 1) {
                me.color_canvas_spl(j, id, "green", floorLlist[cnt]);
              } else {
                me.color_canvas_spl(j, id, "yellow", floorLlist[cnt]);
              }
              node_count++;
            }
            loaded = true;
          }
        };
      }
    } else {
      var loaded = false;
      var i = Array.from(ans.keys())[cnt];
      var ind = this.find_floor(i, this.props.fList);
      var ctx = document.getElementById("mydiv");
      var canvas = document.createElement("canvas");
      canvas.id = "canvas" + cnt;
      canvas.width = this.state.scale * clist[cnt].floorL;
      canvas.height = this.state.scale * clist[cnt].floorB;
      canvas.style.border = "1px solid";
      canvas.style.margin = "10px";
      ctx.appendChild(canvas);
      ctx = canvas;
      if (ctx.getContext) {
        ctx = ctx.getContext("2d");
        var canvas = ctx.canvas;
        var div = document.getElementById("mydiv1");
        var img1 = document.getElementById("myImage");
        this.props.getImage[1] = "";
        this.props.imgDetails(
          this.state.buildingName,
          i,
          this.props.fList[ind].fileName,
          () => {
            img1.src = `${config.imgUrl}${this.props.getImage[1]}`;
          }
        );
        var me = this;
        var get_val = ans.get(i);
        img1.onload = function() {
          if (loaded == false) {
            ctx.drawImage(
              img1,
              0,
              0,
              img1.width,
              img1.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            var id = "canvas" + cnt;
            var index = me.find_floor(i, me.grids_all);
            var m = me.grids_all[index].length;
            var n = me.grids_all[index].breadth;
            for (var j = 0; j < get_val.length - 1; j++) {
              var dest_x = get_val[j + 1] % m;
              var dest_y = parseInt(get_val[j + 1] / m);
              me.callwhile(i, get_val[j], m, n, dest_x, dest_y, true, id);
            }
            var node_count = 0;
            for (var j of get_val) {
              if (node_count == 0 && cnt == 0) {
                me.color_canvas_spl(j, id, "red", floorLlist[cnt]);
              } else {
                me.color_canvas_spl(j, id, "yellow", floorLlist[cnt]);
              }
              node_count++;
            }
            me.props.getImage[1] = "";
            cnt++;
            me.callimage(cnt, ans, count, clist, floorLlist);
            loaded = true;
          }
        };
      }
    }
  }
  callwhile(srcfloor, srcVal, m, n, dest_x, dest_y, single, canvasid) {
    var min = Number.MAX_VALUE;
    var minleave = [];
    var var_i;
    var notthere;
    for (let i = 0; i < m; i++) {
      var row = [],
        row1 = [],
        row3 = [],
        row4 = [];
      for (let j = 0; j < n; j++) {
        row.push(1);
        row1.push(-1);
        row3.push(Number.MAX_VALUE);
        var row5 = [];
        row4.push(row5);
      }
      this.shortestpath.push(row4);
      this.grids.push(row);
      this.visited.push(row1);
      this.minimumcost.push(row3);
    }
    var ind1 = this.find_floor(srcfloor, this.grids_all);
    if (this.grids_all[ind1].grid_1 != null) {
      for (let i = 0; i < this.grids_all[ind1].grid_1.length; i++) {
        var nodes = this.grids_all[ind1].grid_1[i].split(",");
        for (let j = 0; j < nodes.length; j++) {
          var val = nodes[j];
          var x = val % m;
          var y = parseInt(val / m);
          this.grids[x][y] = 0;
        }
      }
    }
    var src_x = srcVal % m;
    var src_y = parseInt(srcVal / m);
    let check_leaves = new Map();
    this.leaves.push([src_x, src_y]);
    check_leaves.set([src_x, src_y], 1);
    this.shortestpath[src_x][src_y].push([src_x, src_y]);
    this.minimumcost[src_x][src_y] = 0;
    while (this.leaves.length > 0) {
      min = Number.MAX_VALUE;
      minleave = this.leaves[0];
      min = this.minimumcost[minleave[0]][minleave[1]];
      var_i = 0;
      this.visited[minleave[0]][minleave[1]] = 1;
      if (single == true) {
        if (minleave[0] == dest_x && minleave[1] == dest_y) {
          break;
        }
      } else {
        var check = true;
        for (var ch = 0; ch < parseInt(this.flrconn.length); ch++) {
          if (
            this.visited[parseInt(this.flrconn[ch][0])][
              parseInt(this.flrconn[ch][1])
            ] == 1
          ) {
          } else {
            check = false;
          }
        }
        if (check == true) {
          for (var ch = 0; ch < parseInt(this.flrconn.length); ch++) {
            var vert = srcfloor + "," + srcVal + "," + "virtual";
            this.graph.addEdge(
              vert,
              this.flrconn[ch][2],
              this.minimumcost[parseInt(this.flrconn[ch][0])][
                parseInt(this.flrconn[ch][1])
              ],
              true
            );
          }
          this.reset_var();
          break;
        }
      }
      this.leaves.shift();
      var p1 = minleave[0],
        p2 = minleave[1];
      check_leaves.set(minleave, 0);
      var j;
      var k;
      if (p1 - 1 >= 0) {
        j = p1 - 1;
        k = p2;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
      if (p1 + 1 < m) {
        j = p1 + 1;
        k = p2;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
      if (p2 - 1 >= 0) {
        j = p1;
        k = p2 - 1;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
      if (p2 + 1 < n) {
        j = p1;
        k = p2 + 1;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
      if (p1 - 1 >= 0 && p2 - 1 >= 0) {
        j = p1 - 1;
        k = p2 - 1;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
      if (p1 - 1 >= 0 && p2 + 1 < n) {
        j = p1 - 1;
        k = p2 + 1;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
      if (p1 + 1 < m && p2 - 1 >= 0) {
        j = p1 + 1;
        k = p2 - 1;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
      if (p1 + 1 < m && p2 + 1 < n) {
        j = p1 + 1;
        k = p2 + 1;
        if (this.visited[j][k] == -1 && this.grids[j][k] == 1) {
          if (
            this.minimumcost[j][k] >
            this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestpath[j][k] = this.shortestpath[minleave[0]][
              minleave[1]
            ].concat([[j, k]]);
            var jk = [j, k];
            if (
              check_leaves.get(jk) == undefined ||
              check_leaves.get(jk) == 0
            ) {
              this.leaves.push(jk);
              check_leaves.set(jk, 1);
            }
          }
        }
      }
    }
    if (single == true) {
      let { scale } = this.state;
      var canvas = document.getElementById(canvasid);
      var context = canvas.getContext("2d");
      for (var i = 0; i < this.shortestpath[dest_x][dest_y].length; i = i + 2) {
        context.beginPath();
        var half_scale = scale / 2;
        var pos_x = scale * this.shortestpath[dest_x][dest_y][i][0];
        var pos_y = scale * this.shortestpath[dest_x][dest_y][i][1];
        pos_x = pos_x + half_scale;
        pos_y = pos_y + half_scale;
        context.arc(pos_x, pos_y, scale / 2, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = "#669df6";
        context.strokeStyle = "#3077dd";
        context.stroke();
      }
      this.reset_var();
    }
  }

  reset_var() {
    this.grids = [];
    this.visited = [];
    this.shortestpath = [];
    this.minimumcost = [];
    this.leaves = [];
    this.props.getImage[1] = "";
  }

  /* NAVIGATION DRAWER */
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  // FLOOR SELECTION
  selectSource = e => {
    let value = e.target.value;
    let srcList = this.state.list.filter(r => {
      return r.floor === value;
    });
    this.setState({
      srcfloor: value,
      srcName: null,
      srcList: srcList,
      srDisable: false
    });
  };

  selectDest = e => {
    let value = e.target.value;
    let dstList = this.state.list.filter(r => {
      return r.floor === value;
    });
    this.setState({
      dstfloor: value,
      dstName: null,
      dstList: dstList,
      dstDisable: false
    });
  };

  incCanvas = () => {
    var animate = document.getElementById("animate");
    var ctx = animate.getContext("2d");
    ctx.clearRect(0, 0, animate.width, animate.height);
    let { scale } = this.state;
    if (scale < 30) {
      this.setState(
        {
          scale: scale + 1
        },
        () => {
          this.handleSubmit();
        }
      );
    }
  };

  decCanvas = () => {
    let { scale } = this.state;
    var animate = document.getElementById("animate");
    var ctx = animate.getContext("2d");
    ctx.clearRect(0, 0, animate.width, animate.height);
    if (scale > 2) {
      this.setState(
        {
          scale: scale - 1
        },
        () => {
          this.handleSubmit();
        }
      );
    }
  };

  onSlide = (e)=>{
    this.setState({
        slide:true,
        flip:false
    })
  }

  showLayer = ()=>{
    let { showLayer } = this.state;
    this.setState({
      showLayer:!showLayer
    })
  }

  trackTransforms = (ctx) => {
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };
    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };
    var restore = ctx.restore;
    ctx.restore = function(){
      xform = savedTransforms.pop();
      return restore.call(ctx);
        };
    var scale = ctx.scale;
    ctx.scale = function(sx,sy){
      xform = xform.scaleNonUniform(sx,sy);
      return scale.call(ctx,sx,sy);
        };
    var rotate = ctx.rotate;
    ctx.rotate = function(radians){
        xform = xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
    };
  
    var translate = ctx.translate;
    ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };
  
    var transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };
  
    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };
  
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
  }

  zoom = (img,canvas,ctx)=>{
    // let {img1,ctx,canvas} = this.state;
    this.img = img;
    this.canvas  = canvas;
    this.ctx = ctx;
    let destX  = this.state.dstVal % this.state.dstfloorL;
    let destY = parseInt(this.state.dstVal / this.state.dstfloorB);
      var pt = ctx.transformedPoint(destX,destY);
      ctx.translate(500,500);
      var factor = Math.pow(1.1,1);
      ctx.scale(factor,factor);
      ctx.translate(-pt.x,-pt.y);
      this.redraw(img,canvas,ctx);
 
  }

  redraw=(img1,canvas,ctx)=>{
    // Clear the entire canvas
    let { srcVal,srcfloor,dstFloor,dstVal,srcfloorL,srcfloorB} = this.state;
    var p1 = ctx.transformedPoint(0,0);
    var p2 = ctx.transformedPoint(canvas.width,canvas.height);
    ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.restore();
    ctx.drawImage(
      img1,
      0,
      0,
      img1.width,
      img1.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    let destX  = this.state.dstVal % this.state.dstfloorL;
    let destY = parseInt(this.state.dstVal / this.state.dstfloorL);
    this.callwhile(srcfloor,srcVal,srcfloorL,srcfloorB,destX,destY,true,"myCanvassrc");
    this.color_canvas(srcVal,"srcmap","red");
    this.color_canvas(dstVal,"srcmap","green");
    // this.handleSubmit();
}

mouseMove = (evt)=>{
  let {img1,ctx,canvas} = this.state
  if(this.state.canvas !== null){
      this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
      this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
      this.dragged = true;
      if (this.dragStart){
        var pt = this.ctx.transformedPoint(this.lastX,this.lastY);
        this.ctx.translate(pt.x-this.dragStart.x,pt.y-this.dragStart.y);
        this.redraw(img1,canvas,ctx);
      }    
  }
  return false;
}

  render() {
    const { sidebarLeft } = this.state;
    return (
      <div>
        {this.state.showLayer?<LayerModal open={this.state.showLayer}/>:null}
        <nav className={"shadow-sm navbar navbar-light bg-dark navigation " + (this.state.slide? 'slide' : '') } style={{width:"75%",display:"flex",justifyContent: "center",marginLeft: "12.5%",marginTop: "12.5%",background: "linear-gradient(to bottom , #09203f, #1d4a6d  )"}} >
          <div className="d-flex">
            <div className="d-flex-column">
              <div className="flex-shrink-1 bd-highlight">
                <button
                  className="navbar-toggler hidden-sm-up float-xs-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={this.toggle("sidebarLeft", true)}
                >
                  <i
                    class="fa fa-bars text-white mt-1"
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>
                <Drawer
                  open={sidebarLeft}
                  onRequestClose={this.toggle("sidebarLeft", false)}
                  modalElementClass={Sidebar}
                  direction="left"
                >
                  <div className={Card}>
                    <div className=" navbar-menu-wrapper d-flex align-items-stretch">
                      <ul className="ml-3 navbar-nav navbar-nav-right">
                        <li className="mt-5 mb-3">
                          <Link to="/">
                            <span className="mb-3 h3 text-white">
                              <i className="fa fa-home mr-2"></i>Home
                            </span>
                          </Link>
                        </li>
                        <li className="mt-2 mb-3">
                          <Link to="/about-us">
                            <span className=" h3 text-white">
                              <i className="fa fa-group mr-2"></i>About Us
                            </span>
                          </Link>
                        </li>
                        <li className="mt-2 mb-3">
                          <Link to="/how-to-use">
                            <span className=" h3 text-white">
                              <i className="fa fa-info-circle mr-2"></i>How To
                              Use
                            </span>
                          </Link>
                        </li>
                        <li className="mt-2 mb-3">
                          <Link to="/feedback">
                            <span className=" h3 text-white">
                              <i className="fa fa-paper-plane-o mr-2"></i>Send
                              Feedback
                            </span>
                          </Link>
                        </li>
                        <li className="mt-2 mb-3">
                          <Link to="/support">
                            <span className=" h3 text-white">
                              <i className="fa fa-question-circle mr-2"></i>
                              Support
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Drawer>
              </div>
              <Link to="/">
                <i
                  class="fa fa-arrow-left text-white mt-2 ml-2"
                  style={{ fontSize: "24px" }}
                ></i>
              </Link>
            </div>
            <div className="w-100 bd-highlight">
              <div className="d-flex-column mr-2">
                <div className="d-flex mb-2">
                  <Typeahead
                    placeholder="Starting Point"
                    isLoading={this.state.isLoading}
                    required
                    filterBy={["name"]}
                    labelKey={option => `${option.name}`}
                    onChange={this.srcChange}
                    disabled={false}
                    id="type"
                    value={this.state.srcName}
                    options={this.state.allNodes}
                    name="list"
                  />
                 <Link to="ar"> <i class="text-white fa fa-bullseye mt-2 ml-2" style={{fontSize:"24px"}}></i></Link>
                </div>
                <div className="d-flex">
                  <Typeahead
                    placeholder="Destination Point"
                    isLoading={this.state.isLoading}
                    required
                    filterBy={["name"]}
                    labelKey={option => `${option.name}`}
                    onChange={this.dstChange}
                    disabled={false}
                    id="type"
                    value={this.state.dstName}
                    options={this.state.allNodes}
                    name="list"
                  />
                  <i class="text-white fa fa-map-marker mt-2 ml-2" style={{fontSize:"24px"}} ></i>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {this.state.showContent?
        <div className="mt-1 canvaDiv ">
        <div
          class="btn-group-vertical zoom "
          role="group"
          aria-label="Basic example"
          style={{ position: "fixed", zIndex: "5" }}
        >
          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.incCanvas}
          >
            <i class="fa fa-search-plus"></i>{" "}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.decCanvas}
          >
            <i class="fa fa-search-minus"></i>{" "}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.showLayer}
          >
            <i class="material-icons" >filter_none</i>
          </button>
        </div>
        <img
          alt="map"
          id="myImage"
          src={`${config.imgUrl}${this.props.getImage[1]}`}
          style={{ position: "absolute", zIndex: "-1" }}
          hidden={true}
        ></img>
        <div id="mydiv1"></div>
        <div className="canvaDiv" ref="canv" onScroll={this.handleScroll}>
          <canvas
            id="myCanvassrc"
            width={this.state.scale * this.state.srcfloorL}
            height={this.state.scale * this.state.srcfloorB}
            style={{
              border: "1px solid #ca2d2d",
              position: "absolute",
              zIndex: "0"
            }}
            onMouseMove = {this.mouseMove}
            hidden={!this.state.samefloor}
          ></canvas>
          <canvas
            id="animate"
            width={this.state.scale * this.state.srcfloorL}
            height={this.state.scale * this.state.srcfloorB}
            style={{
              border: "1px solid #ca2d2d",
              position: "absolute",
              zIndex: "0"
            }}
            hidden={!this.state.samefloor}
          ></canvas>
        </div>
        <div id="mydiv"></div>
      </div>        
        : 
        null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getImage: state.imgDetails,
    allNodes: state.getAllElem,
    fList: state.floorList
  };
};

export default connect(mapStateToProps, {
  floorList,
  imgDetails,
  getAllElements
})(Navigation);
