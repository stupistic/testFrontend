const authVisibility = (state = "hidden", action) => {
    switch(action.type){
        case "VISIBLE":
            return "visible";
        case "HIDDEN":
            return "hidden";
        default:
            return state;
    }
}

export default authVisibility;
