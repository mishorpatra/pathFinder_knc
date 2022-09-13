import React from 'react';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';


class KioskLanding extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
    
    changeLanguage = code => {
        this.props.i18n.changeLanguage(code);
      };

    render(){
        return(
            <div>
                <div className="container">
                    <div className="d-flex justify-content-center">
                            <img src="/aiims/assets/images/rpc_logo.png" alt="" style={{height: '100%'}} />               
                    </div>
                    <div className="text-primary text-center">
                        <span className="h1">Dr R P Centre For Ophthalmic Sciences</span>  
                            <br />             
                        <span className="h3">Intelligent Indoor Wayfinding</span>               
                    </div>
                </div>  
                <div className="container">
                    <div className="mt-4 h4 text-center text-primary">भाषा का चयन करें / select the language</div> 
                    <div className="row">
                        <div className="col-6">
                        <button className="btn btn-lg btn-block btn-primary text-white" onClick={()=>{localStorage.setItem('Language','Hindi') 
                        this.changeLanguage('hi')                        
                        this.props.history.push({ pathname: '/kiosk1',
                        search: '?query=RajendraPrasadCentre'})}}>हिंदी</button>
                        </div>
                        <div className="col-6">
                           <button className="btn btn-lg btn-block btn-primary text-white"onClick={()=>{localStorage.setItem('Language','Hindi') 
                        this.changeLanguage('en')                        
                        this.props.history.push({pathname: '/kiosk1',
                        search: '?query=RajendraPrasadCentre'})}} >English</button>
                        </div>   
                      </div>
                </div>
            </div>   
        )
    }
}

export default withTranslation()(KioskLanding);