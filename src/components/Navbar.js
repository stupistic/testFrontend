/* eslint-disable jsx-a11y/anchor-is-valid */
// import tokenHandler from "../tokenHandler";
// import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { login, loggedOut, setValue } from "../actions";
import { useSelector } from "react-redux";

import "./Navbar.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import image from "./footer.svg";
import Auth from "./auth/Auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const loginClicked = () => {
    dispatch(login());
  };
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="background">
        <div className="header">
          <div className="nav-left">
            <img className="nav-img" src={image} alt="none" />
            <label className="nav-category">
              Category
              <button
                style={{
                  // paddingTop: "1rem",
                  border: "none",
                  background: "none",
                }}
              >
                <KeyboardArrowDownOutlinedIcon style={{ color: "white" }} />
              </button>
            </label>
          </div>
          <div className="nav-right">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <text className="nav-item">Home</text>
            </Link>
            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text className="nav-item">Manufacturers</text>
            </Link>
            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text className="nav-item">Customers</text>
            </Link>

            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <text className="nav-item">About</text>
            </Link>

            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text
                className="nav-item"
                style={{ textAlign: "left" }}
              >{`Blog & News`}</text>
            </Link>

            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text className="nav-item">FAQ</text>
            </Link>
            {/* <Link to="/register" style={{ textDecoration: "none" }}> */}
            <button className="nav-btn" onClick={loginClicked}>
              <PersonOutlinedIcon />
              Login/Register
            </button>
            {/* </Link> */}
            <button className="ham-btn" onClick={() => setShow(!show)}>
              <MenuIcon />
            </button>
          </div>
        </div>

        <div className="lang">
          eng <KeyboardArrowDownOutlinedIcon style={{ color: "white" }} />
        </div>
        {show && (
          <div className="acordian">
            <ul className="ham-ul">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <li className="ham-list">Home</li>
              </Link>
              <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                <li className="ham-list">Manufacturers</li>
              </Link>
              <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                <li className="ham-list">Customers</li>
              </Link>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <li className="ham-list">About</li>
              </Link>
              <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                <li className="ham-list">Blog & News</li>
              </Link>
              <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
                <li className="ham-list">FAQ</li>
              </Link>
              <li className="ham-list">
                <button className="ham-list nav-ham-btn" onClick={loginClicked}>
                  <PersonOutlinedIcon />
                  Login/Register
                </button>
              </li>
            </ul>
          </div>
        )}
        <Auth />
      </div>
    </>
  );
};

export default Navbar;
