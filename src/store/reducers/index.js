import {combineReducers} from 'redux';
import decrypt from './users/decrypt';
import buildingList from './users/buildingList';
import floorList from './users/floorList';
import getAllElements from './users/getAllElements';
import imgDetails from './users/imgDetails';
import imgList from './users/imgList';
import allPolygons from './users/allPolygons';
import bDetails from './users/bDetails';
import appLogin from './users/appLogin';
import appRegister from './users/appRegister';

export default combineReducers({
    decrypt: decrypt,
    buildingList: buildingList,
    floorList: floorList,
    getAllElem : getAllElements,
    imgDetails: imgDetails,
    imgList: imgList,
    allPolygons:allPolygons,
    bDetails:bDetails,
    appLogin:appLogin,
    appRegister:appRegister,
});