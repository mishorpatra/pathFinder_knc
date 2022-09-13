import React from "react";
import { connect } from "react-redux";
import { appLogin } from "../store/actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withTranslation } from "react-i18next";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/cmb/select");
    }
    console.log("token", token);
    // localStorage.clear();
  }

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    let data = { email, password, mode: "manual" };
    this.props.appLogin(data, () => {
      let successData = this.props.login;
      console.log("login", this.props.login);
      if (successData.success === true) {
        localStorage.setItem("name", successData.name);
        localStorage.setItem("email", successData.email);
        localStorage.setItem("mode", successData.mode);
        localStorage.setItem("age", successData.age);
        localStorage.setItem(
          "isVisuallyImpaired",
          successData.isVisuallyImpaired
        );
        localStorage.setItem("language", successData.language);
        localStorage.setItem("height", successData.height);
        localStorage.setItem("token", successData.token);
        // localStorage.setItem('age',successData.age)
        this.props.history.push("/cmb/select");
      } else {
        toast.error(`Mobile Number or UHID is Invalid`);
      }
    });
  };

  render() {
    const { t, i18n } = this.props;

    return (
      <div>
        <div className="container mb-3">
          <div className="row">
            <div className="col" />
            <div className="col">
              <button
                type="button"
                class="btn btn-light text-secondary navbar-inner float-right m-2"
                onClick={() => {
                  localStorage.clear("Language");
                  this.props.history.push("/");
                }}
              >
                {t(`Change Language`)}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <a href="https://inclunav.apps.iitd.ac.in/">
                <img
                  className="mx-auto d-block "
                  style={{
                    height: "100px",
                    backgroundColor: "##f7f7f7"
                  }}
                  src="/knc/incl.png"
                  alt="PathFinder Logo"
                />
              </a>
            </div>
            <div className="col"></div>
          </div>
          <h4
            className="text-center mt-2 font-weight-bolder"
            style={{ color: "#4782bc" }}
          >
            {t("Welcome to Kamla Nehru College Indoor Navigation Assistance")}
          </h4>
        </div>
        <div className="container p-0 w-100">
          <ToastContainer />
          <div className="card mt-5 border-0 bg-grey">
            <div className="card-body bg-grey">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={t("Enter Mobile Number or UHID")}
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder={t("Enter Password")}
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      class="btn btn-light btn-lg text-secondary navbar-inner"
                      onClick={() => {
                        this.props.history.push("/cmb/user-register");
                      }}
                    >
                      {t(`Signup`)}
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      class="btn btn-light btn-lg text-secondary navbar-inner float-right"
                    >
                      {t(`Login`)}
                    </button>
                  </div>
                </div>
                <div class="content text-center text-info font-weight-bolder">
                  <p class="or h3">{t(`or`)}</p>
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="submit"
                    class="btn btn-light btn-lg btn-block text-secondary navbar-inner"
                    onClick={() => this.props.history.push("/cmb/select")}
                  >
                    {t(`Visitor Login`)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.appLogin
  };
};

export default withTranslation()(
  connect(mapStateToProps, {
    appLogin
  })(UserLogin)
);
