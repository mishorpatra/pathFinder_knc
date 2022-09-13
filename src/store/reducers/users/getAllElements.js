export default (state=[],action)=>{
    switch(action.type){
        case 'ALL_ELEMENTS':
            return action.payload
        default: 
            return state;
    }
}
