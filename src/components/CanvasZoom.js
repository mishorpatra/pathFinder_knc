import React from "react";

class CanvasZoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.canvas = null;
        this.context = null;

        this.points = [];
        this.demoPointCount =50;
    }
    componentDidMount(){
        for(let i =0;i<this.demoPointCount;i++){
            this.points.push({y:Math.random()*150-75})
        }
        let canvas = this.refs.canvas;
        this.canvas = canvas;
        let ctx = canvas.getContext("2d");
        this.context = ctx;
        ctx.font='14px arial';
        var cw=canvas.width;
        var ch=canvas.height;
        function reOffset(){
            var BB=canvas.getBoundingClientRect();
            offsetX=BB.left;
            offsetY=BB.top;        
        }
        var offsetX,offsetY;
        reOffset();
        window.onscroll=function(e){ reOffset();}
        window.onresize=function(e){ reOffset();}
        var isDrilled=false;
        var isDown=false;
        var startX,startY;
        var axisY=ch/3;
        this.draw(this.points,axisY)
    }

    // draw = (pts,axisY,startX,mouseX,drillStart,drillEnd)=>{
    //     this.context.
    // }
  render() {
    return (
      <div>
        <canvas
        ref="canvas"
            id="canvas"
            width="512"
            height="512"
            style={{ border: "1px solid red" }}
            onMouseDown = {this.handleMouseDown}
            onMouseMove = {this.handleMOuseMove}
            onMouseUp = {this.handleMouseUp}
            onMouseOut = {this.handleMouseOut}
/>
      </div>
    );
  }
}

export default CanvasZoom;
