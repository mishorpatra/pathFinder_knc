import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import { buildingList,floorList,imgList } from '../store/actions/index';
import {css} from 'emotion';
import Drawer from 'react-drag-drawer'
import { withTranslation } from 'react-i18next';

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

class Select extends React.Component{
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
            token:null
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
        this.setState({
            buildingName: event.target.value
        },()=>{
          
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.history.push({
            pathname: '/rpc/wayfinding',
            search: `?query=${this.state.buildingName}`,
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
        let token = localStorage.getItem('token');
        this.setState({
          token:token
        })
    }

    drawerToggleClickHandler = () => {
        this.setState(prevState => {
          return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
      };
      backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
      };

      changeLanguage = code => {
        // console.log("code",code,this.props.i18n)
        this.props.i18n.changeLanguage(code);
      };

    render(){
        const {
            sidebarLeft,
          } = this.state
          const { t,i18n } = this.props;
          return(
            <div  style={{backgroundColor:"#f7f7f7",height:"100vh"}} >     
        <main role="main" className="container"  >
        {this.state.token?<button type="button" class="btn btn-light text-secondary navbar-inner float-right mt-2" onClick={()=>{
          localStorage.clear()
          this.props.history.push('/')}}> {t(`Logout`)}</button>
                  :<button type="button" class="btn btn-light text-secondary navbar-inner float-right mt-2" onClick={()=>{
          this.props.history.push('/cmb/user-login')}}>{t(`Go Back`)}</button>}

        <div className="container pt-5 mb-3">
                    <div>
                           <a href="https://inclunav.apps.iitd.ac.in/">  <img className="mx-auto d-block" style={{height:"100px",backgroundColor:"##f7f7f7"}} src="/knc/incl.png" alt="pathFinder Logo" /></a>
                        <h4 className="text-center mt-2 font-weight-bolder" style={{color:"#4782bc"}} >
                        {t('Welcome to Kamla Nehru College Indoor Navigation Assistance')}</h4>
                    </div>
            </div>
            <div className="row w-100 d-flex justify-content-center m-0 mt-5">
          <div  className="col-6" style={{cursor: 'pointer'}}>
          <div
                          className="card mt-4 navbar-inner1"
                          style={{borderRadius:"30px",background:"#f7f7f7"}}
                          onClick = {()=>{ 
                            localStorage.setItem('blockName',"OPD Block")
                            this.props.history.push({
                            pathname: '/cmb/wayfinding',
                            search: `KNCollege`,
                        })}}
                        >
                          <div className="card-body font-weight-bolder text-center"  >
                                <img
                                  src="/aiims/assets/images/building.png"
                                  className="img-responsive mb-2"
                                  alt="search icon"
                                  width="80"
                                  height="80"
                                ></img>
                           <p className="h5 font-weight-bolder text-info">{t('College Main Building')}  </p> 
                          </div>
                        </div>
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

export default withTranslation()( connect(mapStateToProps, { floorList,buildingList,imgList })(Select));
