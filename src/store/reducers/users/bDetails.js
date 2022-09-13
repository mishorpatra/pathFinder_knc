export default (state=[],action)=>{
    switch(action.type){
        case 'BUILDING_DETAILS':
            return action.payload
        default: 
            return state;
    }
}