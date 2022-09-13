import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import { buildingList,floorList,imgList } from '../store/actions/index';
import {css} from 'emotion';
import Drawer from 'react-drag-drawer'

const Card = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 40px auto;

  @media (min-width: 768px) {
    border-radius: 0;
  }

  button {
    margin-top: 50px;
  }
`;

const modal = css`
  position: absolute;
  top: 30px;
  background-color: white;
  width: 100%;
  max-width: 700px;
  min-height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Sidebar = css`
  ${modal} top: 0;
  max-width: 300px;
  border-radius: 0;
  left: 0;
  background: linear-gradient(to bottom , #09203f, #1d4a6d  );
`;

class UserSelect extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectBuilding:[],
            buildingName:null,
            fileName:null,
            bList:[],
            floor:null,
            fList:[],
            mapData:[],
            listData:null,
      sideDrawerOpen: false,
      sidebarLeft: false,
        }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBuildingChange = this.handleBuildingChange.bind(this);
    // this.handleFloorChange = this.handleFloorChange.bind(this);
    }
    toggle = (type, value) => event => {
        this.setState(state => {
          return {
            [type]: value
          };
        });
      };

    handleBuildingChange(event){
      localStorage.setItem('blockName',event.target.value)                            
        this.setState({
            buildingName: event.target.value
        },()=>{
          
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.history.push({
            pathname: '/wayfinding',
            search: `${this.state.buildingName}`,
        })
    }

    componentWillMount(){
        this.props.buildingList(()=>{
            this.setState({
                bList: this.props.bList
            })
        })
    }

    componentDidMount(){
        // alert("building list"+ JSON.stringify(this.props))
    }

    drawerToggleClickHandler = () => {
        this.setState(prevState => {
          return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
      };
      backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
      };
    render(){
        const {
            sidebarLeft,
          } = this.state
        return(
            <div  style={{backgroundColor:"#f7f7f7",height:"100vh"}} >     
        <main role="main" className="container"  >
        <div className="container  pt-5 mb-3">
                    <div>
                            <img className="mx-auto d-block" style={{width:"100px",height:"100px",backgroundColor:"##f7f7f7"}} src="/aiims/incl.png" alt="Inclunav Logo" />
                        <h2 className="text-center mt-2" style={{color:"#4782bc"}} >Dr R P Centre For Ophthalmic Sciences</h2>
                        <p className="text-center mt-2 h5 text-info font-weight-bold" >Intelligent Indoor Wayfinding</p>
                    </div>
            </div>
                       <div className="my-3 p-3 bg-white rounded shadow-sm">
            <form onSubmit={this.handleSubmit}>
                            <div className="form-group mt-5">
                               <select className="form-control" id="exampleFormControlSelect1" value={this.state.buildingName} onChange={this.handleBuildingChange} required >
                               <option value="" selected disabled hidden> Select Building </option> 
                                   {this.state.bList.map((building,i)=>{
                                       return(<option value={building.buildingName} key={i}>{building.buildingName}</option>)
                                   })}
                               </select>
                            </div>
                            <button type="submit" className="btn btn-success btn-block pt-3" >
                                Navigate Now
                            </button>
                            </form>
                            <div class="row d-flex justify-content-center mt-3">
            </div>
            </div>
        </main>
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
          bList: state.buildingList,
          fList: state.floorList
      }
  }

export default connect(mapStateToProps, { floorList,buildingList,imgList })(UserSelect);
