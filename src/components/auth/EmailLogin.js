import { Button, Paper, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import url from "../../config";
import axios from "axios";
import SpinnerSmall from "../loading/SpinnerSmall";
import { noAuth } from "../../actions";
import { useDispatch } from "react-redux";

const innerPaperStyle = {
    width: "100%",
    maxWidth: "400px",
    height: "240px",
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

const EmailLogin = ({ setFlag }) => {
    
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const closeButtonClicked = () => {
        setFlag("none"); 
        dispatch(noAuth());
    }

    const buttonClicked = async () => {
        setIsLoading(true);
        setMessage("");
        try{
            const response = await axios.post(`${url}/auth/emailLogin`, {"email": email});
            console.log(response.data);
            setFlag("otp");
        }catch(error){
            console.log(error.response.data);
            setMessage(error.response.data.msg)
        }
        setIsLoading(false);
    } 


    return(<>                
        <Paper id="innerPaper" sx={innerPaperStyle}>
            <div style={{display: "flex", justifyContent: "space-between", padding: "10px"}}>
                <ArrowBackIcon 
                    sx={iconStyle}
                    onClick={() => setFlag("none")}
                />
                
                <Typography variant="h5">Login</Typography>

                <CloseIcon 
                    sx={iconStyle}
                    onClick={closeButtonClicked}
                />
            </div>

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

            <Typography align="center" color="red" sx={{marginTop: "20px"}}>
                {message}
            </Typography>

            <input
                type="text"
                style={{
                  fontSize:"22px", boxSizing:"border-box", 
                  padding:"5px", color: "#000000",
                  marginTop: "30px", maxWidth: "10000px",
                  outline: "none",
                  width: "100%"
                }}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <Button
                variant="contained"
                sx={buttonStyle}
                onClick={buttonClicked}
            >
                Send OTP
            </Button>

        </Paper>
    </>)
}

export default EmailLogin;
