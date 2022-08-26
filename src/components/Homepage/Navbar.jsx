/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./Navbar.css";
import image from "./footer.svg";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text className="nav-item">Manufacturers</text>
            </a>
            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text className="nav-item">Customers</text>
            </a>

            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <text className="nav-item">About</text>
            </Link>

            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text
                className="nav-item"
                style={{ textAlign: "left" }}
              >{`Blog & News`}</text>
            </a>

            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
              <text className="nav-item">FAQ</text>
            </a>

            <a href="/register" style={{ textDecoration: "none" }}>
              <button className="nav-btn">
                <PersonOutlinedIcon />
                Login/Register
              </button>
            </a>
            <button className="ham-btn" onClick={() => setShow(!show)}>
              <MenuIcon />
              {/* {!show ? `show` : `Hide`} */}
            </button>
          </div>
        </div>

        <div className="lang">
          eng <KeyboardArrowDownOutlinedIcon style={{ color: "white" }} />
        </div>
        {show && (
          <div className="acordian">
            <ul className="ham-ul">
              <li className="ham-list">Home</li>
              <li className="ham-list">Manufacturers</li>
              <li className="ham-list">Customers</li>
              <li className="ham-list">About</li>
              <li className="ham-list">Blog & News</li>
              <li className="ham-list">FAQ</li>
              <li className="ham-list">
                <button className="ham-list nav-ham-btn">
                  <PersonOutlinedIcon />
                  Login/Register
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
