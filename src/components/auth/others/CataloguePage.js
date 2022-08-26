import { Grid, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import fileDownload from "js-file-download";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import url from "../config"
import tokenHandler from "../tokenHandler";

const items = [
    {name: "Bosch",  fileName:"Bosch.xlsx"},
    {name: "Chevrolet",  fileName:"Chevrolet.xls"},
    {name: "GoMechanic Products",  fileName:"GoMechanic Products.xlsx"},
    {name: "Honda",  fileName:"Honda.xlsx"},
    {name: "LUK Schaffeler FAG",  fileName:"LUK Schaffeler FAG.xlsx"},
    {name: "Mann Filters",  fileName:"Mann Filters.xlsx"},
    {name: "Monroe Shocks Struts", fileName:"Monroe Shocks Struts.xlsx"},
    {name: "Nissan", fileName:"Nissan.xlsx"},
    {name: "Osram Bulbs", fileName:"Osram Bulbs.xlsx"},
    {name: "Renault", fileName:"Renault.xlsx"},
    {name: "Suzuki", fileName:"Suzuki.xlsx"},
    {name: "Toyota", fileName:"Toyota.xlsx"},
    {name: "Volkswagen", fileName:"Volkswagen.xlsx"},
    {name: "Bajaj 3W Parts", fileName:"Bajaj 3W Parts.xlsx"},
    {name: "Purolator Products", fileName: "Purolator Products.xls"},
    {name: "Champion Spark Plugs", fileName:"Champion Spark Plugs.xlsx"},
    {name: "Contitech", fileName: "Contitech.xlsx"},
    {name: "LUMAX", fileName:"LUMAX.xlsx"},
    {name:"SKF Bearings", fileName: "SKF Bearings.xlsx"},
    {name: "VALEO (Clutch, wipers, CRB)", fileName:"VALEO (Clutch, wipers, CRB).xlsx"},
    {name: "Hyundai", fileName: "Hyundai.xlsx"}
]

const btnClicked = async (fileName) => {
    try{
        const response = await axios.get(`${url}/catalogue/download?brand=${fileName}`, {
            responseType: "blob",
            headers: {
                "access-token": tokenHandler.getAccessToken()
            }
        })
        console.log(response);
        const blobFile = response.data
        fileDownload(blobFile, `${fileName}`);
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
                btnClicked(fileName)
            }catch(error){
                console.log(error);
            }
        }
    }
}

const CataloguePage = () => {

    const navigate = useNavigate();
    let { state } = useLocation();

    useEffect(() => {
        console.log(state, "catalog useffect")
        if(!tokenHandler.getRefreshToken()){
            navigate("/", {state:{"from": "/catalogue"}})
        }
    }, [])

    return (
        <>
        {
            tokenHandler.getRefreshToken()
            ?
            (<>
                <Navbar />
                <Container sx={{padding: "12vh 0"}}>
                    <Typography
                        variant="h4"
                        align="center"
                    >
                        Catalogue Page
                    </Typography>
        
                    <Grid container spacing={3} sx={{marginTop: "20px"}}>
                        {
                            items.map((value, index) => {
                                return (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Button variant="contained" color="primary" sx={{width:"70%", display:"block", margin:"0 auto", fontSize:"25px"}} 
                                            onClick={() => {btnClicked(value.fileName)}}
                                        >
                                            {value.name}
                                        </Button>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </>) 
            :
            <></>
        }
        </>
    )
}

export default CataloguePage;
