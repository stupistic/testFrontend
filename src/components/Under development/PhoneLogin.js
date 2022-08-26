import { Button } from "@mui/material";
import { useState } from "react";

import axios from "axios";
import url from "../config"

import CountryCodeMenu from "./CountryCodeMenu";

const PhoneLogin = () => {
    
    const buttonStyle = {
        textTransform: "none",
        display: "block",
        width:"100%",
        margin: "20px auto",
        fontSize: "18px"
    }


    const [phoneNumber, setPhoneNumber] = useState("");


    const buttonClicked = async () => {
        try{
            const response = await axios.post(`${url}/auth/emailLogin`, {"phoneNumber": phoneNumber});
            console.log(response.data);
        }catch(error){
            console.log(error.response.data);
        }
    } 


    return(
        <>

            <div
                style={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <CountryCodeMenu />

                <input
                    type="text"
                    style={{
                    fontSize:"22px", boxSizing:"border-box", 
                    padding:"5px", color: "#000000",
                    marginTop: "30px", maxWidth: "10000px",
                    outline: "none",
                    width: "100%"
                    }}
                    placeholder="Phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
            </div>

            <Button
                variant="contained"
                sx={buttonStyle}
                onClick={buttonClicked}
            >
                Send OTP
            </Button>
        </>
    )
};

export default PhoneLogin;
