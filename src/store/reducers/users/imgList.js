export default (state=[],action)=>{
    switch(action.type){
        case 'IMG_LIST':
            return action.payload
        default: 
            return state;
    }
}
