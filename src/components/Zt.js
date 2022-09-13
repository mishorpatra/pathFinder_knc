import React from 'react';

class Zt extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.canvas = null;
        this.context = null;
        this.position = {
            x:0,
            y:0
        }
        this.scale= {
            x:0.5,
            y:0.5
        }
        this.imgTexture = null;
        this.lastZoomScale = null;
        this.lastX = null;
        this.mdown = false;
        this.init = false;
        this.imgDiv = null;
        requestAnimationFrame(this.animate.bind(this));
    }

    componentDidMount(){
            const canvas = this.refs.canvas
            this.canvas = canvas
            const ctx = canvas.getContext("2d");
            this.context = ctx;
            const img = this.refs.image;
            this.img = img;
            this.imgDiv = img;
            img.hidden = true;
            img.onload = () => {
              ctx.drawImage(img, 0, 0,this.imgDiv.width,this.imgDiv.height,0,0,canvas.width,canvas.height);
              ctx.font = "40px Courier"
              ctx.fillText(this.props.text, 210, 75)
            }
              if(!this.init) {
                if(this.imgDiv.width) {
                    var scaleRatio = null;
                    if(this.canvas.clientWidth > this.canvas.clientHeight) {
                        scaleRatio = this.canvas.clientWidth / this.imgDiv.width;
                    }
                    else {
                        scaleRatio = this.canvas.clientHeight / this.imgDiv.height;
                    }
                    this.scale.x = scaleRatio;
                    this.scale.y = scaleRatio;
                    this.init = true;
                }
            }
            // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // this.context.drawImage(
            //     this.img, 
            //     this.position.x, this.position.y, 
            //     this.scale.x * this.imgDiv.width, 
            //     this.scale.y * this.imgDiv.height);
            // requestAnimationFrame(this.animate.bind(this));
    }

    animate = ()=>{
        if(!this.init){
            if(this.imgDiv.width){
                var scaleRatio = null;
                if(this.canvas.clientWidth > this.canvas.clientHeight) {
                    scaleRatio = this.canvas.clientWidth / this.imgDiv.width;
                }
                else {
                    scaleRatio = this.canvas.clientHeight / this.imgDiv.height;
                }

                this.scale.x = scaleRatio;
                this.scale.y = scaleRatio;
                this.init = true;
            }
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let imgDiv =this.refs.image;
                
        imgDiv.onload = ()=>{
            this.context.drawImage(imgDiv,0,0,imgDiv.width,imgDiv.height,0,0,this.canvas.width,this.canvas.height)
       }

        this.context.drawImage(
            this.img, 
            this.position.x, this.position.y, 
            this.scale.x * this.imgDiv.width, 
            this.scale.y * this.imgDiv.height);

        // requestAnimationFrame(this.animate.bind(this));
    }

    gesturePinchZoom = (e)=>{
        let zoom = false;
        if( e.targetTouches.length >= 2 ) {
            var p1 = e.targetTouches[0];
            var p2 = e.targetTouches[1];
            var zoomScale = Math.sqrt(Math.pow(p2.pageX - p1.pageX, 2) + Math.pow(p2.pageY - p1.pageY, 2)); //euclidian distance
            if( this.lastZoomScale ) {
                zoom = zoomScale - this.lastZoomScale;
            }
            this.lastZoomScale = zoomScale;
        }    
        return zoom;
    }

    doZoom = (zoom)=>{
        if(!zoom) return;
        //new scale
        var currentScale = this.scale.x;
        var newScale = this.scale.x + zoom/100;

        //some helpers
        var deltaScale = newScale - currentScale;
        var currentWidth    = (this.imgDiv.width * this.scale.x);
        var currentHeight   = (this.imgDiv.height * this.scale.y);
        var deltaWidth  = this.imgDiv.width*deltaScale;
        var deltaHeight = this.imgDiv.height*deltaScale;

        //by default scale doesnt change position and only add/remove pixel to right and bottom
        //so we must move the image to the left to keep the image centered
        //ex: coefX and coefY = 0.5 when image is centered <=> move image to the left 0.5x pixels added to the right
        var canvasmiddleX = this.canvas.clientWidth / 2;
        var canvasmiddleY = this.canvas.clientHeight / 2;
        var xonmap = (-this.position.x) + canvasmiddleX;
        var yonmap = (-this.position.y) + canvasmiddleY;
        var coefX = -xonmap / (currentWidth);
        var coefY = -yonmap / (currentHeight);
        var newPosX = this.position.x + deltaWidth*coefX;
        var newPosY = this.position.y + deltaHeight*coefY;

        //edges cases
        var newWidth = currentWidth + deltaWidth;
        var newHeight = currentHeight + deltaHeight;
        
        if( newWidth < this.canvas.clientWidth ) return;
        if( newPosX > 0 ) { newPosX = 0; }
        if( newPosX + newWidth < this.canvas.clientWidth ) { newPosX = this.canvas.clientWidth - newWidth;}
        
        if( newHeight < this.canvas.clientHeight ) return;
        if( newPosY > 0 ) { newPosY = 0; }
        if( newPosY + newHeight < this.canvas.clientHeight ) { newPosY = this.canvas.clientHeight - newHeight; }

        //finally affectations
        this.scale.x    = newScale;
        this.scale.y    = newScale;
        this.position.x = newPosX;
        this.position.y = newPosY;
    }

        doMove = (relativeX,relativeY)=>{
            if(this.lastX && this.lastY) {
                var deltaX = relativeX - this.lastX;
                var deltaY = relativeY - this.lastY;
                var currentWidth = (this.img.width * this.scale.x);
                var currentHeight = (this.img.height * this.scale.y);
                this.position.x += deltaX;
                this.position.y += deltaY;
                if( this.position.x > 0 ) {
                  this.position.x = 0;
                }
                else if( this.position.x + currentWidth < this.canvas.clientWidth ) {
                  this.position.x = this.canvas.clientWidth - currentWidth;
                }
                if( this.position.y > 0 ) {
                  this.position.y = 0;
                }
                else if( this.position.y + currentHeight < this.canvas.clientHeight ) {
                  this.position.y = this.canvas.clientHeight - currentHeight;
                }
              }
  
              this.lastX = relativeX;
              this.lastY = relativeY;
        }

        touchStart =(e)=>{
            this.lastX          = null;
            this.lastY          = null;
            this.lastZoomScale  = null;
        }

        touchMove = (e)=>{
            e.preventDefault();
            if(e.targetTouches.length === 2) { 
                this.doZoom(this.gesturePinchZoom(e));
            }
            else if(e.targetTouches.length === 1) {
                var relativeX = e.targetTouches[0].pageX - this.canvas.getBoundingClientRect().left;
                var relativeY = e.targetTouches[0].pageY - this.canvas.getBoundingClientRect().top;                
                this.doMove(relativeX, relativeY);
            }
        }

        checkRequestAnimationFrame=()=> {
            console.log("checked")
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = 
                  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }

            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }
        }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={640} height={425}  onTouchMove={this.touchMove} onTouchStart = {this.touchStart} />
                {/* <img ref="image" src="http://inclunav.apps.iitd.ac.in//static/ground.jpg" className="hidden" /> */}
            </div>
        )
    }
}

export default Zt;