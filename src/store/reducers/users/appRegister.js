export default (state=[],action)=>{
    switch(action.type){
        case 'APP_REGISTER':
            return action.payload
        default: 
            return state;
    }
}