import React from "react";
import config from "../../config";
import { connect } from "react-redux";
import { floorList, imgDetails, getAllElements } from "../../store/actions/index";
import { css } from "emotion";
import Drawer from "react-drag-drawer";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Link } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from "react-modal";
import { withTranslation } from 'react-i18next';
import {AbsoluteOrientationSensor} from 'motion-sensors-polyfill'

const customStyles = {
  content: {
    top: "25%",
    left: "25%",
    right: "auto",
    bottom: "auto",
    position: "absolute",
    zIndex: "10"
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)"
  },
  overlay: { zIndex: 6 }
};

var options = {
  position: "relative",
  bottom: "32px", // default: '32px'
  right: "32px", // default: '32px'
  left: "unset", // default: 'unset'
  time: "0.5s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: false, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true // default: true
};

// const darkmode = new Darkmode(options);
// darkmode.showWidget();



const Card = css`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 768px) {
    border-radius: 0px;
  }
  button {
    margin-top: 50px;
  }
`;

const modal = css`
  position: absolute;
  top: 0;
  background-color: white;
  width: 100%;
  max-width: 700px;
  min-height: 15%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Sidebar = css`
  ${modal} top: 9%;
  max-width: 50px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  left: 0;
  background: #56c9ad;
`;

var special = [
  "base1",
  "ground",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelvth",
  "thirteenth",
  "fourteenth",
  "fifteenth",
  "sixteenth",
  "seventeenth",
  "eighteenth",
  "nineteenth"
];

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
      for (let j of get_values) {
        conc = conc + j + " ";
      }
      for (let j of val) {
        conc2 = conc2 + j + " ";
      }
    }
  }
}

class Kiosk3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      buildingName: "",
      srcName: "none",
      srcfloor: "none",
      dstfloor: "none",
      list: [],
      dstName: "none",
      srcVal: null,
      dstVal: null,
      scale: 5,
      srcfloorL: null,
      srcfloorB: null,
      dstfloorL: null,
      dstfloorB: null,
      samefloor: true,
      defDst: "Select Destination",
      canvaslist: [],
      defSrc: "Source",
      currentFloor: "none",
      ind: 0,
      sideDrawerOpen: false,
      flrList: [],
      isLoading: false,
      sidebarLeft: false,
      srcList: [],
      dstList: [],
      allNodes: [],
      disabled: false,
      showContent: false,
      loaded: true,
      readOnly: false,
      srcIndx: 0,
      anmIndx: 1,
      dstDisable: true,
      singleFloor: null,
      imgName: null,
      next: true,
      animation: false,
      showFloorList: true,
      hotLocationDisable: true,
      locateMeDisable: true,
      srcReadOnly: false,
      dstReadOnly: false,
      showTool: true,
      pathCaption: [],
      pathFloor: [],
      currentStep: 0,
      destination: null,
      actualAngle:0,
      pathDirection:0,
      magnetoMeter:0,
      floorAngle:0,
    };
    this.actualAngle = 0;
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
    this.fileList = [];
    this.ctx = null;
    this.context = null;
    this.imgDiv = null;
    this.dragStart = null;
    this.dragged = null;
    this.graph = null;
    this.instructions = [];
    this.show = 0;
    this.floorAngle = [];
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

  toggle = (type, value) => {
    this.setState({
      sidebarLeft: value,
      showTool: false
    });
  };

  color_canvas_spl = (i, canvasid, color, srcfloorL) => {
    let { scale } = this.state;
    let srcDiv = document.getElementById("srcImage");
    let dstDiv = document.getElementById("dstImage");

    let lift = document.getElementById("lift");
    let stairs = document.getElementById("stairs");

    var canvas = document.getElementById(canvasid);
    var context = canvas.getContext("2d");
    // var animate = document.getElementById("animate");
    // var ctx = animate.getContext("2d");
    // var pos_x = scale * (i % srcfloorL);
    // var pos_y = scale * parseInt(i / srcfloorL);
    let gpx, gpy;
    if (canvasid === "canvas0") {
      gpx = this.state.canvasWidth / this.state.srcfloorL;
      gpy = this.state.canvasHeight / this.state.srcfloorB;
    } else {
      gpx = this.state.canvasWidth / this.state.dstfloorL;
      gpy = this.state.canvasHeight / this.state.dstfloorB;
    }
    // let gpx = this.state.canvasWidth / this.state.srcfloorL;
    // let gpy = this.state.canvasHeight / this.state.srcfloorB;

    var pos_x = gpx * (i % srcfloorL);
    var pos_y = gpy * parseInt(i / srcfloorL);
    var halfScale = scale / 2;

    if (color === "yellow") {
      var rot = (Math.PI / 2) * 3;
      var x = pos_x;
      var y = pos_y;
      var step = Math.PI / 5;
      let frConnType = "";
      let data = this.props.allNodes[0].nodes;
      for (let k = 0; k < data.length; k++) {
        if (data[k].node === i) {
          frConnType = data[k].type;
        }
      }
      if (frConnType === "Stairs") {
        // var c = document.getElementById("myCanvas");
        // var ctx = c.getContext("2d");
        // var img = new Image();
        // img.src = '/assets/images/downfloorConnection.png';
        // img.onload = function() {
        //   context.drawImage(img,pos_x-25, pos_y-35,50,50);
        // }
        var half_scale = scale / 2;
        pos_x = pos_x + half_scale;
        pos_y = pos_y + half_scale;
        context.drawImage(stairs, pos_x-12.5, pos_y-6.25, 25, 25);
      } else if (frConnType === "Lift") {
        // var img = new Image();   // Create new img element
        // img.src = '/assets/images/UpLift.png';
        // img.onload = function() {
        //   context.drawImage(img,pos_x-25,pos_y-35,50,50);
        // }
        var half_scale = scale / 2;
        pos_x = pos_x + half_scale;
        pos_y = pos_y + half_scale;
        context.drawImage(lift,pos_x-12,pos_y+6.25, 25, 25);

        // context.drawImage(img,pos_x, pos_y,);
      }
    } else if (color === "green") {
      var half_scale = scale / 2;
      pos_x = pos_x + half_scale;
      pos_y = pos_y + half_scale;
      context.drawImage(dstDiv, pos_x - 15, pos_y - 25, 25, 25);
    } else {
      var half_scale = scale / 2;
      pos_x = pos_x + half_scale;
      pos_y = pos_y + half_scale;
      context.drawImage(srcDiv, pos_x - 15, pos_y - 25, 25, 25);
    }
  };

  color_canvas = (i, place, color) => {
    let srcDiv = document.getElementById("srcImage");
    let dstDiv = document.getElementById("dstImage");
    if (place === "srcmap") {
      let { srcfloorL, scale } = this.state;
      var canvas = document.getElementById("myCanvassrc");
      var context = canvas.getContext("2d");
      let gpx = this.state.canvasWidth / this.state.srcfloorL;
      let gpy = this.state.canvasHeight / this.state.srcfloorB;

      var posX = gpx * (i % srcfloorL);
      var posY = gpy * parseInt(i / srcfloorL);
      var halfScale = scale / 2;
      posX = posX + halfScale;
      posY = posY + halfScale;
      if (color === "green") {
        var half_scale = scale / 2;
        posX = posX + half_scale;
        posY = posY + half_scale;
        context.drawImage(dstDiv, posX - 15, posY - 25, 25, 25);
      } else {
        var half_scale = scale / 2;
        posX = posX + half_scale;
        posY = posY + half_scale;
        context.drawImage(srcDiv, posX - 15, posY - 25, 25, 25);
      }
    } else {
      let { dstfloorL, scale } = this.state;
      let canvas = document.getElementById("myCanvasdst");
      let context = canvas.getContext("2d");
      let posX = scale * (i % dstfloorL);
      let posY = scale * parseInt(i / dstfloorL);
      context.fillStyle = color;
      context.fillRect(posX, posY, scale, scale);
    }
  };

  srcChange = e => {
    let name = null;
    let val = null;
    let floor = null;
    let file = null;
    let nodes = this.props.allNodes[0];
    let nodes_n = this.props.allNodes[0].nodes;
    let { flrList } = this.state;
    if (e.length > 0) {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if (
          e[0].name === nodes.nodes[i].name &&
          e[0].floor === nodes.nodes[i].floor
        ) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
      let utterance = new SpeechSynthesisUtterance(`You are at ${name}`);
      if (this.state.dstName === "none") {
        let utterance = new SpeechSynthesisUtterance(
          "Please select your destination"
        );
      }
      var ind = this.find_floor(floor, this.props.fList);
      if (floor === flrList[1]) {
        flrList.reverse();
      }
      var ind1 = this.find_floor(floor, this.props.fList);

      this.props.imgDetails(
        this.state.buildingName,
        floor,
        this.props.fList[ind1].fileName,
        () => {
          // this.set
          this.setState(
            {
              srcName: name,
              srcfloor: floor,
              srcVal: parseInt(val),
              defSrc: name,
              srcfloorL: this.props.fList[ind].floorL,
              srcfloorB: this.props.fList[ind].floorB,
              disabled: true,
              flrList,
              readOnly: true,
              dstDisable: false,
              imgName: this.props.getImage[1],
              currentFloor: floor,
              animation: true,
              hotLocationDisable: false,
              srcReadOnly: true,
              dstReadOnly: false,
              pathCaption: [],
              pathFloor: [],
              currentStep: 0,
            },
            () => {
              this.handleSubmit();
            }
          );
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
        if (
          e[0].name === nodes.nodes[i].name &&
          e[0].floor === nodes.nodes[i].floor
        ) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
      let utterance = new SpeechSynthesisUtterance(`You have to reach ${name}`);
      localStorage.setItem("destination", name);
      localStorage.setItem("dstVal", val);
      let ind = this.find_floor(floor, this.props.fList);
      localStorage.setItem("dstFloor", floor);
      localStorage.setItem("dstFloorL", this.props.fList[ind].floorL);
      localStorage.setItem("dstFloorB", this.props.fList[ind].floorB);
      console.log("srcfloor",this.state.srcfloor,floor)
      this.setState(
        {
          dstName: name,
          dstfloor: floor,
          dstVal: parseInt(val),
          dstfloorL: this.props.fList[ind].floorL,
          dstfloorB: this.props.fList[ind].floorB,
          defDst: name,
          scale: 3.6,
          showContent: true,
          readOnly: true,
          loaded: false,
          animation: true,
          showModal: false,
          samefloor:this.state.srcfloor !== floor?false:true,
          selectedProperty: "PathCaption",
          pathCaption: [],
          pathFloor: [],
          destination: name,
          currentStep: 0,
          dir:0,
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

    const options = { frequency: 60, referenceFrame: 'device' }; // 1/60 sampling rate
    const sensor = new AbsoluteOrientationSensor(options);
    let me = this;
    sensor.addEventListener('reading', e => {
        var q = e.target.quaternion;
        let alpha = Math.atan2(2*q[0]*q[1] + 2*q[2]*q[3], 1 - 2*q[1]*q[1] - 2*q[2]*q[2])*(180/Math.PI);
        if(alpha < 0) alpha = 360+ alpha;          
        var dir = 360 - alpha
        this.actualAngle = dir
        // me.setState({
        //   dir:Math.ceil(dir)
        // })
    });
    sensor.start();
    // window.responsiveVoice.speak(`Welcome to inclunav.Step 1. Select Source or Scan nearby TAG`,"US English Male")
    let blkName = localStorage.getItem("blockName");
    try {
      let name = window.location.href.split("=")[1];
      this.buildingName = name.split("&&")[0];
      localStorage.setItem("buildingName", this.buildingName);

      var markerVal = window.location.href.split("=")[2];
      var destination = localStorage.getItem("destination");
      var destVal = localStorage.getItem("dstVal");
      var destFloor = localStorage.getItem("dstFloor");
      this.props.floorList(this.buildingName, () => {
        this.num_floors = this.props.fList[0].num_floors;
        for (let i = 0; i < this.props.fList.length; i++) {
          this.flrLists.push(this.props.fList[i].floor);
          this.fileList.push(this.props.fList[i].fileName);
          this.floorAngle.push(this.props.fList[i].floorAngle);          
        }
      });
    } catch {
      this.buildingName = null;
      this.file = null;
    }
    if (this.buildingName) {
      localStorage.setItem("buildingName", this.buildingName);

      this.grids_all = [];
      this.props.getAllElements(() => {
        let name = null;
        let val1 = null;
        let floor = null;

        let nodes = this.props.allNodes[0].nodes;
        
        for (let i = 0; i < nodes.length; i++) {
          if ( nodes[i].name === 'Counter 1' && nodes[i].floor === 'ground' ) {
        console.log("name and floor",nodes[i])
            name = nodes[i].name;
            floor = nodes[i].floor;
            val1 = nodes[i].node;
          }
        }
      var ind = this.find_floor(`ground`, this.props.fList);

      this.props.imgDetails(
        this.buildingName,
        floor,
        this.props.fList[ind].fileName,
        () => {
          // this.set
          this.setState(
            {
              srcName: name,
              srcfloor: floor,
              srcVal: parseInt(val1),
              defSrc: name,
              srcfloorL: this.props.fList[ind].floorL,
              srcfloorB: this.props.fList[ind].floorB,
              disabled: true,
              readOnly: true,
              dstDisable: false,
              imgName: this.props.getImage[1],
              currentFloor: floor,
              animation: true,
              hotLocationDisable: false,
              srcReadOnly: true,
              dstReadOnly: false,
              pathCaption: [],
              pathFloor: [],
              currentStep: 0,
            },
            () => {
              this.handleSubmit();
            }
          );
        }
      );


        let coords = nodes.map(e => {
          if (e.coordinates !== undefined) {
            let num = e.coordinates.split(",");
            num[0] = Number(num[0]);
            num[1] = Number(num[1]);
            let arr = [num[0], num[1]];
            return arr;
          }
        });
        let filterNodes = nodes.filter(e => e.name !== "undefined");
        let nFilter = filterNodes.filter(e => e.name !== "");
        let fFilter = nFilter.filter(e => e.name !== undefined);

        let textToSearch = "Kiosk";
        let filteredArray = fFilter.filter(str => {
          return !str.name.includes(textToSearch);
        });
        filteredArray.sort((a, b) => a.name.localeCompare(b.name));

        this.setState(
          {
            showContent: true,
            blockName: blkName
          },
          () => {
            var cvWidth = Math.max(
              document.getElementById("myCanvassrc").clientWidth,
              window.innerWidth || 0
            );
            var cvHeight = Math.max(
              document.getElementById("myCanvassrc").clientHeight,
              window.innerHeight || 0
            );

            var element = document.getElementById("myCanvassrc");
            var topPos = element.getBoundingClientRect().top;
            let realHeight = cvHeight - topPos;

            this.setState({
              allNodes: filteredArray,
              canvasWidth: cvWidth,
              canvasHeight: realHeight,
              showContent: false,
              floorAngle:this.props.fList[0].floorAngle
            });
          }
        );

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
        //
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
            // console.log("nodes",nodes[i])
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

        this.orderFloorList(this.flrLists);
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
  };.33
  find_fl = (key, array) => {
    if (array !== undefined) {
      for (let i = 0; i < array.length; i++) {
        if (
          parseInt(array[i].node) === key &&
          array[i].floor == "floorconnection"
        ) {
          return i;
        }
      }
    }
    return -1;
  };

  orderFloorList = flrList => {
    var orderedData = [];
    for (let k = 0; k < special.length; k++) {
      for (let dt = 0; dt < flrList.length; dt++) {
        if (special[k] === flrList[dt]) {
          orderedData.push({ floor: flrList[dt], id: k });
        }
      }
    }
    let revOrderedData = orderedData.reverse();

    this.setState({
      orderFloorList: revOrderedData
    });

  };

  handleSubmit = () => {
    let { srcVal, srcfloor, dstfloor, dstVal, showContent } = this.state;
    if (srcVal != null && dstVal != null && showContent) {
      var divimg = document.getElementById("mydiv1");
      var divcan = document.getElementById("mydiv");
      var len = divimg.childNodes.length;
      for (var i = 0; i < len; i++) {
        var elem = divimg.childNodes[0].remove();
      }
      len = divcan.childNodes.length;
      for (var i = 0; i < len; i++) {
        var elem = divcan.childNodes[0].remove();
      }
      if (srcfloor === dstfloor) {
        this.refs.canv.style.display = "block";
        this.setState(
          {
            samefloor: true
          },
          async () => {
            var img1 = new Image();
            img1.src = `${config.imgUrl}${this.state.imgName}`;
            img1.hidden = true;
            divimg.appendChild(img1);
            // var img1 =  document.getElementById('myImage');
            var color_canvas = this.color_canvas;
            var me = this;
            var dest_x = this.state.dstVal % this.state.dstfloorL;
            var dest_y = parseInt(this.state.dstVal / this.state.dstfloorL);

            var src_x = this.state.srcVal % this.state.srcfloorL;
            var src_y = parseInt(this.state.srcVal / this.state.srcfloorL);

            let imgDiv = document.getElementById("myImage");
            this.imgDiv = imgDiv;
            var canvas = window.d3.select("canvas").call(
                window.d3
                  .zoom()
                  .scaleExtent([1, 8])
                  .on("zoom", zoom)
              ),
              context = canvas.node().getContext("2d"),
              width = canvas.property("width"),
              height = canvas.property("height");
            var active = window.d3.select(null);
            var zoom1 = window.d3.zoom().on("zoom", zoom);
            var initialTransform = window.d3.zoomIdentity
              .translate(0, 0)
              .scale(1);
            function zoom() {
              var transform = window.d3.event.transform;
              me.setState(
                {
                  animation: false,
                  pathCaption: [],
                  pathFloor: [],
                  currentStep: 0,
                },
                () => {
                  context.save();
                  context.clearRect(0, 0, width, height);
                  context.translate(transform.x, transform.y);
                  context.scale(transform.k, transform.k);
                  draw();
                  context.restore();
                }
              );
            }

            function draw() {
              if (active.node() === this) return reset();
              active.classed("active", false);
              active = window.d3.select(this).classed("active", true);
              context.drawImage(
                img1,
                0,
                0,
                img1.width,
                img1.height,
                0,
                0,
                width,
                height
              );
              me.callwhile(
                me.state.srcfloor,
                me.state.srcVal,
                me.state.srcfloorL,
                me.state.srcfloorB,
                dest_x,
                dest_y,
                true,
                "myCanvassrc"
              );

              color_canvas(srcVal, "srcmap", "red");
              color_canvas(dstVal, "srcmap", "green");
            }

            function reset() {
              active.classed("active", false);
              active = window.d3.select(null);
              canvas
                .transition()
                .duration(750)
                .call(zoom1.transform, initialTransform);
            }
            function timer(ms) {
              return new Promise(res => setTimeout(res, ms));
            }
            // (async () => {
              img1.onload = function() {
                draw();
              };
            //   await timer(3000);
            // })();
          }
        );
      } else {
        this.setState({
          samefloor: false,
          animation:false
        });

        this.refs.canv.style.display = "none";
        this.findpath();
      }
    } else {
    }
  };

  getMinX = (arr, coord) => {
    let res;
    res = arr[0][0];
    for (let i = 0; i < arr.length; i++) {
      if (res < arr[i][0]) {
        res = res;
      } else {
        res = arr[i][0];
      }
    }
    return res;
  };

  getMaxX = (arr, coord) => {
    let res;
    res = arr[0][0];
    for (let i = 0; i < arr.length; i++) {
      if (res > arr[i][0]) {
        res = res;
      } else {
        res = arr[i][0];
      }
    }
    return res;
  };

  getMinY = (arr, coord) => {
    let res;
    res = arr[0][1];

    for (let i = 0; i < arr.length; i++) {
      if (res < arr[i][1]) {
        res = res;
      } else {
        res = arr[i][1];
      }
    }
    return res;
  };

  getMaxY = (arr, coord) => {
    let res;
    res = arr[0][0];
    for (let i = 0; i < arr.length; i++) {
      if (res > arr[i][1]) {
        res = res;
      } else {
        res = arr[i][1];
      }
    }
    return res;
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
      // alert("stop "+leaves.length);
      min = Number.MAX_VALUE;
      for (let i = 0; i < leaves.length; i++) {
        if (min > minimumcost.get(leaves[i])) {
          min = minimumcost.get(leaves[i]);
          minleave = leaves[i];
          var_i = i;
        }
      }
      visited.set(minleave, true);

      if (minleave == dstvert) {
        // alert(" i "+JSON.stringify(shortestpath.get(dstvert)));
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
      let sortedList = [];
      for(let kk=0;kk<special.length;kk++){
        for(let jj=0;jj<this.grids_all.length;jj++){
            if(special[kk] === this.grids_all[jj].floor){
              sortedList.push(this.grids_all[jj])
            }
        }
      }
      for (var i of get_keys) {
      // console.log("sorted",i,sortedList)

        var ind1 = this.find_floor(i, this.props.fList);
        var ind = this.find_floor(i, sortedList);
        floorLlist.push(sortedList[ind].length);
        clist.push({
          id: cnt,
          scale: 10,
          floorL: sortedList[ind].length,
          floorB: sortedList[ind].breadth,
          floor: sortedList[ind].floor
        });
        cnt++;
      }
      // console.log("clist",clist)
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
        this.color_canvas_spl(j, canvasid, "blue", floorLlist[cnt]);
      }
      cnt++;
    }
  }

  callimage(cnt, ans, count, clist, floorLlist) {
    let floorList = [this.state.srcfloor,this.state.dstfloor];
    for(let jj=0;jj<floorList.length;jj++){    
    for (let ii = 0; ii < clist.length; ii++) {
      // let i = Array.from(ans.keys())[ii];
      if (floorList[jj] === clist[ii].floor) {
      let i = clist[ii].floor
        console.log("clist",floorList[jj],i)
        let ind = this.find_floor(i, this.props.fList);
        this.props.imgDetails(
          this.state.buildingName,
          i,
          this.props.fList[ind].fileName,
          () => {
            let myDiv = document.getElementById("mydiv");
            let canvas = window.d3
              .select("#mydiv")
              .append("canvas")
              .attr("id", "canvas" + ii)
              .attr("style", `border:1px solid;display:${i === this.state.srcfloor?"block":"none"}`)
              .attr("width", this.state.canvasWidth)
              .attr("height", this.state.canvasHeight)
              .call(
                window.d3
                  .zoom()
                  .scaleExtent([1, 8])
                  .on("zoom", multiCanvasZoom)
              );
            let width = canvas.property("width");
            let height = canvas.property("height");
            let active = window.d3.select(null);
            let zoom1 = window.d3.zoom().on("zoom", multiCanvasZoom);
            let initialTransform = window.d3.zoomIdentity
              .translate(0, 0)
              .scale(1);
            let ctx = canvas.node().getContext("2d");
            let div = document.getElementById("mydiv1");
            let img1 = new Image();
            img1.src = `${config.imgUrl}${this.props.getImage[1]}`;
            img1.hidden = true;
            div.appendChild(img1);
            let me = this;
            let get_val = ans.get(i);
            let loaded = false;
            img1.onload = function() {
              multiCanvas();
            };

            function multiCanvasZoom() {
              var transform = window.d3.event.transform;
              ctx.save();
              ctx.clearRect(0, 0, width, height);
              ctx.translate(transform.x, transform.y);
              ctx.scale(transform.k, transform.k);
              loaded = false;
              multiCanvas();
              ctx.restore();
            }

            function multiCanvas() {
              if (loaded === false) {
                ctx.drawImage(
                  img1,
                  0,
                  0,
                  img1.width,
                  img1.height,
                  0,
                  0,
                  width,
                  height
                );
                var id = "canvas" + ii;
                console.log("canvas id",id)
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
                  if (ii === count - 1) {
                    if (node_count === get_val.length - 1) {
                      me.color_canvas_spl(j, id, "green", floorLlist[ii]);
                    } else {
                      me.color_canvas_spl(j, id, "yellow", floorLlist[ii]);
                    }
                  } else {
                    if (node_count === 0 && ii === 0) {
                      me.color_canvas_spl(j, id, "red", floorLlist[ii]);
                    } else {
                      me.color_canvas_spl(j, id, "yellow", floorLlist[ii]);
                    }
                  }
                  node_count++;
                }
                loaded = true;
              }
            }

            function zoomTo() {
              let src_val = get_val[0];
              let dest_val = get_val[1];
              let index = me.find_floor(i, me.grids_all);
              let m = me.grids_all[index].length;
              let src_x = parseInt(src_val) % m;
              let src_y = parseInt(parseInt(src_val) / m);
              let dest_x = parseInt(dest_val) % m;
              let dest_y = parseInt(parseInt(dest_val) / m);
              let dx, dy;
              if (dest_x > src_y) {
                dx = dest_x - src_x;
              } else {
                dx = src_x - dest_x;
              }
              if (dest_y > src_y) {
                dy = dest_y - src_y;
              } else {
                dy = src_y - dest_y;
              }
              let x = (src_x + dest_x) / 2;
              let y = (dest_y + src_y) / 2;
              let scale = Math.max(
                1,
                Math.min(8, 0.9 / Math.max(dx / width, dy / height))
              );
              let translate = [width / 2 - scale * x, height / 2 - scale * y];
              var transform = window.d3.zoomIdentity
                .translate(translate[0], translate[1])
                .scale(2);
              canvas
                .transition()
                .duration(750)
                .call(zoom1.transform, transform);
            }
          }
        );
      }
    }
    }
  }

  async callwhile(srcfloor, srcVal, m, n, dest_x, dest_y, single, canvasid) {
    var min = Number.MAX_VALUE;
    var minleave = [];
    var var_i;
    var notthere;
    let canvWidth = document
      .getElementById("myCanvassrc")
      .getBoundingClientRect().width;
    let canvHeight = document
      .getElementById("myCanvassrc")
      .getBoundingClientRect().height;
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
    let offsetX =
      document.getElementById("myCanvassrc").getBoundingClientRect().width /
      this.state.srcfloorB;
    let offsetY =
      document.getElementById("myCanvassrc").getBoundingClientRect().height /
      this.state.srcfloorL;
    if (this.grids_all[ind1].grid_1 != null) {
      for (let i = 0; i < this.grids_all[ind1].grid_1.length; i++) {
        var nodes = this.grids_all[ind1].grid_1[i].split(",");
        //  let gpx = (document.getElementById("myCanvassrc").getBoundingClientRect().width)/this.state.srcfloorB
        //  let gpy = (document.getElementById("myCanvassrc").getBoundingClientRect().height)/this.state.srcfloorL
        for (let j = 0; j < nodes.length; j++) {
          var val = nodes[j];
          // var x = gpx*(val%(m));
          // var y = gpy*(parseInt(val/m));
          var x = val % m;
          var y = parseInt(val / m);
          this.grids[x][y] = 0;
        }
      }
    }
    // var src_x = offsetX * (srcVal%m);
    // var src_y = offsetY * (parseInt(srcVal/m));
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
      // this.leaves.splice(var_i,1);
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
            this.minimumcost[minleave[0]][minleave[1]] + 1
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + 1;
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
            this.minimumcost[minleave[0]][minleave[1]] + 1
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + 1;
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
            this.minimumcost[minleave[0]][minleave[1]] + 1
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + 1;
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
            this.minimumcost[minleave[0]][minleave[1]] + 1
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + 1;
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
            this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2)
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2);
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
            this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2)
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2);
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
            this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2)
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2);
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
            this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2)
          ) {
            this.minimumcost[j][k] =
              this.minimumcost[minleave[0]][minleave[1]] + Math.sqrt(2);
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
      if (canvas !== null) {
        var context = canvas.getContext("2d");
      }

      let sp = this.shortestpath[dest_x][dest_y];

      let mypoints = sp.map(r => {
        return { x: r[0], y: r[1] };
      });

      let allElements = this.props.allNodes[0].nodes;
      var refinedpaths = this.simplifyPath(mypoints, 2);
      if (this.state.destination) {
        this.findInstructions(sp, refinedpaths, allElements, srcfloor);
      }
      function timer(ms) {
        return new Promise(res => setTimeout(res, ms));
      }
      let me = this;
      var count = 0;

      async function load() {
        let gpx = me.state.canvasWidth / me.state.srcfloorL;
        let gpy = me.state.canvasHeight / me.state.srcfloorB;
        let pt = me.interpolatePath(refinedpaths, 1, gpx, gpy)
        for (let i = 0; i < pt.length; i = i + 3) {
          context.beginPath();
          var half_scale = scale / 2;
          var pos_x = gpx * pt[i].x
          var pos_y = gpy * pt[i].y
          pos_x = pos_x + half_scale;
          pos_y = pos_y + half_scale;
          context.arc(pos_x, pos_y, scale / 1.3, 0, 2 * Math.PI);
          context.fill();
          context.fillStyle = "#dc3545";
          context.strokeStyle = "#dc3545";
          context.stroke();
          count++;
          let time = Math.floor(3000 / pt.length);
          await timer(time);
        }
      }

      if (
        this.state.animation === true &&
        this.state.srcfloor === this.state.dstfloor
      ) {
        await load();
      }

      let gpx = this.state.canvasWidth / this.state.srcfloorL;
      let gpy = this.state.canvasHeight / this.state.srcfloorB;

      let width = this.state.scale * this.state.srcfloorL;
      let height = this.state.scale * this.state.srcfloorB;

      if (
        this.state.animation === false &&
        this.state.srcfloor === this.state.dstfloor
      ) {
        if (this.shortestpath[dest_x][dest_y] !== undefined) {
        let pt = this.interpolatePath(refinedpaths, 1, gpx, gpy)
          
          for (
            let i = 0;
            i < pt.length;
            i = i + 3
          ) {
            context.beginPath();
            let half_scale = scale / 2;
            let pos_x = gpx * pt[i].x
            let pos_y = gpy * pt[i].y
            pos_x = pos_x + half_scale;
            pos_y = pos_y + half_scale;
            context.arc(pos_x, pos_y, scale / 1.3, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = "#dc3545";
            context.strokeStyle = "#dc3545";
            context.stroke();
          }
        }
      } else {
        if(this.state.animation === false){
          let gpx, gpy;
          if (canvasid === "canvas0") {
            gpx = this.state.canvasWidth / this.state.srcfloorL;
            gpy = this.state.canvasHeight / this.state.srcfloorB;
          } else {
            gpx = this.state.canvasWidth / this.state.dstfloorL;
            gpy = this.state.canvasHeight / this.state.dstfloorB;
          }
        let pt = this.interpolatePath(refinedpaths, 1, gpx, gpy)
          for (
            let i = 0;
            i < pt.length;
            i = i + 3
          ) {
            context.beginPath();
            let half_scale = scale / 2;
            let pos_x = gpx * pt[i].x
            let pos_y = gpy * pt[i].y
            pos_x = pos_x + half_scale;
            pos_y = pos_y + half_scale;
            context.arc(pos_x, pos_y, scale / 1.3, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = "#dc3545";
            context.strokeStyle = "#dc3545";
            context.stroke();
          }
        }     
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

  //Toggle Bar Handling

  toggle = (type, value) => event => {
    this.setState(state => {
      return {
        [type]: value,
        showTool: this.state.showTool ? false : true
      };
    });
  };

  // Modal Handling

  handleOpenModal = type => {
    this.setState({ selectedProperty: type, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  hotLocation = (str, e) => {
    let name = null;
    let val = null;
    let floor = null;
    let nodes = this.props.allNodes[0];
    // this.typeahead.getInstance().clear()
    if (str === "Stairs") {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if ("Stairs-1" === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
    } else if (str === "Help Desk") {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if ("Help Desk 1" === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
    } else if (str === "Lift") {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if ("Lift-1" === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
    } else {
      for (let i = 0; i < nodes.nodes.length; i++) {
        if (str === nodes.nodes[i].name) {
          name = nodes.nodes[i].name;
          floor = nodes.nodes[i].floor;
          val = nodes.nodes[i].node;
        }
      }
    }

    let ind = this.find_floor(floor, this.props.fList);
    this.setState(
      {
        dstName: name,
        dstfloor: floor,
        dstVal: parseInt(val),
        dstfloorL: this.props.fList[ind].floorL,
        dstfloorB: this.props.fList[ind].floorB,
        slide: true,
        // showContent: true,
        scale: 4.6,
        defDst: str,
        loaded: false,
        showModal: false
      },
      () => {
        this.handleSubmit();
      }
    );
  };

  refresh = () => {
    window.location.reload();
  };

  goHome = () => {
    this.props.history.push("/home");
  };

  showFloors = () => {
    this.setState({ showFloorList: !this.state.showFloorList });
  };

  navigateNext = () => {
    let div = document.getElementById("mydiv").children;
    div[0].style.display = "none";
    div[1].style.display = "block";
    this.setState({
      next: false,
      currentFloor: this.state.dstfloor
    });
  };

  navigatePrevious = () => {
    let div = document.getElementById("mydiv").children;
    div[1].style.display = "none";
    div[0].style.display = "block";
    this.setState({
      next: true,
      currentFloor: this.state.srcfloor
    });
  };

  interpolatePath = (turningPointsPath, seperationGap, gpx, gpy) => {
    let resultpath = [];
    if (turningPointsPath.length === 1) {
      resultpath.push(turningPointsPath.x * gpx, turningPointsPath.x * gpx);
      return resultpath;
    }
    for (let i = 0; i < turningPointsPath.length - 1; i++) {
      let points = this.interpolatePoints(
        turningPointsPath[i],
        turningPointsPath[i + 1],
        seperationGap,
        gpx,
        gpy
      );
      for (let k = 0; k < points.length; k++) {
        resultpath.push(points[k]);
      }
      // resultpath.push(this.interpolatePoints(turningPointsPath[i],turningPointsPath[i+1], seperationGap, gpx, gpy));
    }
    return resultpath;
  };

  interpolatePoints(p1, p2, seperationGap, gpx, gpy) {
    let d = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    let result = [];
    result.push({ x: parseInt(p1.x), y: parseInt(p1.y) });
    let counter = seperationGap;
    while (counter < d) {
      let x = p1.x + (counter / d) * (p2.x - p1.x);
      let y = p1.y + (counter / d) * (p2.y - p1.y);
      result.push({ x: parseInt(x), y: parseInt(y) });
      counter += 1 * seperationGap;
    }
    return result;
  }

  // handleDirection = (shortestpath, dest_x, dest_y) => {};

  simplifyPath = (points, tolerance) => {
    // helper classes
    var Vector = function(x, y) {
      this.x = x;
      this.y = y;
    };
    var Line = function(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
      this.distanceToPoint = function(point) {
        // slope
        var m = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x),
          // y offset
          b = this.p1.y - m * this.p1.x,
          d = [];
        // distance to the linear equation
        d.push(
          Math.abs(point.y - m * point.x - b) / Math.sqrt(Math.pow(m, 2) + 1)
        );
        // distance to p1
        d.push(
          Math.sqrt(
            Math.pow(point.x - this.p1.x, 2) + Math.pow(point.y - this.p1.y, 2)
          )
        );
        // distance to p2
        d.push(
          Math.sqrt(
            Math.pow(point.x - this.p2.x, 2) + Math.pow(point.y - this.p2.y, 2)
          )
        );
        // return the smallest distance
        return d.sort(function(a, b) {
          return a - b; //causes an array to be sorted numerically and ascending
        })[0];
      };
    };

    var douglasPeucker = function(points, tolerance) {
      if (points.length <= 2) {
        return [points[0]];
      }
      var returnPoints = [],
        // make line from start to end
        line = new Line(points[0], points[points.length - 1]),
        // find the largest distance from intermediate poitns to this line
        maxDistance = 0,
        maxDistanceIndex = 0,
        p;
      for (var i = 1; i <= points.length - 2; i++) {
        var distance = line.distanceToPoint(points[i]);
        if (distance > maxDistance) {
          maxDistance = distance;
          maxDistanceIndex = i;
        }
      }
      // check if the max distance is greater than our tollerance allows
      if (maxDistance >= tolerance) {
        p = points[maxDistanceIndex];
        line.distanceToPoint(p, true);
        // include this point in the output
        returnPoints = returnPoints.concat(
          douglasPeucker(points.slice(0, maxDistanceIndex + 1), tolerance)
        );
        // returnPoints.push( points[maxDistanceIndex] );
        returnPoints = returnPoints.concat(
          douglasPeucker(
            points.slice(maxDistanceIndex, points.length),
            tolerance
          )
        );
      } else {
        // ditching this point
        p = points[maxDistanceIndex];
        line.distanceToPoint(p, true);
        returnPoints = [points[0]];
      }
      return returnPoints;
    };
    var arr = douglasPeucker(points, tolerance);
    // always have to push the very last point on so it doesn't get left off
    arr.push(points[points.length - 1]);
    return arr;
  };

  find_angle = (p0, p1, c) => {
    var p0c = { x: c.x - p0.x, y: c.y - p0.y }; // p0->c (b)
    var cp1 = { x: p1.x - c.x, y: p1.y - c.y }; // p1->c (a)

    // {
      // x: refinedPoints[currentRPoint].x,
      // y: refinedPoints[currentRPoint].y + 1
    // },
    // refinedPoints[currentRPoint + 1],
    // refinedPoints[currentRPoint]
    return (
      (Math.atan2(
        cp1.y * p0c.x - cp1.x * p0c.y,
        p0c.x * cp1.x + p0c.y * cp1.y
      ) *
        180) /
      Math.PI
    );
  };

  //Module for finding the direction's equivalent commands

  findDirectionword = angle => {
    if (angle >= 75 && angle <= 105) return this.props.t("Turn Right");

    if (angle <= -75 && angle >= -105) return this.props.t("Turn Left");

    if ((angle >= 165 && angle <= 180) || (angle <= -165 && angle >= -180))
      return this.props.t("Go Straight");
    if (angle < 0) {
      if (Math.round((360 + angle) / 30) === 9) {
        return this.props.t("Turn Left");
      }
    // if(Math.round((360 + angle) / 30) === 12 || Math.round((360 + angle) / 30) === 0){
    //   return this.props.t("Go Straight")
    // }
      return this.props.t("O' Clock",{angle:Math.abs(Math.round((360 + angle) / 30))})
      // return "Turn " + Math.round((360 + angle) / 30) + " O' Clock";
    }

    if (Math.floor(angle / 30) === 3) return this.props.t("Turn Right");
    // if(Math.round((360 + angle) / 30) === 12 || Math.round((360 + angle) / 30) === 0){
    //   return this.props.t("Go Straight")
    // }  
    return this.props.t("O' Clock",{angle:Math.abs(Math.round((angle) / 30))})
    // return "Turn " + Math.round(angle / 30) + " O' Clock";
  };

  // find the error component in the iteration and leaves it for the next iteration
  findErrorInAngle = angle => {
    if (angle < 0) return 360 + angle - Math.round((360 + angle) / 30) * 30;
    return angle - Math.round(angle / 30) * 30;
  };
  //same as above but in abbreviated form

  findDirectionAbbreviation = angle => {
    if (angle > 0) return this.props.t("Right");

    return this.props.t("Left");
  };

  findInstructions = (nonRefinedPoints, refinedPoints, mapElements, floor) => {
    //length of refined and non refined paths
    var nRefined = refinedPoints.length;
    var nNonRefined = nonRefinedPoints.length;
    //converting the mapElements to ordered map for ease of access
    var ElementMap = new Map();
    var includedSet = new Set();
    var word;
    //for iteration purpose
    var currentNRPoint = 0;
    var currentRPoint = 0;
    var flagList = [];
    var i = 0;
    var j = 0;

    //radius defines what range to cover in a path
    var radius = 3;

    //adding the elements to map
    for (i = 0; i < mapElements.length; i++) {
      if (
        mapElements[i].floor === floor &&
        mapElements[i].name !== "undefined" &&
        mapElements[i].coordinates !== undefined
      )
        ElementMap.set(
          mapElements[i].coordinates.replace(",", "@"),
          mapElements[i]
        );
    }

    //finding the indices of the
    while (currentNRPoint < nNonRefined && currentRPoint < nRefined) {
      if (
        nonRefinedPoints[currentNRPoint][0] === refinedPoints[currentRPoint].x &&
        nonRefinedPoints[currentNRPoint][1] === refinedPoints[currentRPoint].y
      ) {
        flagList.push(currentNRPoint);
        currentRPoint++;
      }
      currentNRPoint++;
    }

    // Generating the direction and elaborated results
    var DirectionResults = [];
    var ElaboratedResults = [];

    //entry point insertion to the list
    DirectionResults.push(
      this.props.t("You are at",{location:ElementMap.get("" + refinedPoints[0].x + "@" + refinedPoints[0].y).name} )
    );
    ElaboratedResults.push(
      "You are at " +
        ElementMap.get("" + refinedPoints[0].x + "@" + refinedPoints[0].y).name
    );
    includedSet.add(refinedPoints[0].x + "@" + refinedPoints[0].y);
    includedSet.add(
      refinedPoints[nRefined - 1].x + "@" + refinedPoints[nRefined - 1].y
    );
    //iterate and /finding the desired results
    var error = 0;
    for (currentRPoint = 0; currentRPoint < nRefined - 1; currentRPoint++) {
      var angle = 0;
      var coordinates;
      // this.actualAngle = 155
      if (currentRPoint === 0){

       angle = this.find_angle(
          {
            x: refinedPoints[currentRPoint].x,
            y: refinedPoints[currentRPoint].y + 1
          },
          refinedPoints[currentRPoint + 1],
          refinedPoints[currentRPoint]
        );
        let path_angle = angle;
        let floorangle = this.state.floorAngle;
        let diff = 360-floorangle;
        // let CurrentDirection = 60;
        let CurrentDirection = this.actualAngle;
        // rotateDirection
        let gn = this.calculatePath(path_angle,diff,CurrentDirection);

        angle  = gn;
        // angle =  pathDirection - this.actualAngle;
        // angle =  pathDirection - 50;
        // this.setState({
        //   actualAngle:parseInt(angle),
        //   pathDirection:pathDirection,
        //   magnetoMeter:this.actualAngle
        // })
      }
      else
        angle = this.find_angle(
          refinedPoints[currentRPoint - 1],
          refinedPoints[currentRPoint + 1],
          refinedPoints[currentRPoint]
        );
      angle = angle + error;

      error = this.findErrorInAngle(angle);
      if (currentRPoint == nRefined - 2) {
       
        word = this.findDirectionword(angle);
        DirectionResults.push(word);
        DirectionResults.push(
        this.props.t("Move",{steps:Math.round(0.6 * (flagList[currentRPoint + 1] - flagList[currentRPoint]))})
          // "Move " +
            // Math.round(
              // 0.6 * (flagList[currentRPoint + 1] - flagList[currentRPoint])
            // ) 
          // +
          //   " steps forward"
        );
        ElaboratedResults.push(word);
        ElaboratedResults.push(
          "Move " +
            Math.round(
              0.6 * (flagList[currentRPoint + 1] - flagList[currentRPoint])
            ) +
            " steps forward"
        );
        DirectionResults.push(
      this.props.t("You are about to reach",{location:ElementMap.get(refinedPoints[nRefined - 1].x +"@" +refinedPoints[nRefined - 1].y).name,direction:this.findDirectionAbbreviation(angle)}));
        ElaboratedResults.push(
          "You are about to reach:" +
            ElementMap.get(
              refinedPoints[nRefined - 1].x +
                "@" +
                refinedPoints[nRefined - 1].y
            ).name +
            " on your " +
            this.findDirectionAbbreviation(angle)
        );
        break;
      }
          // "You are about to reach:" +
            // ElementMap.get(
              // refinedPoints[nRefined - 1].x +
                // "@" +
                // refinedPoints[nRefined - 1].y
            // ).name 
            // +
          // " on your " +
          // this.findDirectionAbbreviation(angle)
      word = this.findDirectionword(angle);
      DirectionResults.push(word);
      DirectionResults.push(
      this.props.t("Move",{steps:Math.round(0.6 * (flagList[currentRPoint + 1] - flagList[currentRPoint]))})
        // "Move " +
        //   Math.round(
        //     0.6 * (flagList[currentRPoint + 1] - flagList[currentRPoint])
        //   ) +
        //   " steps forward"
      );
      ElaboratedResults.push(word);
      ElaboratedResults.push(
        "Move " +
          Math.round(
            0.6 * (flagList[currentRPoint + 1] - flagList[currentRPoint])
          ) +
          " steps forward"
      );

      //this part of code handles the intermediate importatnt rooms
      var begin = flagList[currentRPoint] + 1;
      var end = flagList[currentRPoint + 1];

      while (begin < end) {
        var currpoint = nonRefinedPoints[begin];
        for (
          i = Math.max(0, currpoint[0] - radius);
          i < currpoint[0] + radius;
          i++
        ) {
          for (
            j = Math.max(0, currpoint[1] - radius);
            j < currpoint[1] + radius;
            j++
          ) {
            if (!includedSet.has(i + "@" + j) && ElementMap.has(i + "@" + j)) {
              var tempAngle = this.find_angle(
                {
                  x: nonRefinedPoints[begin - 1][0],
                  y: nonRefinedPoints[begin - 1][1]
                },
                { x: i, y: j },
                { x: nonRefinedPoints[begin][0], y: nonRefinedPoints[begin][1] }
              );
              ElaboratedResults.push(
                ElementMap.get(i + "@" + j).name +
                  " on your " +
                  this.findDirectionAbbreviation(tempAngle)
              );
              includedSet.add(i + "@" + j);
            }
          }
        }
        begin++;
      }
    }
    DirectionResults.push(
      this.props.t("You have reached",{location:ElementMap.get(
        "" +
          refinedPoints[nRefined - 1].x +
          "@" +
          refinedPoints[nRefined - 1].y
      ).name}));
      // "You have reached " +
      //   ElementMap.get(
      //     "" +
      //       refinedPoints[nRefined - 1].x +
      //       "@" +
      //       refinedPoints[nRefined - 1].y
      //   ).name
    
    ElaboratedResults.push(
      "You have reached " +
        ElementMap.get(
          "" +
            refinedPoints[nRefined - 1].x +
            "@" +
            refinedPoints[nRefined - 1].y
        ).name
    );
    let resultMap = DirectionResults.map(r => {
      return { instruction: r, floor: floor };
    });
    resultMap.forEach(element => {
      this.setState(prevState => ({
        pathFloor: [...prevState.pathFloor, element]
      }));
    });
    let step = DirectionResults[0];
    var utter = new window.SpeechSynthesisUtterance(step);
    let lang = localStorage.getItem('Language');
    if(lang === "Hindi"){
      utter.lang = 'hi-IN'
    }else{
      utter.lang = 'en-US'
    }
    window.speechSynthesis.cancel();

    if(this.state.animation  === true){
      // console.log("utter",utter)
      window.speechSynthesis.speak(utter);
    }

    for (let k = 0; k < DirectionResults.length; k++) {
      this.setState(prevState => ({
        pathCaption: [...prevState.pathCaption, DirectionResults[k]]
      }));
    }
  };

  calculatePath = (path_angle,diff,CurrentDirection)=>{
    let pathGN,rotateDirection,path_angleN;
    if ((path_angle >= 0) && (path_angle < 106)){
        pathGN = 360-(diff-path_angle);
        rotateDirection = pathGN - CurrentDirection;
      }
    else if ((path_angle > 105) && (path_angle <= 180)){
        pathGN = path_angle-diff;
        rotateDirection = pathGN - CurrentDirection;
      }
    else if((path_angle <= -1) &&  (path_angle >= -180)){
        path_angleN= 180+path_angle;
        pathGN = path_angleN+ 180 - diff;
        rotateDirection = pathGN - CurrentDirection;
      }
      return rotateDirection;
  }

  myFunction = () => {
    try {
      document.getElementById("show_" + ++this.show).style.display = "block";
    } catch (err) {
      this.show--;
      for (let i = this.show; i > 0; i--) {
        document.getElementById("show_" + this.show).style.display = "none";
        this.show--;
      }
    }
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 0) {
      return (
        <button
          className="btn btn-secondary btn-sm btn-block mb-1 ml-2 mr-1"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < this.state.pathCaption.length) {
      return (
        <button
          className="btn btn-primary btn-sm btn-block float-right mr-2 mb-1"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep =
      currentStep >= this.state.pathCaption.length - 1
        ? this.state.pathCaption.length
        : currentStep + 1;
        if(this.state.pathCaption[currentStep]){
          let step = this.state.pathCaption[currentStep];
          var utter = new window.SpeechSynthesisUtterance(step);
          let lang = localStorage.getItem('Language');
          if(lang === "Hindi"){
            utter.lang = 'hi-IN'
          }else{
            utter.lang = 'en-US'
          }
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
        }
    if (
      this.state.pathFloor[currentStep] !== undefined &&
      this.state.pathFloor[currentStep].floor !==
        this.state.pathFloor[currentStep - 1].floor
    ) {
      this.navigateNext();
    }

    this.setState({
      currentStep: currentStep
    });

  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 0 : currentStep - 1;
    if (this.state.pathFloor[currentStep + 1] !== undefined) {
      if (
        this.state.pathFloor[currentStep + 1].floor !==
        this.state.pathFloor[currentStep].floor
      ) {
        this.navigatePrevious();
      }
    }
    this.setState({
      currentStep: currentStep
    });
  };

  render() {
    const { sidebarLeft } = this.state;
    const { t,i18n } = this.props;

    return (
      <div >
        <div style={{ backgroundColor: "#f7f7f7" }}>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          style={customStyles}
        >
          {this.state.selectedProperty === "Hotlocation" ? (
            <div>
              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={e => this.hotLocation(`Male Washroom`, e)}
                  >
                    <img
                      src="/assets/images/restroom.png"
                      className="img-fluid"
                     />
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={e => this.hotLocation(`Water Tap `, e)}
                  >
                    <img src="/assets/images/tap.png" className="img-fluid" />
                  </button>
                </div>
                <div className="col"></div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={e => this.hotLocation(`Stairs`, e)}
                  >
                    <img
                      src="/assets/images/floorConnection.png"
                      className="img-fluid"
                    />
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={e => this.hotLocation(`Entrance / Exit Gate 3`, e)}
                  >
                    <img
                      src="/assets/images/exit.jpg"
                      width="25"
                      height="25"
                      className="img-fluid"
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </Modal>
        <nav
          className="navbar navbar-inner pl-0"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div className="row w-100 ml-0">
            <div className="col-3 text-primary">
              <p  className="h4 font-weight-bolder" >You are at R.P.C O.P.D Block </p>
              <p  className="h5 font-weight-bolder">Please select your Destination </p>
              </div>
            <div className="col-6">
              <div className="headerContent">
            <Typeahead
                      placeholder={`${this.state.defDst}`}
                      isLoading={this.state.isLoading}
                      required
                      filterBy={["name"]}
                      labelKey={option => {
                        return option.floorElement === "FloorConnection" ||
                          option.floorElement === "RestRooms"
                          ? `${option.name} (${option.floor})`
                          : `${option.name}`;
                      }}
                      onChange={this.dstChange}
                      // disabled={this.state.dstDisable}
                      type="submit"
                      value={this.state.dstName}
                      options={this.state.allNodes}
                      className="mb-2 headerDropDown"
                      id="destination"
                      style={{ zIndex: "999" }}
                      name="list"
                      // inputProps={{
                      //   readOnly: this.state.dstReadOnly
                      // }}
                      onFocus={this.handleFocus}
                      ref={typeahead => (this.typeahead = typeahead)}
                    />
              </div>
            </div>
            <div className="col-3">
            <div className="headerContent">
            <button
                      type="button"
                      className="btn btn-primary btn-sm text-capitalize text-white btn-block  headerDropDown h3"
                      onClick={this.navigatePrevious}
                    >
                     {t(`Show Path`)} 
                    </button>
                    </div>
            </div>
          </div>
        </nav>
          <div>
            <div className="mt-1 canvaDiv">
              <img
                alt="map"
                id="myImage"
                src={`${config.imgUrl}${this.props.getImage[1]}`}
                style={{ position: "absolute", zIndex: "-1" }}
                hidden={true}
              ></img>
              <img
                alt="map"
                id="srcImage"
                src="/assets/images/start.png"
                hidden={true}
              ></img>
              <img
                alt="map"
                id="dstImage"
                src="/assets/images/destination.png"
                hidden={true}
              ></img>
              <img
                alt="map"
                id="stairs"
                src="/assets/images/stair.png"
                hidden={true}
              ></img>
              <img
                alt="map"
                id="lift"
                src="/assets/images/lift.png"
                hidden={true}
              ></img>
              <div className="canvaDiv" ref="canv" onScroll={this.handleScroll}>
                <canvas
                  id="myCanvassrc"
                  width={this.state.canvasWidth}
                  height={this.state.canvasHeight}
                  style={{
                    border: "1px solid #ca2d2d",
                    position: "absolute",
                    background: "#f7f7f7",
                    zIndex: `${this.state.srcIndx}`
                  }}
                  hidden={!this.state.samefloor}
                />
              </div>
              
              <div ref="mydiv1" id="mydiv1"></div>
              <div ref="mydiv" id="mydiv" className="d-flex"></div>
            </div>
          </div>
        
        {this.state.selectedProperty === "PathCaption" ? (
          <div className="bottom-content">
            <div className="row w-100">
              {this.state.pathCaption.map((r, i) => {
                if (i === this.state.currentStep) {
                  return (
                    <div
                      className="col-sm-12 d-flex justify-content-center font-weight-bolder text-primary ml-2 mr-2"
                      id={`show_${this.imgDiv}`}
                    >
                      {r}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="row">
              <div className="col-6">{this.previousButton()}</div>
              <div className="col-6">{this.nextButton()}</div>
            </div>
          </div>
        ) : null}
      </div>
      <div class="leftMenu">
            <button
              type="button"
              className="btn btn-primary text-white btn-block"
              onClick={this.showFloors}
            >
              <i className="fa fa-building mb-4" style={{ fontSize: "1em" }} />
            </button>
            <button
              type="button"
              className="btn btn-primary text-white btn-block"
              onClick={this.refresh}
            >
              <i className="fa fa-refresh mb-4" style={{ fontSize: "1em" }} />
            </button>
            <button
              type="button"
              className="btn btn-primary text-white btn-block"
              onClick={() => {
                this.props.history.push("/kiosk-landing");
              }}
            >
              <i className="fa fa-home mb-4" style={{ fontSize: "1em" }}></i>
            </button>
            <button
              type="button"
              className="btn btn-primary text-white btn-block"
              onClick={() => {
                this.props.history.push("/settings");
              }}
            >
              <i className="fa fa-gear mb-4" style={{ fontSize: "1em" }}></i>
            </button>
            <button
              type="button"
              className="btn btn-primary text-white btn-block"
              onClick={() => {
                this.setState({
                  selectedProperty: this.state.selectedProperty
                    ? ""
                    : "PathCaption"
                });
              }}
            >
              <i
                className="fa fa-info-circle mb-4"
                style={{ fontSize: "1em" }}
              ></i>
            </button>
      </div>
        <div class="floorLevel">
        {!this.state.samefloor ? (
                  this.state.next ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm text-capitalize text-white"
                      id="next"
                      data-tip
                      data-for="next"
                      onClick={this.navigateNext}
                    >
                     {t(`Next Floor`)} 
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm text-capitalize text-white"
                      onClick={this.navigatePrevious}
                    >
                     {t(`Previous Floor`)} 
                    </button>
                  )
              ) : null}
            {this.state.orderFloorList &&
              this.state.orderFloorList.map((r, i) => {
                return (
                  <button
                    type="button"
                    className="btn btn-block btn-primary text-capitalize"
                    key={i}
                  >
                    L{r.id}
                  </button>
                );
              })}
        </div>
        <div className="footerHead alignCenter">Quick Access</div>
        <div className="footer alignCenter">
          <div className="footerIcon alignCenter"><img src="/assets/images/hospital.png" alt="" className="footerImage" /></div>
          <div className="footerIcon alignCenter"><img src="/assets/images/milk.png" alt="" className="footerImage" /></div>
          <div className="footerIcon alignCenter"><img src="/assets/images/patient.png" alt="" className="footerImage" /></div>
          <div className="footerIcon alignCenter"><img src="/assets/images/pharmacy.png" alt="" className="footerImage" /></div>
          <div className="footerIcon alignCenter"><img src="/assets/images/shop.png" alt="" className="footerImage" /></div>
        </div>
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

export default withTranslation()(connect(mapStateToProps, {
  floorList,
  imgDetails,
  getAllElements
})(Kiosk3));
