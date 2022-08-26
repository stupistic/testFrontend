import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import tokenHandler from "../tokenHandler";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../config";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { login, loggedOut, setValue } from "../actions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const logo = require("./images/logo-outline2.png");
const logoMobile = require("./images/logo-outline-mobile.png");

const pages = [
  { name: "Catalogue", href: "/" },
  { name: "Contact us", href: "/" },
  { name: "Cart", href: "/cart" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [, updateState] = useState();
  // to forcefully re-render the navbar component
  const forceRerender = React.useCallback(() => updateState({}), []);
  const loggedIn = useSelector((state) => state.loggedIn);
  const itemsCount = useSelector((state) => state.itemsCount);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const btnCloseNavMenu = (href) => {
    setAnchorElNav(null);
    navigate(href, { state: { from: "navbar" } });
  };

  const logoutClicked = async () => {
    try {
      await axios.post(`${url}/auth/logout`, {
        refreshToken: tokenHandler.getRefreshToken(),
      });
      tokenHandler.clearLocalStorage();
    } catch (error) {
      console.log(error);
    }
    dispatch(loggedOut());
    forceRerender();
  };

  const pagesBtnClicked = (href) => {
    console.log("hi");
    navigate(href, { state: { from: "navbar" } });
  };

  const loginClicked = () => {
    dispatch(login());
  };

  useEffect(() => {
    const fetchItemsCount = async () => {
      try {
        const response = await axios.get(`${url}/category/fetchItemsCount`, {
          headers: {
            "access-token": tokenHandler.getAccessToken(),
          },
        });

        dispatch(setValue(response.data.data));
      } catch (error) {
        if (error.response.status === 401) {
          try {
            await tokenHandler.refreshAccessToken();
            fetchItemsCount();
          } catch (error) {}
        }
      }
    };

    if (loggedIn) {
      fetchItemsCount();
    }
  }, [loggedIn]);

  useEffect(() => {
    forceRerender();
  }, [itemsCount]);

  return (
    <>
      <AppBar sx={{ zIndex: 100 }}>
        <Toolbar id="xyz" sx={{ backgroundColor: "#103F6D", height: "64px" }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                maxWidth: "1300px",
              }}
            >
              <img
                src={logo}
                alt="Morsebiz-Logo"
                onClick={() => navigate("/")}
                style={{
                  marginLeft: "20px",
                  cursor: "pointer",
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: "160px",
                  height: "45px",
                  width: "180px",
                }}
              />

              <div
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  id="searchbar"
                  style={{
                    backgroundColor: "#ffffff",
                    height: "40px",
                    display: "flex",
                    alignItems: "Center",
                    borderRadius: "5px",
                    flexGrow: "1",
                    justifyContent: "start",
                    margin: "0 10px",
                    maxWidth: "550px",
                  }}
                >
                  <input
                    type="text"
                    style={{
                      border: 0,
                      fontSize: "16px",
                      boxSizing: "border-box",
                      padding: "0 10px",
                      color: "#000000",
                      margin: "0",
                      maxWidth: "10000px",
                      background: "none",
                      outline: "none",
                      width: "100%",
                    }}
                    placeholder="What are you looking for?"
                  />

                  <IconButton sx={{ height: "40px", flexShrink: "0" }}>
                    <SearchIcon sx={{ fontSize: "28px" }} />
                  </IconButton>
                </div>

                {tokenHandler.getRefreshToken() ? (
                  <>
                    <Button
                      variant="contained"
                      sx={{
                        color: "#103F6D",
                        fontSize: "14px",
                        fontWeight: "700",
                        textTransform: "none",
                        backgroundColor: "#ffffff",
                        marginLeft: "5px",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={logoutClicked}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      sx={{
                        color: "#103F6D",
                        fontSize: "14px",
                        fontWeight: "700",
                        textTransform: "none",
                        backgroundColor: "#ffffff",
                        marginLeft: "5px",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={loginClicked}
                    >
                      Login
                    </Button>
                  </>
                )}

                {pages.map((value, index) => (
                  <Button
                    key={index}
                    sx={{ color: "#ffffff", margin: "0 0.2vw" }}
                    onClick={() => pagesBtnClicked(value.href)}
                  >
                    {value.name === "Cart" && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {loggedIn && itemsCount !== 0 && (
                          <span
                            style={{
                              backgroundColor: "#ef7d10",
                              borderRadius: "6px",
                              zIndex: 100,
                              fontSize: "12px",
                            }}
                          >
                            {itemsCount}
                          </span>
                        )}
                        <ShoppingCartIcon
                          sx={
                            loggedIn && itemsCount !== 0
                              ? {
                                  position: "relative",
                                  bottom: "8px",
                                }
                              : {}
                          }
                        />
                      </div>
                    )}
                    <Typography
                      align="center"
                      sx={{
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {value.name}
                    </Typography>
                  </Button>
                ))}
              </div>
            </div>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logoMobile} alt="Morsebiz-Logo" />

            <div
              id="searchbar"
              style={{
                backgroundColor: "#ffffff",
                height: "40px",
                display: "flex",
                alignItems: "Center",
                borderRadius: "20px",
                flexGrow: "1",
                justifyContent: "start",
                margin: "0 10px",
                maxWidth: "550px",
              }}
            >
              <input
                type="text"
                style={{
                  border: 0,
                  fontSize: "16px",
                  fontWeight: "300",
                  boxSizing: "border-box",
                  padding: "0 10px",
                  color: "#000000",
                  margin: "0",
                  maxWidth: "10000px",
                  background: "none",
                  outline: "none",
                  width: "100%",
                }}
                placeholder="Search"
              />

              <IconButton sx={{ height: "40px", flexShrink: "0" }}>
                <SearchIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </div>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon
                style={{
                  color: "#ffffff",
                }}
              />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    btnCloseNavMenu(page.href);
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}

              {tokenHandler.getRefreshToken() ? (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    logoutClicked();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    loginClicked();
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
