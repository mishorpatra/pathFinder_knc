import React from 'react';
import { Route } from 'react-router-dom';
import QRScanner from  './components/QRScanner';
import UserInfo from './components/UserInfo';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Select from  './components/Select';
import Innav from './components/Innav';
import QRReader from './components/QRReader';
import Kiosk from './components/Kiosk';
import AboutUs from './components/AboutUs';
import HTU from './components/HTU';
import Support from './components/Support';
import Feedback from './components/Feedback';
import Reports from './components/Reports';
import Appointment from './components/Appointment';
import Upload from './components/Upload';
import Test from  './components/test';
import SpeedTest from './components/SpeedTest';
import Geolocation from './components/Geolocation';
import AnimationTest from './components/AnimationTest';
import ZoomTest from './components/ZoomTest';
import Zt from './components/Zt';
import MyCompass from './components/Compass';
import Wayfinding from './components/Wayfinding';
import Magnetometer from './components/Magnetometer';
import Ar from './components/Ar';
import UserSelect from './components/UserSelect';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import Settings from './components/Settings';
import LanguageSelect from './components/LanguageSelect';
import Kiosk1 from './components/kiosk/Kiosk1';
import Kiosk2 from './components/kiosk/Kiosk2';
import Kiosk3 from './components/kiosk/Kiosk3';
import Kiosk4 from './components/kiosk/Kiosk4';
import Kiosk5 from './components/kiosk/Kiosk5';
import Kiosk6 from './components/kiosk/Kiosk6';
import Kiosk7 from './components/kiosk/Kiosk7';
import Kiosk8 from './components/kiosk/Kiosk8';
import KioskLanding from './components/kiosk/KioskLanding';
// import FabricCanvas from './components/FabricCanvas';


const BaseRouter = ()=>{
    return(
    <div>   
            <Route exact path="/qrscan" component={QRScanner}/>
            <Route exact path="/user" component={UserInfo}/>
            <Route exact path="/navigate" component={Navigation} />
            <Route exact path='/cmb/select' component={Select} />
            <Route exact path="/kiosk" component={Kiosk1} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/how-to-use" component={HTU} />
            <Route exact path="/support" component={Support} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/appointments" component={Appointment} />
            <Route exact path="/reports" component={Reports} />
            <Route exact path="/upload" component={Upload} />
            {/* <Route exact path="/test" component={Test} /> */}
            {/* <Route exact path="/st" component={SpeedTest} /> */}
            {/* <Route exact path="/gl" component={Geolocation} /> */}
            {/* <Route exact path="/at" component={AnimationTest} /> */}
            {/* <Route exact path="/innav" component={ZoomTest} /> */}
            {/* <Route exact path="/zt" component={Zt} /> */}
            {/* <Route exact path="/compass" component={MyCompass} /> */}
            <Route exact path="/cmb/wayfinding" component={Wayfinding} />
            {/* <Route exact path="/mgmeter" component={Magnetometer} /> */}
            <Route exact path="/building-select" component={UserSelect} />
            <Route exact path="/ar" component={Ar} />
            <Route exact path="/cmb/user-login" component={UserLogin} />
            <Route exact path="/cmb/user-register" component={UserRegister} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/" component={LanguageSelect} />
            <Route exact path="/kiosk-landing" component={KioskLanding} />
            <Route exact path="/kiosk1" component={Kiosk1} />
            <Route exact path="/kiosk2" component={Kiosk2} />
            <Route exact path="/kiosk3" component={Kiosk3} />
            <Route exact path="/kiosk4" component={Kiosk4} />
            <Route exact path="/kiosk5" component={Kiosk5} />
            <Route exact path="/kiosk6" component={Kiosk6} />
            <Route exact path="/kiosk7" component={Kiosk7} />
            <Route exact path="/kiosk8" component={Kiosk8} />

    </div>)
}

export default BaseRouter