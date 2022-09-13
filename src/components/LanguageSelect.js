import React from 'react';
import { withTranslation } from 'react-i18next';

class LanguageSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        let language = localStorage.getItem('Language');
        if(language !== null){
            this.props.history.push('/cmb/user-login')
        }
    }


    changeLanguage = code => {
        this.props.i18n.changeLanguage(code);
      };

    render(){
        return(
            <div className="container mt-5">
                <div>
                        <a href="https://inclunav.apps.iitd.ac.in/">  <img className="mx-auto d-block" style={{height:"100px",backgroundColor:"##f7f7f7"}} src="/knc/incl.png" alt="pathFinder Logo" /></a>
                        <h4 className="text-center mt-2 font-weight-bolder" style={{color:"#4782bc"}} >Welcome to Kamla Nehru College Indoor Navigation Assistance</h4>
                    </div>

                <div className="d-flex-column">
                <button type="button" class="btn btn-light btn-block text-secondary navbar-inner mt-5 mb-5" onClick={()=>{localStorage.setItem('Language','Hindi') 
                        this.changeLanguage('hi')                        
                        this.props.history.push('/cmb/user-login')}}> हिंदी </button>
                <button type="button" class="btn btn-light btn-block text-secondary navbar-inner" onClick={()=>{localStorage.setItem('Language','English') 
                        this.changeLanguage('en')
                        this.props.history.push('/cmb/user-login')}}>English</button>
                </div>
            </div>
        )
    }
}

export default withTranslation()(LanguageSelect);