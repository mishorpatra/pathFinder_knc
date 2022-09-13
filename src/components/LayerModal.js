import React from 'react';
import ReactModal from 'react-modal';
import { connect } from "react-redux";
import config from "../config";

const customStyles = {
  overlay: {zIndex: 10}
};

class LayerModal extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount(){
          this.setState({
              showModal:this.props.open
          })
          console.log("floor list",this.props.fList)
        }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    
    render () {
      return (
        <div>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Minimal Modal Example"
              style={customStyles}
          >
            {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
            <button type="button" class="close" aria-label="Close" onClick={this.handleCloseModal}>
  <span aria-hidden="true">&times;</span>
</button>
            <div>
              {this.props.fList.map((r,i)=>{
                   return(
                    <div className="positioned" style={{marginTop:"50%"}}> <img
                        alt="map"
                        id="myImage"
                        src={`${config.imgUrl}${r.fileName}`}
                        style={{ 
                          transform: "rotate(120deg)",
                          top: `${i*5}%`,
                          left: "25%",
                            position: "absolute", 
                            width:"50%",
                            zIndex: `${i}` }}
                      ></img>Positioned</div>
                   )  
              })}


                {/* <div className="blue positioned" style={{marginTop:"50%"}}>Positioned</div>
                <div className="orange positioned" style={{marginTop:"50%"}}>Positioned</div> */}
            </div>
        {/* <div className="green non-positioned">Non-positioned</div> */}

{/* 
        <div class="showbox" style={{transform: "rotate(30deg)",zIndex:"2"}}>box 1</div>
<div class="showbox" style={{transform: "rotate(30deg)", borderColor: "red",zIndex:"3"}}>box 2</div>
<div class="showbox" style={{transform: "rotate(30deg)",zIndex:"4"}}>box 3</div> */}
{/* <div class="showbox" style={{transform: "scale(2)"}}>box 4</div> */}
<div style={{clear: "left"}}></div>

          </ReactModal>
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
  
  export default connect(mapStateToProps)(LayerModal);
