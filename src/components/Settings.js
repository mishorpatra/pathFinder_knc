import React from "react";
import { withTranslation } from "react-i18next";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feet: 0,
      inches: 0,
      language: ""
    };
  }

  componentDidMount() {
    let height = localStorage.getItem("height");
    var realFeet = (height * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    let language = localStorage.getItem("Language");
    console.log("feets na inches", feet, inches, language);
    this.setState({
      language: language,
      feets: feet,
      inches: inches
    });
    //   return feet + "&prime;" + inches + '&Prime;';
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if(name === "language"){
      if(value === 'Hindi'){
        this.props.i18n.changeLanguage('hi');
      }else{
        this.props.i18n.changeLanguage('en');
      }
      localStorage.setItem('Language',value)
    }
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="container">
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
                alt="PathFinder Logo"
              />
            </a>
            <h4
              className="text-center mt-2 font-weight-bolder"
              style={{ color: "#4782bc" }}
            >
              {t("Welcome to Kamla Nehru College Indoor Navigation Assistance")}
            </h4>
          </div>
        </div>
        <div className="text-info font-weight-bold mt-5 mb-2">
          <label htmlFor="username">Your Language</label>
          <div className="radio" onChange={this.handleChange.bind(this)}>
            <div>
              <label className="h3">
                <input
                  type="radio"
                  name="language"
                  value="English"
                  checked={this.state.language === "English"}
                />
                <span className="ml-2">English </span>
              </label>
            </div>
            <div>
              <label className="h3">
                <input
                  type="radio"
                  name="language"
                  value="Hindi"
                  checked={this.state.language === "Hindi"}
                />{" "}
                <span className="ml-2">हिंदी</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group font-weight-bold text-info">
          <label htmlFor="exampleInputPassword1">{t(`Your Height`)}</label>
          <input
            type="text"
            className="form-control mb-2"
            id="exampleInputPassword1"
            placeholder="feets"
            name="feets"
            value={this.state.feets}
            onChange={this.handleChange}
          />
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Inches Age"
            name="inches"
            value={this.state.inches}
            onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <div className="col-6">
            <button
              type="button"
              class="btn btn-light btn-lg btn-block text-secondary navbar-inner"
              onClick={() => this.props.history.goBack()}
            >
              {t(`Save`)}
            </button>
          </div>
          <div className="col-6">
            <button
              type="submit"
              class="btn btn-light btn-lg btn-block text-secondary navbar-inner"
              onClick={() => {
                localStorage.clear();
                this.props.history.push("/");
              }}
            >
              {t(`Logout`)}
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <a
              href="https://surveyheart.com/form/5f4dd79bdb5c0353b75e827f"
              className="btn btn-light navbar-inner btn-block text-info font-weight-bolder"
            >
              {t("Contact Us")}
            </a>
          </div>
          <div className="col-6">
            <a
              href="https://surveyheart.com/form/5f4c05c7cb48e936ac3afb14"
              className="btn btn-light navbar-inner btn-block text-info font-weight-bolder"
            >
              {t("Feedback")}
            </a>
          </div>
        </div>

        {/* <div className="bottom-content1">
<div className="row w-100 d-flex justify-content-center mb-5">
          <div className="col-6">
          <a
          href="https://surveyheart.com/form/5f4dd79bdb5c0353b75e827f"
             className="btn btn-light navbar-inner btn-block text-info font-weight-bolder"
           >
            {t('Contact Us')} 
           </a> 
          </div>
          <div className="col-6">
          <a
              href="https://surveyheart.com/form/5f4c05c7cb48e936ac3afb14"
             className="btn btn-light navbar-inner btn-block text-info font-weight-bolder"
           >
            {t('Feedback')} 
           </a> 
          </div>
        </div>
    </div> */}
      </div>
    );
  }
}

export default withTranslation()(Settings);
