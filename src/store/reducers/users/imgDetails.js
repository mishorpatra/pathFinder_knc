export default (state=[],action)=>{
    switch(action.type){
        case 'FETCH_IMAGE':
            return action.payload
        default: 
            return state;
    }
}
