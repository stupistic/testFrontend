import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import axios from 'axios';
import tokenHandler from "../../tokenHandler";
import url from "../../config";
import Auth from "../auth/Auth";
import { useSelector } from "react-redux";
import Spinner from "../loading/Spinner";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { decrement } from '../../actions';
import { useDispatch } from 'react-redux';


const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins',
      ].join(','),
    },
});

const CartPage = () => {
    const [products, setProducts] = useState([]);
    const loggedIn = useSelector(state => state.loggedIn);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const [quoteDisable, setQuoteDisable] = useState(false);
    const dispatch = useDispatch();


    const quoteBtnClicked = async () => {
        setQuoteDisable(true);
        updateBtnClicked();
        const payload = products.map(value => {
            const temp = {}
            temp["sku"] = value.sku_code;
            temp["title"] = value.title;
            temp["quantity"] = value.quantity;
            return temp; 
        })

        try{
            const response = await axios.post(`${url}/category/requestForQuote`, {
                "payload": payload
            }, {headers: {
                "access-token": tokenHandler.getAccessToken()
            }})
            console.log(response);
        }catch(error){
            const statusCode = error.response.status;
            if(statusCode === 401){
                try{
                    await tokenHandler.refreshAccessToken();
                    quoteBtnClicked();
                }catch(error){}
            }
        }
        setQuoteDisable(false);
    }

    const updateBtnClicked = async () => {
        setIsDisable(true);
        const payload = products.map(value => {
            const temp = {}
            temp["sku"] = value.sku_code;
            temp["quantity"] = value.quantity;
            return temp; 
        })

        try{
            const response = await axios.post(`${url}/category/updateCartItems`, {
                "payload": payload
            }, {headers: {
                "access-token": tokenHandler.getAccessToken()
            }})
            console.log(response);
        }catch(error){
            const statusCode = error.response.status;
            if(statusCode === 401){
                try{
                    await tokenHandler.refreshAccessToken();
                    updateBtnClicked();
                }catch(error){
                    setIsDisable(false);
                }
            }
        }
    }

    const deleteItem = async (sku) => {
        const temp = products.filter(value => value.sku_code !== sku);
        console.log(temp)
        setProducts(temp);
        try{
            const response = await axios.post(`${url}/category/deleteFromCart`, {
                "sku": sku,
            }, {headers: {
                "access-token": tokenHandler.getAccessToken()
            }})
            console.log(response);
            dispatch(decrement());
        }catch(error){
            const statusCode = error.response.status;
            if(statusCode === 401){
                try{
                    await tokenHandler.refreshAccessToken();
                    deleteItem(sku);
                }catch(error){}
            }
        }
    }

    useEffect(() => {
        const fetchCartItems = async () => {
            setIsLoading(true);
            try{
                const response = await axios.get(`${url}/category/fetchCartItems`, {
                    headers: {
                        "access-token": tokenHandler.getAccessToken()
                    }
                });
                console.log(response);
                setProducts(response.data.data);
            }catch(error){
                const statusCode = error.response.status;
                if(statusCode === 401){
                    try{
                        await tokenHandler.refreshAccessToken();
                        fetchCartItems();
                    }catch(error){
                        setProducts([]);
                    }
                }
            }
            setIsLoading(false);
        };

        if(loggedIn)
            fetchCartItems();
        else
            setProducts([]);
    }, [loggedIn])
    

    return(
        <ThemeProvider theme={theme}>
            <Navbar />
            <Auth />

            <div
            style={{
                padding: "20px",
                paddingTop: "80px",
                width: "100%",
                maxWidth: "1200px",
                display: "block",
                margin: "0 auto",
            }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px 0",
                        margin: "10px 0",
                        alignItems: "center"
                    }}
                >
                    <Typography
                    variant="h4"
                    sx={{
                        margin: "20px 0",
                        fontWeight: 600
                    }}
                    >
                        My Cart
                    </Typography>
                    
                    {
                        loggedIn && products.length !== 0 &&
                    <Button
                        variant="contained"
                        disabled={isDisable}
                        sx={{
                            height: "50px",
                            backgroundColor: "#103F6D",
                            fontSize: "14px",
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: "#103F6D"
                            }
                        }}
                        onClick={updateBtnClicked}
                    >
                        Update Cart Details
                    </Button>
                    }
                </div>


                {
                    isLoading ?
                    <div
                            style={{
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100vh",
                                width: "100%",
                                top: 0,
                                left: 0,
                            }}
                        >
                        <Spinner /> 
                    </div>
                    :
                    <div>
                        {
                            loggedIn ?
                            <div>
                            {
                                products.length !== 0 ?
                                <div>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Description
                                                </TableCell>

                                                <TableCell>
                                                    Quantity
                                                </TableCell>

                                                <TableCell>
                                                    Remove
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                products.map((value, index) => {

                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {value.description}
                                                            </TableCell>

                                                            <TableCell>
                                                                <div 
                                                                    style={{
                                                                        display: "flex",
                                                                        border: "2px solid #103F6D",
                                                                        borderRadius: "10px",
                                                                        alignItems: "center",
                                                                        maxWidth: "120px",
                                                                        justifyContent: "space-around",
                                                                    }}
                                                                >
                                                                    <RemoveIcon 
                                                                        sx={{
                                                                            "&:hover": {"cursor": "pointer"}
                                                                        }}
                                                                        style={(value.quantity <= 1 || value.quantity === "") ? {opacity: 0.2} : {}}
                                                                        onClick={() => {
                                                                            const newProducts = products.map((item, i) => {
                                                                                if(i === index && item.quantity > 1){
                                                                                    item.quantity -= 1;
                                                                                    setIsDisable(false);
                                                                                }
                                                                                return item;
                                                                            })

                                                                            setProducts(newProducts);
                                                                        }}
                                                                    />

                                                                    <input 
                                                                        type="text"
                                                                        style={{
                                                                            display: "block",
                                                                            minWidth:0,
                                                                            border: 0,
                                                                            outline: 0,
                                                                            width: "40px",
                                                                            fontSize: "16px",
                                                                            textAlign: "center"
                                                                        }}
                                                                        value={value.quantity}
                                                                        onChange={(e) => {
                                                                            const regex = /\d/;
                                                                            let newValue = e.target.value.trim();
                                                                            if(regex.test(newValue) || newValue === ""){
                                                                                const newProducts = products.map((item, i) => {
                                                                                    if(i === index)
                                                                                        item.quantity = newValue;
                                                                                    setIsDisable(false);
                                                                                    return item;
                                                                                })

                                                                                setProducts(newProducts);
                                                                            }
                                                                        }}
                                                                        onBlur={() => {
                                                                            let newValue = products[index].quantity;
                                                                            if(newValue === "")
                                                                                newValue = 1;
                                                                            else
                                                                                newValue = parseInt(newValue);
                                                                            const newProducts = products.map((item, i) => {
                                                                                if(i === index)
                                                                                    item.quantity = newValue;
                                                                                setIsDisable(false);
                                                                                return item;
                                                                            })

                                                                            setProducts(newProducts);
                                                                        }}
                                                                    />

                                                                    {/* <Typography
                                                                        align="center"
                                                                        sx={{
                                                                            width: "40px",
                                                                            fontSize: "16px"
                                                                        }}
                                                                    >
                                                                        {value.quantity}
                                                                    </Typography> */}
                                                                    <AddIcon 
                                                                        sx={{"&:hover": {"cursor": "pointer"}}}
                                                                        onClick={() => {
                                                                            const newProducts = products.map((item, i) => {
                                                                                if(i === index)
                                                                                    item.quantity += 1;
                                                                                setIsDisable(false);
                                                                                return item;
                                                                            })

                                                                            setProducts(newProducts);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </TableCell>

                                                            <TableCell>
                                                                <DeleteIcon 
                                                                    sx={{"&:hover": {"cursor": "pointer"}}}
                                                                    onClick={() => deleteItem(value.sku_code)}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>

                                    <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row-reverse"
                                    }}
                                    >
                                        <Button
                                            disabled={quoteDisable || products.length == 0}
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#103F6D",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                margin: "30px 0",

                                                "&:hover":{
                                                    backgroundColor: "#103F6D"
                                                }
                                            }}

                                            onClick={quoteBtnClicked}
                                        >
                                            Request for quote
                                        </Button>
                                    </div>
                                </div>
                                :                            
                                <div>
                                    <Typography
                                        sx={{
                                            fontSize: "16px"
                                        }}
                                    >
                                        Cart is empty
                                    </Typography>
                                </div>
                            }
                            </div>
                            :
                            <div>
                                <Typography>
                                    Login to see the items you added previously
                                </Typography>
                            </div>
                        }
                    </div>

                }
            </div>
        </ThemeProvider>
    )
}

export default CartPage; 
