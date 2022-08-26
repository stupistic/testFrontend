import { Button, Paper, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import url from "../../config";
import axios from "axios";
import tokenHandler from "../../tokenHandler";
import SpinnerSmall from "../loading/SpinnerSmall";
import { useDispatch } from "react-redux";
import { noAuth, loggedIn } from "../../actions";

const innerPaperStyle = {
    width: "100%",
    maxWidth: "400px",
    height: "230px",
    padding: "24px",
    opacity: "1",
    borderRadius: "8px"
}


const iconStyle = {
    fontSize: "25px",
    cursor: "pointer"
}


const buttonStyle = {
    textTransform: "none",
    display: "block",
    width:"100%",
    margin: "20px auto",
    fontSize: "18px"
}


const SendLoginOTP = ({ setFlag }) => {
    
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const closeButtonClicked = () => {
        setFlag("none"); 
        dispatch(noAuth());
        dispatch(loggedIn())
    }

    const buttonClicked = async () => {
        setIsLoading(true);
        setMessage("");
        try{
            const response = await axios.post(`${url}/auth/loginOTP`, {"otp": otp});
            setIsLoading(false);
            const accessToken = response.data.data.accessToken;
            const refreshToken = response.data.data.refreshToken;
            tokenHandler.setAccessToken(accessToken);
            tokenHandler.setRefreshToken(refreshToken)

            closeButtonClicked();
        }catch(error){
            setIsLoading(false);
            console.log(error.response.data);
            setMessage(error.response.data.msg);
        }
    } 


    return(<>                
        <Paper id="innerPaper" sx={innerPaperStyle}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h5">Enter OTP</Typography>

                <CloseIcon 
                    sx={iconStyle}
                    onClick={closeButtonClicked}
                />
            </div>

            <Typography align="center" color="red" sx={{marginTop: "20px"}}>
                {message}
            </Typography>

            {
                isLoading
                &&
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <SpinnerSmall />
                </div>
            }

            <input
                type="text"
                style={{
                  fontSize:"22px", boxSizing:"border-box", 
                  padding:"5px", color: "#000000",
                  marginTop: "30px", maxWidth: "10000px",
                  outline: "none",
                  width: "100%"
                }}
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
            />

            <Button
                variant="contained"
                sx={buttonStyle}
                onClick={buttonClicked}
            >
                Proceed
            </Button>

        </Paper>
    </>)
}

export default SendLoginOTP;
