export default (state=[],action)=>{
    switch(action.type){
        case 'DECRYPT':
            // console.log("zdkm",[...state,action.payload])
            return action.payload
            // break;
        default: 
            return state;
    }
}