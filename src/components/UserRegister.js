import React from "react";
import { connect } from "react-redux";
import {appRegister} from '../store/actions/index';
import { withTranslation } from 'react-i18next';
import { ToastContainer, toast } from "react-toastify";

class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      username: "",
      password: "",
      language: "",
      age: "",
      blindStatus: false,
      feet: 0,
      inches: 0
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {age,feets,inches,email,username,password,blindStatus } = this.state;
    let language = localStorage.getItem('Language')
    let height = parseInt(parseInt(feets)/0.032808) + parseInt(parseInt(inches)/0.39370)
    let data = {language,age,height,email,name:username,password,isVisuallyImpaired:blindStatus,mode:"manual"}
    this.props.appRegister(data,()=>{
      let successData = this.props.signup;
      // console.log("login", this.props.signup);
      if (successData.success === true) {
      this.props.history.push('/cmb/user-login')
      } else {
        toast.error(`Mobile number or UHID already exists`);
      }
    })
    };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary  m-2"
          type="button"
          onClick={this._prev}
        >
        {this.props.t(`Previous`)}
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 2) {
      return (
        <button
          className="btn btn-primary float-right m-2"
          type="button"
          onClick={this._next}
        >
          {this.props.t(`Proceed`)}
        </button>
      );
    }
    return null;
  }

  render() {
    const { t,i18n } = this.props;
    return (
      <React.Fragment>
          <ToastContainer />
        <div className="container  pt-5 mb-3">
          <div>
            <a href="https://inclunav.apps.iitd.ac.in/">
              {" "}
              <img
                className="mx-auto d-block"
                style={{
                  height: "100px",
                  backgroundColor: "##f7f7f7"
                }}
                src="/knc/incl.png"
                alt="pathFinder Logo"
              />
            </a>
            <h4
              className="text-centeSubmitr mt-2 font-weight-bolder"
              style={{ color: "#4782bc" }}
            >
              {t('Welcome to Kamla Nehru College Indoor Navigation Assistance')}                            
            </h4>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            t = {t}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            blindStatus={this.state.blindStatus}
            age={this.state.age}
            feets={this.state.feets}
            inches={this.state.inches}
            t = {t}

          />
          {this.previousButton()}
          {this.nextButton()}
        </form>
      </React.Fragment>
    );
  }
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <div className="container">
      <div className="d-flex-column justify-content-center text-info font-weight-bold text-center">
        <label htmlFor="username">Select Language</label>
        <div className="radio" onChange={props.handleChange.bind(this)}>
          <div>
            <label className="h3">
              <input type="radio" name="language" value="English" checked={props.language === "English"} />
              <span className="ml-2">English </span>
            </label>
          </div>
          <div>
            <label className="h3">
              <input type="radio" name="language" value="Hindi" checked={props.language === "Hindi"} />{" "}
              <span className="ml-2"> हिंदी  </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="container">
      <div className="form-group">
        <input
          className="form-control mb-2"
          id="username"
          name="username"
          type="text"
          placeholder={props.t("Enter Username")}
          value={props.username}
          onChange={props.handleChange}
          required
        />
        <input
          className="form-control mb-2"
          id="email"
          name="email"
          type="text"
          placeholder={props.t("Enter Mobile Number or UHID")}
          value={props.email}
          onChange={props.handleChange}
          required

        />
        <input
          className="form-control mb-2"
          id="password"
          name="password"
          type="password"
          placeholder={props.t("Enter Password")}
          value={props.password}
          onChange={props.handleChange}
          required

        />
      </div>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="age"
            aria-describedby="emailHelp"
            placeholder={props.t("Enter Age")}
            name="age"
            value= {props.age}
            onChange={props.handleChange}
            required            
          />
        </div>
        <div className="form-group font-weight-bold text-info">
          <label htmlFor="exampleInputPassword1">
            {props.t(`Please input your height`)}
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="exampleInputPassword1"
            placeholder={props.t("Enter Feet")}
            name="feets"
            value= {props.feets}
            onChange={props.handleChange}
            required
          />
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={props.t("Enter Inches")}
            name="inches"
            value= {props.inches}
            onChange={props.handleChange}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            name="blindStatus"
            checked={props.blindStatus}
            onChange={props.handleChange}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
          {props.t(`I am Blind or Visually Impaired`)}
          </label>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-light navbar-inner">
            {props.t(`Sign Up`)}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    signup:state.appRegister
  };
};

export default withTranslation()(connect(mapStateToProps, {
  appRegister
})(UserRegister));