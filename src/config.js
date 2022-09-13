let config = {};

let url ="https://inclunav.apps.iitd.ac.in"; 
// let url ="http://localhost:5000"; 

if(process.env.NODE_ENV === "development"){
    config.decrypt = url + "/node/wayfinding/decrypt/"
    config.buildingList = url + "/node/wayfinding/bList/"
    config.floorList = url + "/node/wayfinding/fList/"
    config.imgUrl = url + "/static/"
    config.imgDetails = url + "/node/wayfinding/mapsdata/"
    config.getAllElem = url + "/node/wayfinding/getAllNodes"
    config.bDetails = url + "/node/wayfinding/bDetails"
    config.appRegister = url + "/node/wayfinding/app-register"
    config.appLogin = url + "/node/wayfinding/app-login"
}
else
{
    config.decrypt = url + "/node/wayfinding/decrypt/"
    config.buildingList = url + "/node/wayfinding/bList/"
    config.floorList = url + "/node/wayfinding/fList/"
    config.imgUrl = url + "/static/"
    config.imgDetails = url + "/node/wayfinding/mapsdata/"
    config.getAllElem = url + "/node/wayfinding/getAllNodes"
    config.bDetails = url + "/node/wayfinding/bDetails"
    config.appRegister = url + "/node/wayfinding/app-register"
    config.appLogin = url + "/node/wayfinding/app-login"
}

export default config;
