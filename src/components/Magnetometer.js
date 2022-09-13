import React from 'react';
import {AbsoluteOrientationSensor} from 'motion-sensors-polyfill'

class Magnetometer  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tiltLR:0,
            tiltFB:0,
            dir:0,
            x:0,
            y:0,
            z:0,
            w:0
        }
    }
    componentDidMount(){
      const options = { frequency: 60, referenceFrame: 'device' };
      const sensor = new AbsoluteOrientationSensor(options);
      let me = this;
      sensor.addEventListener('reading', e => {
          var q = e.target.quaternion;
          let alpha = Math.atan2(2*q[0]*q[1] + 2*q[2]*q[3], 1 - 2*q[1]*q[1] - 2*q[2]*q[2])*(180/Math.PI);
          if(alpha < 0) alpha = 360+ alpha;          
          var dir = 360 - alpha
          me.setState({
            dir:Math.ceil(dir),
            x:q[0],
            y:q[1],
            z:q[2],
            w:q[3]
          })
          var compassDisc = document.getElementById("compassDiscImg");
          compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
          compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
          compassDisc.style.transform = "rotate("+ dir +"deg)";

          this.rotateCompassClockwise(360 - alpha)
        // })
      });
      sensor.start();
    }

    render(){
        return (
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
          {/* <div>Tilting the device from left to right: <span id="tiltFB" />{this.state.tiltFB} </div> */}
          {/* <div>Tilting the device from the front to the back: <span id="tiltLR" />{this.state.tiltLR} </div> */}
        <div>Richting: <span id="direction" />{this.state.dir}</div>
        <div>x: <span id="direction" />{this.state.x}</div>
        <div>y: <span id="direction" />{this.state.y}</div>
        <div>z: <span id="direction" />{this.state.z}</div>
        <div>w: <span id="direction" />{this.state.w}</div>

        </div>
      </div>
            </div>
        )
    }
}

export default Magnetometer