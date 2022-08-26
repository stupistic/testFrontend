import { Button, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tokenHandler from "../tokenHandler"
import url from "../config";
import axios from "axios"

const UploadPage = ({setLoginDisplay}) => {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(!tokenHandler.getRefreshToken()){
            navigate("/", {state:{"from": "/upload"}})
        }
        console.log(file)
    }, [file])

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const clearFile = () => {
        console.log("hey")
        navigate("/")
    }

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try{
            const response = await axios.post(`${url}/catalogue/upload`, formData, {
                headers: {
                    "access-token": tokenHandler.getAccessToken()
                }
            });
            console.log(response);
            setMessage("File uploaded successfully!")
            clearFile();
        }catch(error){
            const statusCode = error.response.status;
            if(statusCode === 401){
                console.log("You should try refreshing token")
    
                try{
                    const response = await axios.get(`${url}/auth/getAccessToken`, {
                    headers: {
                        "refresh-token": tokenHandler.getRefreshToken()
                    }
                    });
    
    
                    const newAccessToken = response.data.data.accessToken
                    tokenHandler.setAccessToken(newAccessToken)
                    uploadFile();
                }catch(error){
                    console.log(error);
                }
            }
        }
    }

    return (<>
        <Navbar />
        <Container sx={{marginTop: "15vh", height:"100vh"}}>
            <Typography
                variant="h4"
                align="center"
                sx={{marginBottom: "30px"}}
            >
                Upload File Page
            </Typography>

            {
                message !== ""
                ?
                (<Typography
                variant="h5"
                align="center"
                sx={{margin: "20px 0"}}
                >
                    {message}
                </Typography>)
                :
                <></>
            }

            <form>
                <Grid container>
                    <Grid item xs={12}>
                        <input id="fileInput"
                            style={{margin: "20px auto", display: "block", width:"auto", fontSize:"20px"}} 
                            type="file"
                            onChange={saveFile}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{margin: "0 auto", display:"block", width:"40%", fontSize:"20px"}}
                            onClick={uploadFile}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Container>
    </>);
}

export default UploadPage;
