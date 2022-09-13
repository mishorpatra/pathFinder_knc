export default (state=[],action)=>{
    switch(action.type){
        case 'BUILDING_LIST':
            return action.payload
        default: 
            return state;
    }
}