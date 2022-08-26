import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { Typography, Grid, Box } from "@mui/material";
import CategoryCard from "./CategoryCard";
import url from "../../config";
import Auth from "../auth/Auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import FindByVehicle from "./FindByVehicle";
import Spinner from "../loading/Spinner";
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

const CategoriesPage = () => {
    const navigate = useNavigate();
    const [ categoriesList, setCategoriesList ] = useState([]);
    const [ category, setCategory ] = useState("");
    const routeParams = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const authMethod = useSelector(state => state.authMethod);

    const gotoSubCategoriesPage = () => {
        console.log("Category selected:- " + category);
        navigate(`/subcategories/${routeParams.make}/${routeParams.model}/${routeParams.year}/${category}`)
    }

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true)
            try{
                const response = await axios.post(`${url}/category/fetchCategories`, {
                    "make": routeParams.make,
                    "model": routeParams.model,
                    "year": parseInt(routeParams.year)
                });
                setIsLoading(false);
                const newCategoriesList = [];
                response.data.data.forEach((value) => {
                    newCategoriesList.push({
                        "name": value
                    })
                })
                setCategoriesList(newCategoriesList);
            }catch(error){
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchCategories();
    }, [routeParams])
    

    useEffect(() => {
        if(category !== ""){
            gotoSubCategoriesPage();
        }
    }, [category]);

    return (<ThemeProvider theme={theme}>
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
                        Categories
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
                            categoriesList.map((value, index) => {
                                return(
                                    <Grid item key={index} xs={6} md={12/3} lg={12/4}>
                                        <CategoryCard details={value} setSelected={setCategory} />
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
                        Categories
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
                                categoriesList.map((value, index) => {
                                    return(
                                        <Grid item key={index} xs={6} md={12/3} lg={12/4}>
                                            <CategoryCard details={value} setSelected={setCategory} />
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

export default CategoriesPage;
