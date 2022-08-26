import { Button, Paper, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import SendSignupOTP from "./SendSignupOTP";
import GoogleAuth from "./GoogleAuth";
import SpinnerSmall from "../loading/SpinnerSmall";
import url from "../../config";
import axios from "axios";
import { noAuth, login } from "../../actions";
import { useDispatch } from "react-redux";

const outerPaperStyle = {
    backgroundColor: "rgb(28, 28, 28, 0.85)",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
    position: "absolute",
}
    
const innerPaperStyle = {
    width: "100%",
    maxWidth: "400px",
    height: "380px",
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


const SignupOptions = () => {

    const [flag, setFlag] = useState("none")
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const closeButtonClicked = () => {
        setFlag("none"); 
        dispatch(noAuth());
    }

    const buttonClicked = async () => {
        setMessage("");
        setIsLoading(true);
        try{
            const response = await axios.post(`${url}/auth/emailSignup`, {"email": email, "fullName": fullName});
            console.log(response.data);
            setFlag("otp");
        }catch(error){
            console.log(error.response.data);
            setMessage(error.response.data.msg);
        }
        setIsLoading(false);
    } 


    if(flag === "none"){
        return(<>
            <Paper id="outerPaper" sx={outerPaperStyle}>

                <Paper id="innerPaper" sx={innerPaperStyle}>

                    <div style={{display: "flex", justifyContent: "space-between"}}>                        
                        <Typography variant="h5">Sign up</Typography>

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

                    { message !== "" &&
                    <Typography align="center" color="red" sx={{marginTop: "20px"}}>
                        {message}
                    </Typography>
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
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                    />

                    <input
                        type="text"
                        style={{
                        fontSize:"22px", boxSizing:"border-box", 
                        padding:"5px", color: "#000000",
                        marginTop: "20px", maxWidth: "10000px",
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
                        Create account
                    </Button>
                    
                    <GoogleAuth setIsLoading={setIsLoading} setFlag={setFlag} />

                    <Typography>
                        Already have an account? <span style={{color: "blue", cursor: "pointer"}} onClick={() => dispatch(login())}>Login</span>
                    </Typography>

                </Paper>

            </Paper>
        </>)
    }

    if(flag === "otp"){
        return(<>
            <Paper id="outerPaper" sx={outerPaperStyle}>
                <SendSignupOTP setFlag={setFlag} />
            </Paper>
        </>)
    }
}

export default SignupOptions;
