import axios from 'axios';
import config from '../../config';

export const qrdecrypt = (code,next)=> async (dispatch)=>{
    console.log("code",code)
    const response = await axios.post(config.decrypt,code);
    const data = response.data;
    dispatch({type:'DECRYPT',payload: data})
    next();
}

export const appRegister = (registerData,next)=> async (dispatch)=>{
    console.log("registerdata",registerData)
    const response = await axios.post(config.appRegister,registerData);
    const data = response.data;
    console.log("registerdata",registerData)
    dispatch({type:'APP_REGISTER',payload: data})
    next();
}

export const appLogin = (loginData,next)=> async (dispatch)=>{
    console.log("logindata",loginData)
    const response = await axios.post(config.appLogin,loginData);
    const data = response.data;
    dispatch({type:'APP_LOGIN',payload: data})
    next();
}

export const buildingList = (cb)=> async (dispatch)=>{
    const response = await axios.post(`${config.buildingList}`);
    const getDetails = response.data;
    dispatch({type:'BUILDING_LIST',payload:getDetails})
    cb();
}

export const buildingDetails = (cb)=> async (dispatch)=>{
    const response = await axios.post(`${config.bDetails}`);
    const getDetails = response.data;
    dispatch({type:'BUILDING_DETAILS',payload:getDetails})
    cb();
}

export const floorList = (name,next)=> async (dispatch)=>{
    const response = await axios.get(`${config.floorList}${name}`);
    const getDetails = response.data;
    let hashMap = [];
    if(getDetails.floor !== undefined){
        for(let i = 0;i < getDetails.floor.length;i++){
            hashMap.push({floor:getDetails.floor[i],fileName:getDetails.fileName[i],floorL:getDetails.floorL[i],floorB:getDetails.floorB[i],num_floors:getDetails.num_floors,floorAngle:getDetails.floorAngle[i]})
        }
    }
    dispatch({type:'FLOOR_LIST',payload:hashMap})
    next();
}

export const imgDetails = (buildingname,floor,file,cb)=> async  (dispatch)=>{
    var data=[];
        const response = await axios.get(`${config.imgDetails}${buildingname}/${floor}/${file}`)
        const pathResponse = response.data;
    dispatch({type:'FETCH_IMAGE',payload: pathResponse});
    cb();
}

export const getAllElements = (cb)=> async (dispatch)=>{
    let building = localStorage.getItem('buildingName');
    let floor = 'null';
    const response = await axios.get(`${config.getAllElem}/${building}/${floor}`);
    const getDetails = response.data;
    dispatch({type:'ALL_ELEMENTS',payload:getDetails})
    cb()
}

export const imgList = (data,cb)=> async (dispatch)=>{
    dispatch({type:'IMG_LIST',payload:data})
    cb()
}

export const getAllPolygons = (bName,floor,cb)=>async (dispatch)=> {
        const response = await axios.get(`${config.getAllElem}/${bName}/${floor}`);
        const getDetails = response.data;
        console.log("get details",getDetails)
        dispatch({type:'ALL_POLYGONS',payload:getDetails})
        cb()
}