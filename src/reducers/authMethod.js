const authMethod = (state = "none", action) => {
    switch(action.type){
        case "LOGIN":
            return "login";
        case "SIGNUP":
            return "signup";
        case "NONE":
            return "none";
        default:
            return state
    }
}

export default authMethod;
