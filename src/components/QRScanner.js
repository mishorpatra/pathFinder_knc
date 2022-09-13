import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {qrdecrypt} from '../store/actions/index';
import config from '../config';

class QRScanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      config: config.decrypt
    }
    this.handleScan = this.handleScan.bind(this)
  }
  componentDidMount(){
    // this.props.qrdecrypt('nullf 0rdD6//jCkJaRoaMHKkdu7YFwwtcBh LoW/e0/t5QEWAqAoJf9dOJ1fpSyDjn3LV2h5I1/0vZ3inXTA0UE50f73GcpanOKwEjy12O6yl9X7IoJsnQmo1GWlTuM7BDf',()=>{
      // console.log("success")
          // this.props.history.push('/user');
      // })
  }
  handleScan(data){
    if(data !== null){
      console.log("scanned",data)
      this.props.qrdecrypt(data,()=>{
        console.log("decrypted data",data)
          this.props.history.push('/select');
      })
      this.setState({
        result: data,
      })  
    }
  }

  handleError(err){
    console.error(err)
  }

  render(){
    const previewStyle = {
      height: "100vh",
      width: "100%",
    }
 
    return(
      <div style={{background:"linear-gradient(to bottom , #09203f, #1d4a6d)"}}>
       <Link to="/"> <span class="badge badge-pill badge-primary">Go Back</span></Link> 
        <div className="d-flex justify-content-center">
        <span class="mt-5 badge badge-dark">Please scan printed QR Code from your card</span>
        </div>
        <QrReader
          delay={this.state.delay}
          style={{height:"100vh",width:"100%",background:"linear-gradient(to bottom , #09203f, #1d4a6d)"}}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode="rear"
          className="mt-5 videosize bg-dark"
          />
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    decrypt: state.decrypt
  }
}

export default connect(mapStateToProps,{qrdecrypt})(QRScanner);
