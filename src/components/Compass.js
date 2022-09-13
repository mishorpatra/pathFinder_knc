import React from 'react';

class MyCompass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tiltLR:0,
            tiltFB:0,
            dir:0
        }
    }
    componentDidMount(){
        let me = this;
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(eventData) {
                // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
              var tiltLR = eventData.gamma;
              // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
              var tiltFB = eventData.beta;
              // alpha: The direction the compass of the device aims to in degrees.
              var dir = eventData.alpha
              var heading  = 360 - dir;
              console.log("tilt fb abd lr",tiltLR,tiltFB)
              // Call the function to use the data on the page.
              me.setState({
                tiltLR:Math.ceil(tiltLR),
                tiltFB:Math.ceil(tiltFB),
                dir:Math.ceil(heading)
        })
        var compassDisc = document.getElementById("compassDiscImg");
        compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
        compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
        compassDisc.style.transform = "rotate("+ dir +"deg)";

            //   this.deviceOrientationHandler(tiltLR, tiltFB, dir);
            }, false);
          } else {
            document.getElementById("notice").innerHTML = "Helaas. De DeviceOrientationEvent API word niet door dit toestel ondersteund."
          };
    }


    render(){
        return(
            <div>
<div>
        <h1>Explore</h1>
        <div id="notice" />
        <div className="compass">
          <div className="arrow">
            
      <svg class="compass__pointer" viewBox="0 0 130 130" version="1.1" xmlns="http://www.w3.org/2000/svg">

<polyline points="60,60  70,60  65,15" fill="#b60000"/>
<polyline points="60,70  70,70  65,115" fill="white"/>
<circle cx="65" cy="65" r="7" stroke="#b60000" stroke-width="7" fill="none" />

</svg>
        </div>
          <div className="disc" id="compassDiscImg">
        
          <svg class="compass__rose__dial" viewBox="0 0 130 130" version="1.1" xmlns="http://www.w3.org/2000/svg">

                <circle cx="65" cy="65" r="56" stroke="white" stroke-width="1" fill="none" />
                <polyline points="63,9  67,9  65,13" fill="white"/>
                <polyline points="121,63  121,67  119,65" fill="white"/>
                <polyline points="63,121  67,121  65,119" fill="white"/>
                <polyline points="9,63  9,67  11,65" fill="white"/>

                <text x="65" y="4.2" font-size="5" text-anchor="middle" fill="white">N</text>
                <text x="127" y="67" font-size="5" text-anchor="middle" fill="white">E</text>
                <text x="65" y="129" font-size="5" text-anchor="middle" fill="white">S</text>
                <text x="2.8" y="67" font-size="5" text-anchor="middle" fill="white">W</text>

                </svg>
        </div>
        </div>
        <div className="orientation-data">
          <div>Tilting the device from left to right: <span id="tiltFB" />{this.state.tiltFB} </div>
          <div>Tilting the device from the front to the back: <span id="tiltLR" />{this.state.tiltLR} </div>
        <div>Richting: <span id="direction" />{this.state.dir}</div>
        </div>
      </div>
            </div>
        )
    }
}

export default MyCompass;