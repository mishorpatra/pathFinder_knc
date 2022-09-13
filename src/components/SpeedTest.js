import React from 'react';

class SpeedTest extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            aX:null,
            aY:null,
            az:null,
            isSitting:true
        }
    }
    componentDidMount(){
        document.addEventListener(
            "deviceready", this.onDeviceReady, false);

    }
     onDeviceReady = ()=> {
        navigator.accelerometer.getCurrentAcceleration(
         this.onSuccess, this.onError);
   }
   onError=(error)=> {
    alert('error');
  }
   onSuccess=(acceleration)=> {
    
      this.setState({
          aX:acceleration.x,
          aY:acceleration.y,
          aZ:acceleration.z,
          
      })
 
  }
  onScan = ()=>{
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      })
      .then(device => { 
          console.log("devices",device)
      })
      .catch(error => { console.log(error); });
  }
    render(){
        return(<div>
             hello Accelertation
             X:{this.state.aX}
             Y:{this.state.aY}
             Z:{this.state.aZ}
             <button onClick={this.onScan}> Click</button>
        </div>)
    }
}

export default SpeedTest;