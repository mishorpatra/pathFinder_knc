export default (state=[],action)=>{
    switch(action.type){
        case 'ALL_POLYGONS':
            return action.payload
        default: 
            return state;
    }
}