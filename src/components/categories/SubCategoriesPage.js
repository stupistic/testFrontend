import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../loading/Spinner";
import Navbar from "../Navbar";
import { Typography, Grid, Box } from "@mui/material";
import CategoryCard from "./CategoryCard";
import url from "../../config";
import Auth from "../auth/Auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import FindByVehicle from "./FindByVehicle";
import { useSelector } from "react-redux";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
},});


const laptopStyle = {
    backgroundColor: "#EEEEEE",
    minHeight:"100vh",
    width:"100%",  
    margin: 0,
    padding: 0,
    paddingTop: "100px",
    paddingBottom: "20px",
    boxSizing: "border-box",
    
    display: {
        md: "flex",
        xs: "none"
    }
}

const mobileStyle = {
    backgroundColor: "#EEEEEE",
    minHeight:"100vh",
    width:"100%",  
    margin: 0,
    padding: 0,
    paddingTop: "100px",
    paddingBottom: "20px",
    boxSizing: "border-box",

    display: {
        md: "none",
        xs: "flex"
    },
}


const SubCategoriesPage = () => {

    const navigate = useNavigate();
    const [ subCategoriesList, setSubCategoriesList ] = useState([]);
    const [ subCategory, setSubCategory ] = useState("");
    const routeParams = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const authMethod = useSelector( state => state.authMethod );

    const gotoProductListingPage = () => {
        console.log("subCategory selected:- " + subCategory);
        navigate(`/productListing/${routeParams.make}/${routeParams.model}/${routeParams.year}/${routeParams.category}/${subCategory}`)
    }

    useEffect(() => {
        if(subCategory !== ""){
            gotoProductListingPage();
        }
    }, [subCategory]);

    useEffect(() => {
        const fetchSubCategories = async () => {
            setIsLoading(true)
            try{
                const response = await axios.post(`${url}/category/fetchSubCategories`, {
                    "make": routeParams.make,
                    "model": routeParams.model,
                    "year": parseInt(routeParams.year),
                    "category": routeParams.category
                });
                setIsLoading(false)
                
                const newSubCategoriesList = [];
                response.data.data.forEach((value) => {
                    newSubCategoriesList.push({
                        "name": value
                    })
                })
                setSubCategoriesList(newSubCategoriesList);
            }catch(error){
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchSubCategories();
    }, [routeParams])

    return (
    <ThemeProvider theme={theme}>
        <div
            style={ authMethod !== "none" ? {"height": "100vh", "overflowY": "clip"} : {} }
        >
            <Navbar />
            <Auth />

            <Box sx={laptopStyle}>

                <FindByVehicle 
                    makeDefaultValue={routeParams.make} 
                    modelDefaultValue={routeParams.model} 
                    yearDefaultValue={routeParams.year} 
                />

                <div
                    style={{
                        width: "6px",
                        backgroundColor: "#103F6D",
                        margin: "0"
                    }}
                >
                </div>

                
                <div
                    style={{
                        margin: "0 10px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "38px",
                            fontWeight: "700",
                            color: "#103F6D",
                        }}
                    >
                        {routeParams.category}
                    </Typography>

                    { 
                        isLoading 
                        ?
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%"
                            }}
                        >
                        <Spinner /> 
                        </div>
                        :
                        <Grid container>
                            {
                                subCategoriesList.map((value, index) => {
                                    return(
                                        <Grid item key={index} xs={6} md={12/3} lg={12/4}>
                                            <CategoryCard details={value} setSelected={setSubCategory} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    }
                </div>

            </Box>



            <Box sx={mobileStyle}>
                <div
                    style={{
                        margin: "0 auto",
                        width: "100%",
                        maxWidth: "600px",
                        padding: "0 20px"
                    }}
                >
                    <Typography
                        align="center"
                        sx={{
                            fontSize: "32px",
                            fontWeight: "700",
                            color: "#103F6D",
                        }}
                    >
                        {routeParams.category}
                    </Typography>

                    { 
                        isLoading 
                        ?
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%"
                            }}
                        >
                        <Spinner /> 
                        </div>
                        :
                        <Grid container>
                            {
                                subCategoriesList.map((value, index) => {
                                    return(
                                        <Grid item key={index} xs={6} md={12/3} lg={12/4}>
                                            <CategoryCard details={value} setSelected={setSubCategory} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    }
                </div>
            </Box>
        </div>
    </ThemeProvider>)
}

export default SubCategoriesPage;
