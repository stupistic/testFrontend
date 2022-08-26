import Navbar from "../Navbar";
import { Container } from "@mui/system";
import { Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import url from "../../config"
import Spinner from "../loading/Spinner";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { login, increment } from "../../actions";
import tokenHandler from "../../tokenHandler";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "../auth/Auth";


const typographyStyle = {margin: "5px auto"}
const image = require("../images/part.png");

const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins',
      ].join(','),
    },
});

const ProductPage = () => {
    const routeParams = useParams();
    const [productData, setProductData] = useState({});
    const [fitmentData, setFitmentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [quantity, setQuantity] = useState(0);
    const [inCart, setInCart] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const authMethod = useSelector(state => state.authMethod);
    const [opacity, setOpacity] = useState(0);
    const [visibility, setVisibility] = useState("hidden");

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const btnClicked = async () => {
        try{
            const response = await axios.post(`${url}/category/addToCart`, {
                "sku": routeParams.sku,
                "quantity": 1,
            }, {headers: {
                "access-token": tokenHandler.getAccessToken()
            }})
            console.log(response);
            dispatch(increment());
            setInCart(true);
            setVisibility("visible");
            setOpacity(1);
            await sleep(2000);
            setOpacity(0);
            await sleep(1000);
            setVisibility("hidden");
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
                    btnClicked()
                }catch(error){
                    console.log(error);
                    dispatch(login());
                }
            }
        }
    }


    useEffect(() => {
        const check = async () => {
            try{
                const response = await axios.post(`${url}/category/alreadyInCart`, {
                    "sku": routeParams.sku
                }, {
                    "headers": {
                        "access-token": tokenHandler.getAccessToken()
                    }
                })
                setInCart(response.data.data);
            }catch(error){
                if(error.response.status === 401){
                    try{
                        await tokenHandler.refreshAccessToken()
                        check();
                    }catch(error){}
                }
            }
        }

        if(loggedIn)
            check();
        else
            setInCart(false);
    }, [loggedIn])


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try{
                const response = await axios.post(`${url}/category/fetchProductDetails`, {
                    "sku": routeParams.sku,
                });
                setIsLoading(false);
                setProductData(response.data.productData);
                setFitmentData(response.data.fitmentData);
            }catch(error){
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, [routeParams])

    return (<ThemeProvider theme={theme}>
        <div
        style={ authMethod !== "none" ? {position:"absolute", "top": "0", "height": "100vh", width: "100vw", "overflowY": "clip"} : {} }
        >
            <Navbar />
            <Auth />
        { 
            isLoading ? 
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}
            >
            <Spinner /> 
            </div>
            :
            <Container sx={{margin: "100px auto", marginBottom: "20px"}}>
                <Grid container>
                    <Grid item md={6} xs={12}>
                        {/* <img src={image}/> */}
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Typography variant="h4" style={typographyStyle}>
                            {productData.title}
                        </Typography>

                        <Typography style={typographyStyle}>
                            SKU: {productData.sku_code}
                        </Typography>

                        <div style={{display:"flex", justifyContent: "space-between", width:"70%"}}>
                            <div>
                                <Typography style={typographyStyle}>
                                    <strong>Origin</strong>
                                </Typography>

                                <Typography style={typographyStyle}>
                                    {productData.brand_type}
                                </Typography>
                            </div>

                            <div>
                                <Typography style={typographyStyle}>
                                    <strong>Category</strong>
                                </Typography>

                                <Typography style={typographyStyle}>
                                    {productData.category}
                                </Typography>
                            </div>
                        </div>

                        <Typography variant="h6" style={typographyStyle}>
                            <strong>Product Details</strong>
                        </Typography>
                        <Typography style={typographyStyle}>
                            {productData.description} 
                        </Typography>


                        <div>
                            {
                                !inCart ?
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#103F6D",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            display: "block",
                                            margin: "20px 0",
                                            "&:hover":{
                                                backgroundColor: "#103F6D"
                                            }
                                        }}

                                        onClick={() => {
                                            btnClicked();
                                        }}
                                    >
                                        Add to cart
                                    </Button>
                                :
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#103F6D",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        display: "block",
                                        margin: "20px 0",
                                        "&:hover":{
                                            backgroundColor: "#103F6D"
                                        }
                                    }}

                                    onClick={() => {
                                        navigate("/cart")
                                    }}
                                >
                                    Go to cart
                                </Button>
                            }
                        </div>
                    </Grid>
                </Grid>



            
                <Typography
                variant="h6"
                sx={{
                    margin: "20px 0"
                }}
                >
                    <strong>Fitments</strong>
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Year</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Model</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Make</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Variant</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Edition</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            fitmentData.map((data, index) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell>
                                            {data.year}
                                        </TableCell>

                                        <TableCell>
                                            {data.model}
                                        </TableCell>

                                        <TableCell>
                                            {data.make}
                                        </TableCell>

                                        <TableCell>
                                            {data.variant}
                                        </TableCell>

                                        <TableCell>
                                            {data.engine}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

                <div
                    style={{
                        padding: "20px",
                        position: "absolute",
                        zIndex: 100,
                        visibility: "visible",
                        "opacity": opacity,
                        "visibility": visibility,
                        transition: "opacity 1s",
                        top: "85vh",
                        right: "5vw",
                        backgroundColor: "#bffabc"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "16px"
                        }}
                    >
                        Item added successfully
                    </Typography>
                </div>
            </Container>
        }
        </div>
    </ThemeProvider>);
}

export default ProductPage;
