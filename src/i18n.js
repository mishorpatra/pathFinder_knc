import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
const resources = {
    en: {
      translation: {
            "Welcome to Dr R P Centre Indoor Navigation Assistance": "Welcome to Dr R P Centre Indoor Navigation Assistance",
            "Ward Block":"Ward Block",
            "OPD Block":"OPD Block",
            "Contact Us":"Contact Us",
            "Feedback":"Feedback",
            "Or use icons on the left to navigate":"Or use icons on the left to navigate",
            "Click":"Click",
            "to scan any tag":"to scan any tag",
            "Welcome to OPD Block":"Welcome to OPD Block",
            "Welcome to Ward Block":"Welcome to Ward Block",
            "Next Floor":"Next Floor",
            "Previous Floor":"Previous Floor",
            "Login":"Login",
            "Proceed as a guest":"Proceed as a guest",
            "Signup":"Signup",
            "or":"or",
            "Visitor Login":"Visitor Login",
            "Proceed":"Proceed",
            "Sign Up":"Sign Up",
            "You are at":"You are at {{location}}",
            "Move":"Move {{steps}} steps forward",

            "Go Straight":"Go Straight",
            "Right":"Right",
            "Left":"Left",
            "Turn Right":"Turn Right",
            "Turn Left":"Turn Left",
            "You are about to reach":"You are about to reach {{location}} on your {{direction}}",
            "You have reached":"You have reached {{location}}",
            "O' Clock":"Turn {{angle}} O' Clock"

      }
    },
    hi: {
        translation: {
          "Welcome to Dr R P Centre Indoor Navigation Assistance": "डॉ आर पी सेंटर इनडोर नेविगेशन सहायता में आपका स्वागत है",
            "Ward Block":"वार्ड ब्लॉक",
            "OPD Block":"ओ पी डी ब्लॉक ",
            "Contact Us":"संपर्क करें",
            "Feedback":"प्रतिपुष्टि",
            "Or use icons on the left to navigate":"या नेविगेट करने के लिए बाईं ओर आइकन का उपयोग करें",
            "Use icons on the left to navigate":"नेविगेट करने के लिए बाईं ओर आइकन का उपयोग करें",
            "Click":"क्लिक करें",
            "to scan":"टैग स्कैन करने के लिए",
            "Welcome to OPD Block":"ओपीडी ब्लॉक में आपका स्वागत है",
            "Welcome to Ward Block":"वार्ड ब्लॉक में आपका स्वागत है",
            "Next Floor":"अगली मंजिल",
            "Previous Floor":"पिछली मंजिल",
            "Login":"लॉग इन करें",
            "Proceed as a guest":"अतिथि के रूप में आगे बढ़ें",
            "Signup":"रजिस्टर करें",
            "or":"अथवा",
            "Visitor Login":"आगंतुक लॉगिन",
            "Proceed":"जारी रखें",
            "Sign Up":"साइन अप करें",
            "Previous":"पूर्व",
            "Enter Username":"उपयोगकर्ता नाम दर्ज करें",
            "Enter Email":"ईमेल दर्ज करें",
            "Enter Password":"पासवर्ड दर्ज करें",
            "Enter Age":"आयु दर्ज करें",
            "Please input your height":"कृपया अपनी लंबाई दर्ज करें",
            "Enter Feet":"फीट दर्ज करें",
            "Enter Inches":"इंच दर्ज करें",
            "I am Blind or Visually Impaired":"मैं अंधा या दृष्टिबाधित हूं",
            "Go Back":"पीछे जाए",
            "Logout":"लॉग आउट करें",
            "Your Height":"आपकी लम्बाई",
            "Save":"सेव करें",
            "You are at":"आप {{location}} में हैं",
            "Go Straight":"सीधे जाइए",
            "Right":"दायें",
            "Left":"बाएं",
            "Turn Right":"दायें मुड़ो",
            "Turn Left":"बाएं मुड़ें",
            "Move":"{{steps}} कदम आगे बढ़ें",
            "You are about to reach":"आप अपने {{direction}} ओर {{location}} पर पहुंचने वाले हैं",
            "You have reached":"आप {{location}} पर पहुंच गए हैं",
            "O' Clock":"{{angle}} बजे तक मुड़ें",
            "Change Language":"भाषा बदलें",
            "Next":"आगे",
            "Previous":"पूर्व",
            "Source":"स्रोत का चयन करें",
            "Destintation":"गंतव्य का चयन करें"
        }
      }
  };

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    whitelist: ['en', 'hi'],
    resources,
    // resources: {
    //     "backend": {
    //       "loadPath": "/translations/{{lng}}/{{ns}}.json"
    //     }
    //   },
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;