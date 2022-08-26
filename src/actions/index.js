export const visibile = () => {
    return {
        type: "VISIBLE"
    }
}

export const hidden = () => {
    return {
        type: "HIDDEN"
    }
}


export const login = () => {
    return {
        type: "LOGIN"
    }
}

export const signup = () => {
    return {
        type: "SIGNUP"
    }
}

export const noAuth = () => {
    return {
        type: "NONE"
    }
}


export const loggedIn = () => {
    return {
        type: "LOGGEDIN"
    }
}

export const loggedOut = () => {
    return {
        type: "LOGGEDOUT"
    }
}

export const increment = () => {
    return {
        type: "INCREMENT"
    }
}

export const decrement = () => {
    return {
        type: "DECREMENT"
    }
}

export const setValue = (value) => {
    return {
        type: "SETVALUE",
        "value": value
    }
}
