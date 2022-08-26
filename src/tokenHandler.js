import axios from 'axios';
import url from "./config";


const getAccessToken = () => {
    return localStorage.getItem("access-token");
}

const setAccessToken = (token) => {
    localStorage.setItem("access-token", token);
}

const getRefreshToken = () => {
    return localStorage.getItem("refresh-token");
}

const setRefreshToken = (token) => {
    localStorage.setItem("refresh-token", token);
}

const refreshAccessToken = async () => {
    console.log("Refreshing Access Token")
    try{
        const response = await axios.get(`${url}/auth/getAccessToken`, {
            headers: {
                "refresh-token": getRefreshToken()
            }
        });

        const newAccessToken = response.data.data.accessToken
        setAccessToken(newAccessToken)
    }catch(error){
        console.log(error);
        throw error;
    }
}


const clearLocalStorage = () => {
    localStorage.clear()
}

const object = {
    "getAccessToken": getAccessToken,
    "setAccessToken": setAccessToken,
    "getRefreshToken": getRefreshToken,
    "setRefreshToken": setRefreshToken,
    "refreshAccessToken": refreshAccessToken,
    "clearLocalStorage": clearLocalStorage
};

export default object;
