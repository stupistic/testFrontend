import React from "react";
import "./Footer.css";
import img from "./footer.svg";

const Footer = () => {
  return (
    <div className="foot-container">
      <div className="left">
        <img className="image" src={img} alt="none" />

        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          adipisci reprehenderit distinctio! Tempora natus perferendis vitae,
          delectus atque nesciunt ut distinctio doloribus. Porro illum
          asperiores odit ut beatae sapiente qui.
        </span>
      </div>
      <div className="center">
        <h3 style={{ textAlign: "center" }}>Company</h3>
        <ul className="list">
          <li className="list-item">About Us</li>
          <li className="list-item">Contact Us</li>
          <li className="list-item">FAQ</li>
          <li className="list-item">Manufacturers</li>
          <li className="list-item">Customers</li>
          <li className="list-item">Blog & News</li>
        </ul>
      </div>
      <div className="right">
        <h3>Stay in Touch</h3>
        <div>+91 9833064499</div>
      </div>
    </div>
  );
};

export default Footer;
