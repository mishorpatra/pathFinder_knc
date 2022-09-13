import React from "react";
import config from "../config";
import { connect } from "react-redux";
import { imgDetails, getAllElements } from "../store/actions/index";
import Toolbar from "./SideBar/Toolbar/Toolbar";
import SideDrawer from "./SideBar/SideDrawer/SideDrawer";
import Backdrop from "./SideBar/Backdrop/Backdrop";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      srcName: "none",
      list: [],
      dstName: "none",
      srcVal: null,
      dstVal: null,
      sideDrawerOpen: false
    };
    this.shortestPathVar = [];
  }

  srcChange = e => {
    let name = null;
    let val = null;
    let nodes = this.props.allNodes[0];
    for (let i = 0; i < nodes.nodes.length; i++) {
      if (e.target.value === nodes.nodes[i].name) {
        name = nodes.nodes[i].name;
        val = nodes.nodes[i].node;
      }
    }
    this.setState(
      {
        srcName: name,
        srcVal: parseInt(val)
      },
      () => {
        // this.BFS([],[]);
      }
    );
  };

  dstChange = e => {
    let name = null;
    let val = null;
    let nodes = this.props.allNodes[0];
    for (let i = 0; i < nodes.nodes.length; i++) {
      if (e.target.value === nodes.nodes[i].name) {
        name = nodes.nodes[i].name;
        val = nodes.nodes[i].node;
      }
    }
    this.setState(
      {
        dstName: name,
        dstVal: parseInt(val)
      },
      () => {
        this.handleSubmit();
      }
    );
  };

  
  componentDidMount() {
    const img = new Image();
    const url = window.location.href;
    this.buildingName = null;
    this.floor = null;
    this.file = null;
    try {
      let name = url.split("=")[1];
      this.buildingName = name.split("&&")[0];
      let flr = url.split(":")[3];
      this.floor = flr.split("&&")[0];
      this.file = url.split(":")[4];
    } catch {
      this.buildingName = null;
      this.file = null;
    }
    if (this.buildingName && this.floor) {
      localStorage.clear();
      localStorage.setItem("buildingName", this.buildingName);
      localStorage.setItem("floor", this.floor);
      this.props.getAllElements(() => {
        let nodes = this.props.allNodes[0].nodes;
        let lists = nodes.map(r => {
          return r.name;
        });
        this.setState({
          list: lists
        });
        // let lists = this.props.allNodes.map(r=>{
        //   r.
        // })
      });
    }
    if (this.file !== null && this.file !== undefined) {
      this.props.imgDetails(this.buildingName, this.floor, this.file);
    }
  }

  clk(i) {
    console.log("i", i);
  }

  /* MAKE PATH */
  shortest_path = () => {
    let pred = [];
    let dist = [];
    let { dstVal } = this.state;
    let chords = this.props.allNodes[0].nodes;

    if (this.BFS(pred, dist) === false) {
      console.log("hitt");
      return;
    }
    let path = [];
    let crawl = dstVal;
    path.push(crawl);
    let ai = 1;
    // console.log("crawl",pred[this.find(crawl, chords)])
    while (pred[this.find(crawl, chords)] !== -1) {
      path.push(pred[this.find(crawl, chords)]);
      crawl = pred[this.find(crawl, chords)];
      ai++;
      // console.log("crawl",crawl)
      // console.log("ai",ai)
      if (ai === 1000) return;
    }

    //
    this.shortestPathVar = path;
    for (let b = 0; b < path.length; b++) {
      let pr = null,
        nex = null;
      let tem = path[b];
      if (b < path.length - 1) {
        nex = path[b + 1];
      }
      if (b > 0) pr = path[b - 1];

      // for (let j = 0; j < chords.length; j++) {
      //     if (tem === chords[j]) {
      //         t[b]['x'] = this.mod(tem);
      //         t[b]['y'] = this.div(tem);
      //         break;
      //     }
      // }
      if (path[b + 1] !== undefined) {
        console.log("pathh", path[b], path[b + 1]);
        this.makePath(path[b], path[b + 1]);
      }
      this.yellow(path[b]);
    }

    // for (let b = path.length - 1; b >= 0; b--) {
    // for (let c = 0; c < obj.cords.length; c++) {
    // if (i === obj.cords[c].value) {
    // document.getElementById("name").innerHTML = obj.cords[c].name;
    // document.getElementById("description").innerHTML = obj.cords[c].description;
    // document.getElementById("tags").innerHTML = obj.cords[c].Tags;
    // }
    // this.yellow(b);
    // }
    // }

    //  unique = t.filter((arr, index, self) =>
    //     index === self.findIndex((s) => (s.value === arr.value)))
  };

  mod = a => {
    return a % 100;
  };

  sl = (a, b) => {
    var ax = this.mod(a);
    var ay = this.div(a);
    var bx = this.mod(b);
    var by = this.div(b);
    var slope = (by - ay) / (bx - ax);
    return slope;
  };

  div = a => {
    return Math.floor(a / 100);
  };

  BFS = (pred, dist) => {
    let { srcVal, dstVal } = this.state;
    let chords = this.props.allNodes[0].nodes;
    let links = this.props.allNodes[0].links;
    var queue = [];
    var visited = [];
    for (let i = 0; i < chords.length; i++) {
      visited[i] = false;
      dist[i] = 100000;
      pred[i] = -1;
    }
    visited[this.find(srcVal, chords)] = true;
    dist[this.find(srcVal, chords)] = 0;
    queue.push(srcVal);
    let o = 0;
    let connectedNodes = links.map(r => {
      return r.connectedNode;
    });
    let d = [];
    for (let i = 0; i < connectedNodes.length; i++) {
      let b = connectedNodes[i].split(",").map(function(item) {
        return parseInt(item, 10);
      });
      d.push(b);
    }
    //  let connectedTo = [];
    // for(let ii=0;ii<d.length;ii++){
    //   if(srcVal === d[ii][0]){
    //     connectedTo.push(d[ii][1])
    //   }
    //   if(srcVal === d[ii][1]){
    //     connectedTo.push(d[ii][0])
    //   }
    // }
    while (queue.length !== 0) {
      let u = queue.shift();
      // equivalent to pop
      var inde = this.find(u, chords);
      // console.log("chords and indss",parseInt(chords[inde].node))
      let nd = parseInt(chords[inde].node);
      let connectedTo = [];
      for (let ii = 0; ii < d.length; ii++) {
        if (nd === d[ii][0]) {
          connectedTo.push(d[ii][1]);
        }
        if (nd === d[ii][1]) {
          connectedTo.push(d[ii][0]);
        }
      }

      console.log("connected to", connectedTo);
      o++;
      for (let b = 0; b < connectedTo.length; b++) {
        // console.log("connected to b",connectedTo[b],"length",this.length(u, connectedTo[b]),"dist",dist[this.find(u, chords)],"other dist",dist[this.find(connectedTo[b], chords)])
        if (
          this.length(u, connectedTo[b]) + dist[this.find(u, chords)] <
          dist[this.find(connectedTo[b], chords)]
        ) {
          visited[this.find(connectedTo[b], chords)] = true;
          dist[this.find(connectedTo[b], chords)] =
            dist[this.find(u, chords)] + this.length(u, connectedTo[b]);
          pred[this.find(connectedTo[b], chords)] = u;
          queue.push(connectedTo[b]);
          // console.log("visited",visited,"dist",dist,"pred",pred,"queue",queue)
          o++;
          if (o > 100) return false;
        }
      }
      if (o > 100) return false;
    }
    if (dist[this.find(dstVal, chords)] === 100000) return false;
    return true;
  };

  length = (A, B) => {
    var x1 = Math.floor(A / 100);
    var x2 = Math.floor(B / 100);
    var y1 = A % 100;
    var y2 = B % 100;
    var z = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    // console.log("A,B:"+A+" "+B+"z: "+z);
    return Math.sqrt(z);
  };

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

  // find = (key, array) =>{ //returns the index at which key is store in array
  //     for (let i = 0; i < array.length; i++) {
  //         if (array[i] === key) {
  //             return i;
  //         }
  //     }
  //     return -1;
  // }

  makePath = (x, y) => {
    var a, b, c, d, e, f, g;
    a = Math.floor(x / 100);
    b = x % 100;
    c = Math.floor(y / 100);
    d = y % 100;
    e = Math.floor((a + c) / 2);
    f = Math.floor((b + d) / 2);
    if ((e === a) & (f === b)) {
      g = 100 * c + b;
      this.blue(g);
    } else if ((e === c) & (f === d)) {
      g = 100 * a + d;
      this.blue(g);
    } else {
      g = 100 * e + f;
      this.blue(g);
      this.makePath(g, x);
      this.makePath(g, y);
    }
  };

  handleSubmit = () => {
    let { srcVal, dstVal } = this.state;
    // let srcVal = this
    this.reset();
    this.shortest_path();
    this.red(srcVal);
    this.green(dstVal);
  };

  /* NAVIGATION DRAWER */
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  /*COLOR GRID */

  greygrid = () => {
    let kk = 0;
    for (let ii = 0; ii < 60; ii++) {
      for (let jj = 0; jj < 60; jj++) {
        kk = 100 * ii + jj;
        this.refs[kk].style.border = ".016px solid #C0C0C0";
      }
    }
  };

  display = () => {
    for (let i = 0; i < this.props.lists.length; i++) {
      let node = this.props.lists[i].Node;
      this.red(node);
    }
    if (this.props.links.length > 0) {
      for (let i = 0; i < this.props.links.length; i++) {
        let connectedPoints = this.props.links[i].links;
        this.finalPath(connectedPoints[0], connectedPoints[1]);
      }
    }
  };

  green = i => {
    this.refs[i].style.backgroundColor = "lawngreen";
    this.refs[i].style.opacity = "1";
  };
  orange = i => {
    this.refs[i].style.backgroundColor = "orange";
    this.refs[i].style.opacity = "1";
  };
  red = i => {
    this.refs[i].style.backgroundColor = "red";
    this.refs[i].style.opacity = "1";
  };
  yellow = i => {
    this.refs[i].style.backgroundColor = "yellow";
    this.refs[i].style.opacity = "1";
  };
  blue = i => {
    this.refs[i].style.backgroundColor = "blue";
    this.refs[i].style.opacity = "1";
  };
  reset = () => {
    let kk = 0;
    for (let ii = 0; ii < 60; ii++) {
      for (let jj = 0; jj < 60; jj++) {
        kk = 100 * ii + jj;
        this.refs[kk].style.backgroundColor = "";
      }
    }
  };

  render() {
    let k = 0;
    let dom = [];
    for (let i = 0; i < 60; i++) {
      for (var j = 0; j < 60; j++) {
        k = 100 * i + j;
        dom.push(
          <div
            className="grid-item"
            ref={`${k}`}
            id={`${k}`}
            onClick={this.clk.bind(this, k)}
          ></div>
        );
      }
    }

    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <nav class="shadow-sm navbar navbar-light bg-dark navigation">
          <div className="d-flex bd-highlight" style={{ width: "100%" }}>
            <div className="p-2 flex-shrink-1 bd-highlight">
              <button
                className="mt-2 navbar-toggler hidden-sm-up float-xs-left"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.drawerToggleClickHandler}
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>

            <div className="w-100 bd-highlight">
              <div className="d-flex-column">
                <div className="flex-fill input-group ">
                  <div
                    className="input-group-prepend mb-1"
                    style={{ width: "100%" }}
                  >
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      value={this.state.srcName}
                      onChange={this.srcChange}
                    >
                      <option value="none" selected disabled hidden>
                        Starting Point
                      </option>
                      {this.state.list.map((l, i) => {
                        return (
                          <option value={l} key={i}>
                            {l}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div class="flex-fill input-group">
                  <div class="input-group-prepend" style={{ width: "100%" }}>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect2"
                      value={this.state.dstName}
                      onChange={this.dstChange}
                    >
                      <option value="none" selected disabled hidden>
                        Destination
                      </option>
                      {this.state.list.map((l, i) => {
                        return (
                          <option value={l} key={i}>
                            {l}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="d-flex justify-content-center">
          <div
            id="example2"
            style={{
              background: `url(${config.imgUrl}${this.props.getImage[1]}) 0% 0% / 100% 100% no-repeat`
            }}
          >
            <div className="grid-container">
              {dom.map(r => {
                return r;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getImage: state.imgDetails,
    allNodes: state.getAllElem
    //   bList: state.buildingList,
    //   fList: state.floorList
  };
};

export default connect(mapStateToProps, { imgDetails, getAllElements })(
  Navigation
);
