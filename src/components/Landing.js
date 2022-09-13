import React from 'react';
import {Link} from 'react-router-dom';
import UserSelect from './UserSelect';
import Drawer from 'react-drag-drawer'
import {css} from 'emotion';

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

const Toggle = css`
  background-color: #d50152;
  border-radius: 4px;
  color: white;
  border: 0;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin-left:50%;
  margin-top:0px !important;
  transition: all 0.25s linear;
  &:active {
    transform: scale(0.9);
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


class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed:true,
            showModal:false,
            sideDrawerOpen: false,
          open:false,
          sidebarLeft: false,

        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }
    toggle = (type, value) => event => {
      this.setState(state => {
        return {
          [type]: value
        };
      });
    };
  
    toggleNavbar() {
        this.setState({
        collapsed: !this.state.collapsed,
        });
    }
    showModal = ()=>{
        this.setState({
            showModal: true
        })
    }
    handleModal = (val) => {
        this.setState({
            showModal: val
        })
    }
    componentDidMount(){
      localStorage.clear()
    }
    handleRoute(val){
        this.props.history.push(val)
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
      } = this.state;

        return (
            <div>
            {this.state.showModal ? <UserSelect hideModal={this.handleModal} cancel={this.handleCancel} /> : null}            
    <nav class="shadow-sm navbar navbar-light bg-dark navigation" style={{background: "linear-gradient(to bottom , #09203f, #1d4a6d  )"}}>
      <div className="d-flex bd-highlight" style={{ width: "100%" }}>
        <div className="flex-shrink-1 bd-highlight">
        <button
                className="mt-1 navbar-toggler hidden-sm-up float-xs-left"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.toggle("sidebarLeft", true)}
              >
                <i class="fa fa-bars text-white" style={{fontSize:"24px"}}></i>
              </button>
        <Drawer
          open={sidebarLeft}
          onRequestClose={this.toggle("sidebarLeft", false)}
          modalElementClass={Sidebar}
          direction="left"
          
        >
          <div className={Card}>

                                <div className=" navbar-menu-wrapper d-flex align-items-stretch">
                                    <ul className="ml-3 navbar-nav navbar-nav-right">
                                    <li className="mt-5 mb-3">
                                       <Link to="/"><span className="mb-3 h3 text-white"><i className="fa fa-home mr-2"></i>Home</span></Link>
                                     </li>
                                    <li className="mt-2 mb-3">
                                       <Link to="/about-us"><span className=" h3 text-white"><i className="fa fa-group mr-2"></i>About Us</span></Link>
                                     </li>
                                     <li className="mt-2 mb-3">
                                       <Link to="/how-to-use"><span className=" h3 text-white"><i className="fa fa-info-circle mr-2"></i>How To Use</span></Link>
                                     </li>
                                     <li className="mt-2 mb-3">
                                       <Link to="/feedback"><span className=" h3 text-white"><i className="fa fa-paper-plane-o mr-2"></i>Send Feedback</span></Link>
                                     </li>
                                     <li className="mt-2 mb-3">
                                       <Link to="/support"><span className=" h3 text-white"><i className="fa fa-question-circle mr-2"></i>Support</span></Link>
                                     </li>
                                    </ul>
                                </div>
          </div>
        </Drawer>
        </div>
        <div className="d-flex-column text-white font-weight-bold ml-5">
             <h1 className="font-weight-bold">INCLUNAV</h1>
         </div>
      </div>
    </nav>
            <div className="container mt-5">
            <div className="mr-5 ml-5 d-flex flex-column align-items-center">
                <button type="button" className="mb-5 btn btn-lg btn-dark text-uppercase font-weight-bold text-white btn-block" style={{background: "linear-gradient(to bottom , #09203f, #1d4a6d  )"}} onClick={this.handleRoute.bind(this,'/select')} aria-label="navigate to building andf floor selection page" >
                    Navigate
                </button>
                <button type="button" className="mb-5 btn btn-lg btn-dark text-uppercase font-weight-bold text-white btn-block" style={{background: "linear-gradient(to bottom , #09203f, #1d4a6d  )"}} onClick={this.handleRoute.bind(this,'/compass')} aria-label="go to appointment page" >
                    Explore
                </button><button type="button" className="mb-5 btn btn-lg btn-dark text-uppercase font-weight-bold text-white btn-block" style={{background: "linear-gradient(to bottom , #09203f, #1d4a6d  )"}} onClick={this.handleRoute.bind(this,'/reports')} aria-label="go to reports page" >
                    Contribute
                </button>
                <button type="button" className="mb-5 btn btn-lg btn-dark text-uppercase font-weight-bold text-white btn-block" style={{background: "linear-gradient(to bottom , #09203f, #1d4a6d  )"}} onClick={this.showModal} aria-label="go to upload report" >
                    Finder
                </button>
            </div>
        </div>
        </div>
        )
    }
}

export default Landing;