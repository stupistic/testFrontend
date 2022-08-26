import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navba";
import { Typography, Grid, Box } from "@mui/material";
import ProductCard from "./ProductCard";
import url from "../../config";
import Auth from "../auth/Auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import FindByVehicle from "./FindByVehicle";
import Spinner from "../loading/Spinner";
import { useSelector } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

const laptopStyle = {
  backgroundColor: "#EEEEEE",
  minHeight: "100vh",
  width: "100%",
  margin: 0,
  padding: 0,
  paddingTop: "100px",
  paddingBottom: "20px",
  boxSizing: "border-box",

  display: {
    md: "flex",
    xs: "none",
  },
};

const mobileStyle = {
  backgroundColor: "#EEEEEE",
  minHeight: "100vh",
  width: "100%",
  margin: 0,
  padding: 0,
  paddingTop: "100px",
  paddingBottom: "20px",
  boxSizing: "border-box",

  display: {
    md: "none",
    xs: "flex",
  },
};

const ProductListingPage = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authMethod = useSelector((state) => state.authMethod);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${url}/category/fetchProducts`, {
          make: routeParams.make,
          model: routeParams.model,
          year: parseInt(routeParams.year),
          category: routeParams.category,
          subCategory: routeParams.subCategory,
        });
        setIsLoading(false);

        const newProductList = [];
        response.data.data.forEach((value) => {
          const temp = {
            name: value.title,
            object_id: value._id,
            sku_code: value.sku_code,
          };

          newProductList.push(temp);
        });
        setProductsList(newProductList);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response.data);
      }
    };

    fetchProducts();
  }, [routeParams]);

  useEffect(() => {
    if (product) {
      navigate(`/product/${product.sku_code}`);
    }
  }, [product]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={
          authMethod !== "none" ? { height: "100vh", overflowY: "clip" } : {}
        }
      >
        <Navbar />
        <Auth />

        <Box sx={laptopStyle}>
          <FindByVehicle
            makeDefaultValue={routeParams?.make}
            modelDefaultValue={routeParams?.model}
            yearDefaultValue={routeParams?.year}
          />

          <div
            style={{
              width: "6px",
              backgroundColor: "#103F6D",
              margin: "0",
            }}
          ></div>

          <div
            style={{
              margin: "0 10px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "38px",
                fontWeight: "700",
                color: "#103F6D",
              }}
            >
              {routeParams.category} {">"} {routeParams.subCategory}
            </Typography>

            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Spinner />
              </div>
            ) : (
              <Grid container>
                {productsList.map((value, index) => {
                  return (
                    <Grid item key={index} xs={12} md={12 / 2} lg={12 / 3}>
                      <ProductCard details={value} setSelected={setProduct} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </div>
        </Box>

        <Box sx={mobileStyle}>
          <div
            style={{
              margin: "0 10px",
              width: "100%",
            }}
          >
            <Typography
              align="center"
              sx={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#103F6D",
              }}
            >
              {routeParams.category} {">"} {routeParams.subCategory}
            </Typography>

            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Spinner />
              </div>
            ) : (
              <Grid container>
                {productsList.map((value, index) => {
                  return (
                    <Grid item key={index} xs={12} md={12 / 2} lg={12 / 3}>
                      <ProductCard details={value} setSelected={setProduct} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default ProductListingPage;
