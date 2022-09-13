import React from 'react';
import { connect } from 'react-redux';
import {qrdecrypt} from '../store/actions/index';

class UserInfo extends React.Component{

    render(){
        console.log("decrypt",this.props.decrypt)
        let data = this.props.decrypt;
        return (
            <div>
                <div class="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{data.result.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">
    <div className="d-flex-column">Mobile Number:{data.result.mobileNo}</div>
    </h6>
    <div>
     Room Name: {data.result.roomName}   
    </div>
    <div>
     Room Number: {data.result.roomId}   
    </div>
    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    <div className="d-flex-column">
    <div> <a href="#" className="card-link">UHID:{data.result.uhid}</a></div>
    <div><a href="#" className="card-link">Department Number:{data.result.dptNo}</a></div>

    </div>
  </div>
</div>
            </div>
        )    
    }
}

const mapStateToProps = (state)=>{
    console.log("decrypt",state.decrypt)
    return {
      decrypt: state.decrypt
    }
}

export default connect(mapStateToProps,{qrdecrypt})(UserInfo);  