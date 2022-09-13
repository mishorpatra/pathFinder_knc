import React from "react";
import config from "../config";
import { connect } from "react-redux";
import { floorList, imgDetails, getAllElements } from "../store/actions/index";
import { css } from "emotion";
import Drawer from "react-drag-drawer";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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

var counter = 1;

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
      isLoading: false,
      allNodes: [],
      list: [],
      flrList: [],
      buildingName: "",
      imgList: null,
      srcName: "none",
      srcFloor: "none",
      srcVal: null,
      dstVal: null,
      srcFloorL: null,
      srcFloorB: null,
      dstName: "none",
      dstFloor: "none",
      dstFloorL: null,
      dstFloorB: null,
      sameFloor: true,
      scale: 5.6,
      lastX: 0,
      lastY: 0,
      scaleFactor: 0,
      canvas: null,
      img1: null,
      ctx: null,
      x: 0,
      y: 0,
      sidebarLeft: false,
      slide: false,
      showLayer: false,
      showContent: false,
      canvasList: true,
      loaded: true,
      markerVal:null,
      defSrc:"Starting Point",
      defDst:"Destination"
    };

    this.num_floors = 0;
    this.allGrids = [];
    this.graph = null;
    this.flrLists = [];
    this.fileList = [];
    this.lastX = 0;
    this.lastY = 0;
    this.dragStart = 0;
    this.dragged = false;
    this.ctx = null;
    this.canvas = null;
    this.img1 = null;
    this.shortestPath = [];
    this.grids = [];
    this.visited = [];
    this.minimumCost = [];
    this.leaves = [];
    this.flrConn = [];
    this.evCache = [];
    //Zoom
    this.canvas = null;
    this.context = null;
    this.position = {
      x: 0,
      y: 0
    };
    this.scale = {
      x: 0.5,
      y: 0.5
    };
    this.img = null;
    this.lastDistance = null;
    this.lastX = null;
    this.mdown = false;
    this.init = false;
    this.imgDiv = null;
    this.lastZoomVal = 1;
    this.lastCompletedZoom = null;
    this.left = null;
    this.mid = null;
    this.zoomType = 1;
    this.touchX = 0;
    this.touchY = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  componentDidMount() {
    let name = window.location.href.split("=")[1];
    this.buildingName = name.split("&&")[0];
    localStorage.setItem("buildingName", this.buildingName);
    var markerVal = window.location.href.split("=")[2];
    var destination = localStorage.getItem("destination");
    let destVal = localStorage.getItem("dstVal");
    let destFloor = localStorage.getItem("dstFloor");
    this.props.floorList(this.buildingName, () => {
      this.num_floors = this.props.fList[0].num_floors;
      for (let i = 0; i < this.props.fList.length; i++) {
        this.flrLists.push(this.props.fList[i].floor);
        this.fileList.push(this.props.fList[i].fileName);
      }
    });
    this.props.getAllElements(() => {
      let nodes = this.props.allNodes[0].nodes;
      let filterNodes =   nodes.filter(e => e.name !== "undefined" );
      let nFilter =   filterNodes.filter(e => e.name !== "" );
      let fFilter =   nFilter.filter(e => e.name !== undefined );
      if((markerVal !== undefined) && (destination !== null || destination!==undefined)){
        for (let i = 0; i < nodes.length; i++) {
          if (markerVal === nodes[i].MACID) {
            let ind = this.findFloor(nodes[i].floor, this.props.fList);
            this.setState({
              markerVal:markerVal,
              srcName:nodes[i].name,
              dstName:destination,
              defSrc:nodes[i].name,
              srcFloor:nodes[i].floor,
              defDst:`${destination}`,
              srcFloorL: this.props.fList[ind].floorL,
              srcFloorB: this.props.fList[ind].floorB,
              dstFloorL:localStorage.getItem('dstFloorL'),
              dstFloorB:localStorage.getItem('dstFloorB'),
              srcVal:parseInt(nodes[i].node),
              dstVal:parseInt(destVal),
              dstFloor:destFloor,
              showContent:true
            },()=>{
              this.handleSubmit();
            })
          }
        }
      }
      this.setState({
        allNodes: fFilter
      });
      let lists = [];
      let numVert = 0;
      let fc = new Map();
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].floorElement === "FloorConnection") {
          numVert++;
          let v = nodes[i].type + "," + nodes[i].name;
          let val = nodes[i].floor + "," + nodes[i].node;
          if (fc.has(v) === false) {
            fc.set(v, [val]);
          } else {
            fc.get(v).push(val);
          }
        }
      }
      this.graph = new Graph(numVert + 2);
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].name) {
          let sel = nodes[i];
          lists.push(sel);
        }
        if (nodes[i].floorElement === "FloorConnection") {
          let val = nodes[i].floor + "," + nodes[i].node;
          this.graph.addVertex(val);
        }
        if (nodes[i].floorElement === "Floor") {
          if (nodes[i].length === 8) {
            let v = nodes[i].frConn[0].split(",");
            let flrMatrix = nodes[i].flr_dist_matrix[0].split(",");
            let len = v.length / 2;
            if (v.length % 2 === 0) {
              for (let j = 0; j < v.length; j = j + 2) {
                let val =
                  parseInt(nodes[i].length) * parseInt(v[j + 1]) +
                  parseInt(v[j]);
                let vert1 = nodes[i].floor + "," + val;
                for (let k = j + 2; k < v.length; k = k + 2) {
                  val =
                    parseInt(nodes[i].length) * parseInt(v[k + 1]) +
                    parseInt(v[k]);
                  let vert2 = nodes[i].floor + "," + val;
                  this.graph.addEdge(
                    vert1,
                    vert2,
                    flrMatrix[len * (j / 2) + k / 2],
                    true
                  );
                }
              }
            } else {
            }
          }
          this.allGrids.push(nodes[i]);
        }
      }

      let getKeys = fc.keys();
      for (let i of getKeys) {
        let getValues = fc.get(i);
        let cnt = 0;
        let prev = null;
        for (let j of getValues) {
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

  srcChange = e => {
    let name = null;
    let val = null;
    let floor = null;
    let nodes = this.props.allNodes[0];
    if (e.length > 0) {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if (e[0].name === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
      let ind = this.findFloor(floor, this.props.fList);
      this.setState(
        {
          srcName: name,
          srcFloor: floor,
          srcVal: parseInt(val),
          srcFloorL: this.props.fList[ind].floorL,
          srcFloorB: this.props.fList[ind].floorB
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
    if (e.length > 0) {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if (e[0].name === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
      localStorage.setItem("destination",name)
      localStorage.setItem("dstVal",val)
      let ind = this.findFloor(floor, this.props.fList);
      
      localStorage.setItem("dstFloor",floor)
      localStorage.setItem("dstFloorL",this.props.fList[ind].floorL)
      localStorage.setItem("dstFloorB",this.props.fList[ind].floorL)

      this.setState(
        {
          dstName: name,
          dstFloor: floor,
          dstVal: parseInt(val),
          dstFloorL: this.props.fList[ind].floorL,
          dstFloorB: this.props.fList[ind].floorB,
          slide: true,
          scale: 3.6,
          loaded:false
        },
        () => {
          if(this.state.showContent){
            this.handleSubmit();
          }else{
            setTimeout(()=>{
              this.setState({
                showContent:true
              },()=>{
                this.handleSubmit() 
              })
            }, 1000);  
          }
        }
      );
    }
  };

  findFloor = (key, array) => {
    if (array !== undefined) {
      for (let i = 0; i < array.length; i++) {

        if (array[i].floor === key) {
          return i;
        }
      }
    }
    return -1;
  };

  handleSubmit = () => {
    let {
      srcVal,
      srcFloor,
      dstFloor,
      dstVal,
      srcFloorL,
      srcFloorB
    } = this.state;
    if (srcVal !== null && dstVal !== null) {
      let divImg = this.refs.mydiv1;
      let divCan = this.refs.mydiv;
      if (srcFloor === dstFloor) {
        let ind = this.findFloor(srcFloor, this.props.fList);
        this.props.getImage[1] = "";
        let img1 = new Image();
        this.props.imgDetails(
          localStorage.getItem('buildingName'),
          srcFloor,
          this.props.fList[ind].fileName,
          () => {
            this.setState({
              sameFloor: true,
              loaded:true
            },()=>{
              img1.src = `${config.imgUrl}${this.props.getImage[1]}`;
              let len = divImg.childNodes.length;
              for (let i = 0; i < len; i++) {
                divImg.childNodes[0].remove();
              }
              len = divCan.childNodes.length;
              for (let i = 0; i < len; i++) {
                divCan.childNodes[0].remove();
              }
            });
          }
        );
        img1.hidden = true;
        this.img1 = img1;
        this.img = img1;
        divImg.appendChild(img1);
        var ctx = document.getElementById("myCanvassrc");
        if (ctx.getContext) {
          ctx = ctx.getContext("2d");
          var canvas = ctx.canvas;
          this.canvas = canvas;
          this.ctx = ctx;
          this.context = ctx;
          let colorCanvas = this.colorCanvas;
          let me = this;
          let destX = this.state.dstVal % this.state.dstFloorL;
          let destY = parseInt(this.state.dstVal / this.state.dstFloorL);
          let imgDiv = document.getElementById("myImage");
          this.imgDiv = imgDiv;
          img1.onload = () => {
            ctx.drawImage(
              imgDiv,
              0,
              0,
              imgDiv.width,
              imgDiv.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            this.trackTransforms(ctx);
            this.lastX = destX;
            this.lastY = destY;
            this.setState({
              scaleFactor: 1.1,
              canvas: canvas,
              img1: img1,
              ctx: ctx
            });
            this.zoom(1);
          };
          
          if (!this.init) {
            if (this.imgDiv.width) {
              var scaleRatio = null;
              if (this.canvas.clientWidth > this.canvas.clientHeight) {
                scaleRatio = this.canvas.clientWidth / this.imgDiv.width;
              } else {
                scaleRatio = this.canvas.clientHeight / this.imgDiv.height;
              }
              this.scale.x = scaleRatio;
              this.scale.y = scaleRatio;
              this.init = true;
            }
          }
        }
      } else {
        this.setState({
          sameFloor: false,
          loaded:true
        });

        this.refs.canv.style.display = "none";
        this.findPath();
      }
    }
  };
  findPath = () => {
    var srcvert =
      this.state.srcFloor + "," + this.state.srcVal + "," + "virtual";
    var dstvert =
      this.state.dstFloor + "," + this.state.dstVal + "," + "virtual";
    if (this.graph.hasvertex(srcvert)) {
    } else {
      this.graph.addVertex(srcvert);
      let nodes = this.props.allNodes[0].nodes;
      this.flrconn = [];
      for (var i = 0; i < nodes.length; i++) {
        if (
          nodes[i].floor == this.state.srcFloor &&
          nodes[i].floorElement == "FloorConnection"
        ) {
          var coord = nodes[i].coordinates.split(",");
          var vert = nodes[i].floor + "," + nodes[i].node;
          this.flrconn.push([coord[0], coord[1], vert]);
        }
      }
      this.callWhile(
        this.state.srcFloor,
        this.state.srcVal,
        this.state.srcFloorL,
        this.state.srcFloorB,
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
          nodes[i].floor == this.state.dstFloor &&
          nodes[i].floorElement == "FloorConnection"
        ) {
          var coord = nodes[i].coordinates.split(",");
          var vert = nodes[i].floor + "," + nodes[i].node;
          this.flrconn.push([coord[0], coord[1], vert]);
        }
      }
      this.callWhile(
        this.state.dstFloor,
        this.state.dstVal,
        this.state.dstFloorL,
        this.state.dstFloorB,
        null,
        null,
        false,
        null
      );
    }
    this.specialCallWhile(
      this.state.srcfloor,
      srcvert,
      this.state.dstfloor,
      dstvert
    );
  };

  specialCallWhile(srcfloor, srcvert, dstfloor, dstvert) {
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
    this.createCanvas(shortestpath.get(dstvert), false);
  }
  createCanvas(list, sameFloor) {
    if (sameFloor === false) {
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
        var ind1 = this.findFloor(i, this.props.fList);
        var ind = this.findFloor(i, this.allGrids);
        floorLlist.push(this.allGrids[ind].length);
        clist.push({
          id: cnt,
          scale: 10,
          floorL: this.allGrids[ind].length,
          floorB: this.allGrids[ind].breadth
        });
        cnt++;
      }
      this.setState({
        canvasList: clist
      });
      this.callImage(0, ans, cnt, clist, floorLlist);
    }
  }

  callmark(ans, floorLlist) {
    var get_keys = ans.keys();
    var cnt = 0;
    for (var i of get_keys) {
      var canvasid = "canvas" + cnt;
      var get_val = ans.get(i);
      for (var j of get_val) {
        this.colorCanvasSpl(j, canvasid, "#bbbdbf", floorLlist[cnt]);
      }

      cnt++;
    }
  }

  callImage(cnt, ans, count, clist, floorLlist) {
    if (cnt === count - 1) {
      var i = Array.from(ans.keys())[cnt];
      var ind = this.findFloor(i, this.props.fList);
      var ctx = document.getElementById("mydiv");
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
            var index = me.findFloor(i, me.allGrids);
            var m = me.allGrids[index].length;
            var n = me.allGrids[index].breadth;
            for (var j = 0; j < get_val.length - 1; j++) {
              var dest_x = get_val[j + 1] % m;
              var dest_y = parseInt(get_val[j + 1] / m);
              me.callWhile(i, get_val[j], m, n, dest_x, dest_y, true, id);
            }
            var node_count = 0;
            for (var j of get_val) {
              if (node_count == get_val.length - 1) {
                me.colorCanvasSpl(j, id, "green", floorLlist[cnt]);
              } else {
                me.colorCanvasSpl(j, id, "yellow", floorLlist[cnt]);
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
      var ind = this.findFloor(i, this.props.fList);
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
            var index = me.findFloor(i, me.allGrids);
            var m = me.allGrids[index].length;
            var n = me.allGrids[index].breadth;
            for (var j = 0; j < get_val.length - 1; j++) {
              var dest_x = get_val[j + 1] % m;
              var dest_y = parseInt(get_val[j + 1] / m);
              me.callWhile(i, get_val[j], m, n, dest_x, dest_y, true, id);
            }
            var node_count = 0;
            for (var j of get_val) {
              if (node_count == 0 && cnt == 0) {
                me.colorCanvasSpl(j, id, "red", floorLlist[cnt]);
              } else {
                me.colorCanvasSpl(j, id, "yellow", floorLlist[cnt]);
              }
              node_count++;
            }
            me.props.getImage[1] = "";
            cnt++;
            me.callImage(cnt, ans, count, clist, floorLlist);
            loaded = true;
          }
        };
      }
    }
  }
  colorCanvas = (i, place, color) => {
    if (place === "srcmap") {
      let { srcFloorL, scale } = this.state;
      var canvas = document.getElementById("myCanvassrc");
      var context = canvas.getContext("2d");
      var animate = document.getElementById("animate");
      var ctx = animate.getContext("2d");
      this.trackTransforms(ctx);
      var posX = scale * (i % srcFloorL);
      var posY = scale * parseInt(i / srcFloorL);
      var halfScale = scale / 2;
      posX = posX + halfScale;
      posY = posY + halfScale;
      let angle = 0;
if(color === "green"){
  // context.save();
  // context.beginPath();
  // context.arc(posX, posY, scale, 0, 2 * Math.PI);
  // context.fillStyle = color;
  // context.fill();
  // context.restore();
  var pin = { x:posX, y:posY, color:"green" };

  context.save();
  context.translate(pin.x,pin.y);

  context.beginPath();
  context.moveTo(0,0);
  context.bezierCurveTo(2,-10,-20,-25,0,-30);
  context.bezierCurveTo(20,-25,-2,-10,0,0);
  context.fillStyle=pin.color;
  context.fill();
  context.strokeStyle="black";
  context.lineWidth=1.5;
  context.stroke();
  context.beginPath();
  context.arc(0,-21,3,0,Math.PI*2);
  context.closePath();
  context.fillStyle="black";
  context.fill();

  context.restore();

}else{
  let factor = Math.pow(this.state.scaleFactor, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(factor, factor);
  ctx.translate(-this.lastX, -this.lastY);
  requestAnimationFrame(animateFunction);
        function animateFunction() {
          var p1 = ctx.transformedPoint(0, 0);
          var p2 = ctx.transformedPoint(animate.width, animate.height);
          ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, animate.width, animate.height);
          ctx.restore();
          ctx.beginPath();
          var radius = scale + 5* Math.abs(Math.cos(angle));
          ctx.arc(posX,posY, radius, 0, Math.PI * 2, false);
          ctx.closePath();
          // color in the circle
          ctx.fillStyle = "red";
          ctx.fill();
          angle += Math.PI / 64;
          requestAnimationFrame(animateFunction);
        }
}
    } else {
      let { dstFloorL, scale } = this.state;
      let canvas = document.getElementById("myCanvasdst");
      let context = canvas.getContext("2d");
      let posX = scale * (i % dstFloorL);
      let posY = scale * parseInt(i / dstFloorL);
      context.fillStyle = color;
      context.fillRect(posX, posY, scale, scale);
    }
  };

  colorCanvasSpl = (i, canvasid, color, srcfloorL) => {
    let { scale } = this.state;
    var canvas = document.getElementById(canvasid);
    var context = canvas.getContext("2d");
    var pos_x = scale * (i % srcfloorL);
    var pos_y = scale * parseInt(i / srcfloorL);
    if(color ==="green"){
      context.fillStyle = color;
      context.fillRect(pos_x, pos_y, scale, scale);
    }else{
      var img=new Image() 

      img.src= "/assets/images/lift.svg" 
      context.drawImage(img,pos_x,pos_y,50,50); 

      context.fillStyle = color;
      context.fillRect(pos_x, pos_y, scale, scale);
    }
 
  };

  callWhile(srcfloor, srcVal, m, n, dest_x, dest_y, single, canvasid) {
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
      this.shortestPath.push(row4);
      this.grids.push(row);
      this.visited.push(row1);
      this.minimumCost.push(row3);
    }
    var ind1 = this.findFloor(srcfloor, this.allGrids);
    if (this.allGrids[ind1].grid_1 != null) {
      for (let i = 0; i < this.allGrids[ind1].grid_1.length; i++) {
        var nodes = this.allGrids[ind1].grid_1[i].split(",");
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
    this.shortestPath[src_x][src_y].push([src_x, src_y]);
    this.minimumCost[src_x][src_y] = 0;
    while (this.leaves.length > 0) {
      min = Number.MAX_VALUE;
      minleave = this.leaves[0];
      min = this.minimumCost[minleave[0]][minleave[1]];
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
              this.minimumCost[parseInt(this.flrconn[ch][0])][
                parseInt(this.flrconn[ch][1])
              ],
              true
            );
          }
          this.resetVar();
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
            this.minimumCost[j][k] >
            this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              )
          ) {
            this.minimumCost[j][k] =
              this.minimumCost[minleave[0]][minleave[1]] +
              Math.sqrt(
                (minleave[0] - j) * (minleave[0] - j) +
                  (minleave[1] - k) * (minleave[1] - k)
              );
            this.shortestPath[j][k] = this.shortestPath[minleave[0]][
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
      for (var i = 0; i < this.shortestPath[dest_x][dest_y].length; i = i + 2) {
        context.beginPath();
        var half_scale = scale / 2;
        var pos_x = scale * this.shortestPath[dest_x][dest_y][i][0];
        var pos_y = scale * this.shortestPath[dest_x][dest_y][i][1];
        pos_x = pos_x + half_scale;
        pos_y = pos_y + half_scale;
        context.arc(pos_x, pos_y, scale / 2, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = "#669df6";
        context.strokeStyle = "#3077dd";
        context.stroke();
      }
      this.resetVar();
    }
  }

  resetVar = () => {
    this.grids = [];
    this.visited = [];
    this.shortestPath = [];
    this.minimumCost = [];
    this.leaves = [];
    this.props.getImage[1] = "";
  };

  redraw = (img1, canvas, ctx) => {
    // Clear the entire canvas
    let { srcVal, srcFloor, dstVal, srcFloorL, srcFloorB } = this.state;
    var p1 = this.ctx.transformedPoint(0, 0);
    var p2 = this.ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    let destX = this.state.dstVal % this.state.dstFloorL;
    let destY = parseInt(this.state.dstVal / this.state.dstFloorL);
    this.callWhile(
      srcFloor,
      srcVal,
      srcFloorL,
      srcFloorB,
      destX,
      destY,
      true,
      "myCanvassrc"
    );
    this.colorCanvas(srcVal, "srcmap", "red");
    this.colorCanvas(dstVal, "srcmap", "green");
    // this.handleSubmit();
  };
  //
  mouseDown = evt => {
    let { canvas } = this.state;
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
      "none";
    if (canvas !== null) {
      this.lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
      this.lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
      this.dragStart = this.ctx.transformedPoint(this.lastX, this.lastY);
      this.dragged = false;
    }
    return false;
  };

  mouseMove = evt => {
    let { img1, ctx, canvas } = this.state;
    if (this.state.canvas !== null) {
      this.lastX = evt.offsetX || evt.pageX - this.canvas.offsetLeft;
      this.lastY = evt.offsetY || evt.pageY - this.canvas.offsetTop;
      this.dragged = true;
      if (this.dragStart) {
        var pt = this.ctx.transformedPoint(this.lastX, this.lastY);
        this.ctx.translate(pt.x - this.dragStart.x, pt.y - this.dragStart.y);
        this.redraw(img1, canvas, ctx);
      }
    }
    return false;
  };

  mouseUp = evt => {
    this.dragStart = null;
    if (!this.dragged) {
      this.zoom(evt.shiftKey ? -1 : 1);
    }
    return false;
  };
  
  DOMouseScroll = () => {
    this.handleScroll();
    return false;
  };

  mouseWheel = evt => {
    this.handleScroll(evt);
    return false;
  };

  zoom = clicks => {
    let { img1, ctx, canvas } = this.state;
    let factor = Math.pow(this.state.scaleFactor, clicks);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(factor, factor);
    this.ctx.translate(-this.lastX, -this.lastY);
    this.redraw(img1, canvas, ctx);
  };

  panZoom = zoomFactor => {
    let { img1, ctx, canvas } = this.state;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(zoomFactor, zoomFactor);
    this.ctx.translate(-this.lastX, -this.lastY);
    this.redraw(img1, canvas, ctx);
  };

  handleScroll = evt => {
    var delta = evt.deltaY ? evt.deltaY / 40 : evt.detail ? -evt.detail : 0;
    if (delta) this.zoom(delta);
    return evt.preventDefault() && false;
  };

  touchStart = e => {
    if (e.targetTouches.length === 1) {
      var p1 = e.targetTouches[0];
      var rect = e.target.getBoundingClientRect();
      let x = e.changedTouches[0].pageX - rect.width / 2;
      let y = e.changedTouches[0].pageY - rect.height / 2;
      this.touchX = x;
      this.touchY = y;
    } else if (e.targetTouches.length === 2) {
      let p1 = e.targetTouches[0];
      let p2 = e.targetTouches[1];
      this.lastDistance = Math.sqrt(
        Math.pow(p2.pageX - p1.pageX, 2) + Math.pow(p2.pageY - p1.pageY, 2)
      );
    }
    this.dragStart = this.ctx.transformedPoint(this.touchX, this.touchY);
    this.dragged = false;
  };

  touchMove = e => {
    e.preventDefault();
    if (e.targetTouches.length === 2) {
      this.gesturePinchZoom(e);
    } else if (e.targetTouches.length === 1) {
      if (this.state.canvas !== null) {
        var rect = e.target.getBoundingClientRect();
        this.dragged = true;
        var relativeX = e.changedTouches[0].clientX - rect.width / 2;
        var relativeY = e.changedTouches[0].clientY - rect.height / 2;
        if (this.dragStart) {
          var pt = this.ctx.transformedPoint(relativeX, relativeY);
          this.ctx.translate(pt.x - this.dragStart.x, pt.y - this.dragStart.y);
          this.redraw(this.img1, this.canvas, this.ctx);
        }
      }
    }
  };

  touchEnd = e => {
    let p1 = e.changedTouches[0];
    var rect = e.target.getBoundingClientRect();
    let x = e.changedTouches[0].pageX - rect.width / 2;
    let y = e.changedTouches[0].pageY - rect.height / 2;
    this.touchX = x;
    this.touchY = y;
  };

  doZoom = zoom => {
    if (!zoom) return;
    //new scale
    var currentScale = this.scale.x;
    var newScale = this.scale.x + zoom / 100;
    //some helpers
    var deltaScale = newScale - currentScale;
    var currentWidth = this.imgDiv.width * this.scale.x;
    var currentHeight = this.imgDiv.height * this.scale.y;
    var deltaWidth = this.imgDiv.width * deltaScale;
    var deltaHeight = this.imgDiv.height * deltaScale;
    var canvasmiddleX = this.canvas.clientWidth / 2;
    var canvasmiddleY = this.canvas.clientHeight / 2;
    var xonmap = -this.position.x + canvasmiddleX;
    var yonmap = -this.position.y + canvasmiddleY;
    var coefX = -xonmap / currentWidth;
    var coefY = -yonmap / currentHeight;
    var newPosX = this.position.x + deltaWidth * coefX;
    var newPosY = this.position.y + deltaHeight * coefY;

    //edges cases
    var newWidth = currentWidth + deltaWidth;
    var newHeight = currentHeight + deltaHeight;

    if (newWidth < this.canvas.clientWidth) return;
    if (newPosX > 0) {
      newPosX = 0;
    }
    if (newPosX + newWidth < this.canvas.clientWidth) {
      newPosX = this.canvas.clientWidth - newWidth;
    }

    if (newHeight < this.canvas.clientHeight) return;
    if (newPosY > 0) {
      newPosY = 0;
    }
    if (newPosY + newHeight < this.canvas.clientHeight) {
      newPosY = this.canvas.clientHeight - newHeight;
    }

    //finally affectations
    this.scale.x = newScale;
    this.scale.y = newScale;
    this.position.x = newPosX;
    this.position.y = newPosY;
  };

  gesturePinchZoom = e => {
    let zoom = false;
    if (e.targetTouches.length >= 2) {
      let p1 = e.targetTouches[0];
      let p2 = e.targetTouches[1];
      let distance = Math.sqrt(
        Math.pow(p2.pageX - p1.pageX, 2) + Math.pow(p2.pageY - p1.pageY, 2)
      ); //euclidian distance

      if (this.left === null) {
        this.left = distance;
      } else if (this.mid === null) {
        this.mid = distance;
      } else {
        let right = distance;
        if (this.mid < this.left && this.mid < right) {
          this.zoomType = -1;
          this.lastDistance = this.mid;
        } else if (this.mid > this.left && this.mid > right) {
          this.zoomType = 1;
          this.lastDistance = this.mid;
        } else if (this.mid > this.left && this.mid < right) {
          this.zoomType = 1;
        } else if (this.mid < this.left && this.mid > right) {
          this.zoomType = -1;
        }

        this.left = this.mid;
        this.mid = distance;
      }

      counter++;
      if (counter % 10 === 0) {
        let screenDiagLength = Math.sqrt(
          Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
        );
        let zoomVal =
          (Math.abs(distance - this.lastDistance) / screenDiagLength) * 10;
        if (this.lastCompletedZoom === zoomVal) {
          return;
        } else {
          this.lastCompletedZoom = zoomVal;
        }

        if (this.zoomType === 1) {
          this.lastZoomVal += zoomVal;
        } else {
          this.lastZoomVal -= zoomVal;
        }

        this.lastZoomVal = Math.abs(this.lastZoomVal);
        if (this.lastZoomVal < 1) {
          this.lastZoomVal = 1;
        }
        this.panZoom(this.lastZoomVal);
      }
    }
    return zoom;
  };

  doMove = (relativeX, relativeY) => {
    if (this.lastX && this.lastY) {
      var deltaX = relativeX - this.lastX;
      var deltaY = relativeY - this.lastY;
      var currentWidth = this.img.width * this.scale.x;
      var currentHeight = this.img.height * this.scale.y;
      this.position.x += deltaX;
      this.position.y += deltaY;
      if (this.position.x > 0) {
        this.position.x = 0;
      } else if (this.position.x + currentWidth < this.canvas.clientWidth) {
        this.position.x = this.canvas.clientWidth - currentWidth;
      }
      if (this.position.y > 0) {
        this.position.y = 0;
      } else if (this.position.y + currentHeight < this.canvas.clientHeight) {
        this.position.y = this.canvas.clientHeight - currentHeight;
      }
    }
    this.lastX = relativeX;
    this.lastY = relativeY;
    this.animate();
  };

  animate = () => {
    if (!this.init) {
      if (this.state.srcVal) {
        if (this.imgDiv.width) {
          var scaleRatio = null;
          if (this.canvas.clientWidth > this.canvas.clientHeight) {
            scaleRatio = this.canvas.clientWidth / this.imgDiv.width;
          } else {
            scaleRatio = this.canvas.clientHeight / this.imgDiv.height;
          }
          this.setState({
            scale: scaleRatio
          });
          this.scale.x = scaleRatio;
          this.scale.y = scaleRatio;
          this.init = true;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let imgDiv = document.getElementById("myImage");
        this.redraw(this.img, this.canvas, this.ctx);
        imgDiv.onload = () => {
          this.ctx.drawImage(
            imgDiv,
            0,
            0,
            imgDiv.width,
            imgDiv.height,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
        };
        this.ctx.drawImage(
          this.img,
          this.position.x,
          this.position.y,
          this.canvas.width,
          this.canvas.height
        );
      }
    }
  };

  trackTransforms = ctx => {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function() {
      return xform;
    };
    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function() {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };
    var restore = ctx.restore;
    ctx.restore = function() {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };
    var scale = ctx.scale;
    ctx.scale = function(sx, sy) {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };
    var rotate = ctx.rotate;
    ctx.rotate = function(radians) {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(ctx, radians);
    };

    var translate = ctx.translate;
    ctx.translate = function(dx, dy) {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };

    var transform = ctx.transform;
    ctx.transform = function(a, b, c, d, e, f) {
      var m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a, b, c, d, e, f) {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    ctx.transformedPoint = function(x, y) {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
  };

  toggle = (type, value) => event => {
    this.setState(state => {
      return {
        [type]: value
      };
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
          var factor = Math.pow(this.state.scaleFactor, 1);
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);

          this.ctx.scale(factor, factor);
          this.ctx.translate(-this.lastX, -this.lastY);
          // this.redraw(img1,canvas,ctx);

          this.redraw(this.img1, this.canvas, this.ctx);
          // this.handleSubmit();
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
          var factor = Math.pow(this.state.scaleFactor, 1);
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);

          this.ctx.scale(factor, factor);
          this.ctx.translate(-this.lastX, -this.lastY);
          this.redraw(this.img1, this.canvas, this.ctx);
          // this.handleSubmit();
        }
      );
    }
  };

  render() {
    const { sidebarLeft } = this.state;
    return (
      <div>
        <nav
          className={
            "shadow-sm navbar navbar-light bg-dark navigation " +
            (this.state.slide ? "slide" : "")
          }
          style={{
            background: "linear-gradient(to bottom , #09203f, #1d4a6d  )"
          }}
        >
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
            </div>
            <div class="">
              <div className="d-flex">
                <div className="">
                  <Typeahead
                    placeholder={`${this.state.defSrc}`}
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
                    className="reduce"
                  />
                </div>
                <i class="text-white fa fa-ellipsis-h ml-1 mt-2" style={{fontSize:"24px",color:"red"}}></i>
                <div className="">
                  <Typeahead
                    placeholder={`${this.state.defDst}`}
                    isLoading={this.state.isLoading}
                    required
                    filterBy={["name"]}
                    labelKey={option => `${option.name}`}
                    onChange={this.dstChange}
                    disabled={false}
                    id="type"
                    value={this.state.dstName}
                    options={this.state.allNodes}
                    className="reduce1"
                    name="list"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="floor-lists d-flex">
       <a href="https://inclunav.apps.iitd.ac.in/ar/"><i class="fa fa-camera ml-1 mt-1" style={{fontSize:"24px",color:"#d9e3f7"}}></i></a> 
{this.state.flrList.map(r=>{
  if(this.state.srcFloor === r){
    return <div className="floor current done text-capitalize">{r}</div>
  }else{
    return <div className="floor text-capitalize">{r}</div>
  }
})}
          </div>
        {this.state.showContent ? (
          <div className="mt-1 canvaDiv">
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
            </div>
            <img
              alt="map"
              id="myImage"
              src={`${config.imgUrl}${this.props.getImage[1]}`}
              style={{ position: "absolute", zIndex: "-1" }}
              hidden={true}
            ></img>
            <div className="canvaDiv" ref="canv" onScroll={this.handleScroll}>
              <canvas
                id="myCanvassrc"
                width={this.state.scale * this.state.srcFloorL}
                height={this.state.scale * this.state.srcFloorB}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseMove={this.mouseMove}
                DOMouseScroll={this.DOMouseScroll}
                onWheel={this.mouseWheel}
                onTouchMove={this.touchMove}
                onTouchStart={this.touchStart}
                onTouchEnd={this.touchEnd}
                style={{
                  border: "1px solid #ca2d2d",
                  position: "absolute",
                  zIndex: "0"
                }}
                hidden={!this.state.sameFloor}
              />
              <canvas
                id="animate"
                width={this.state.scale * this.state.srcFloorL}
                height={this.state.scale * this.state.srcFloorB}
                style={{
                  border: "1px solid #ca2d2d",
                  position: "absolute",
                  zIndex: "0"
                }}
                hidden={!this.state.sameFloor}
              />
            </div>
            <div ref="mydiv1" id="mydiv1"></div>
            <div ref="mydiv" id="mydiv"></div>
          </div>
        ) :<div className="d-flex justify-content-center" style={{marginTop:"50%"}}> {this.state.loaded?
          <p class="ml-5 lead">Please select Starting Point and Destination</p>:<Loader
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        // timeout={3000} //3 secs
        />}</div>}
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
