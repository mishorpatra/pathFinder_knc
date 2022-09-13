export default (state=[],action)=>{
    switch(action.type){
        case 'APP_LOGIN':
            return action.payload
        default: 
            return state;
    }
}