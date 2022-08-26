const itemsCount = (state = 0, action) => {
    switch(action.type){
        case "INCREMENT":
            return state+1;
        case "DECREMENT":
            return state > 0 ? state-1 : 0;
        case "SETVALUE":
            return action.value;
        default:
            return state;
    }
}

export default itemsCount;
