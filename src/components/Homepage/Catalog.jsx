import React from "react";
import "./Catalog.css";
import cat1 from "./cat1.svg";
import cat2 from "./cat2.svg";
import cat3 from "./cat3.svg";
import cat4 from "./cat4.svg";

const Catalog = () => {
  return (
    <div>
      <div className="title">
        <h1 className="title title1">Our Values</h1>
      </div>
      <div className="boxes">
        <div className="box">
          <img className="catsvg" src={cat1} alt="none" />
          <h3 className="catdesc">Product Cataloguing and Sampling</h3>
        </div>
        <div className="box">
          <img className="catsvg" src={cat2} alt="none" />
          <h3 className="catdesc">Quality Certifications</h3>
        </div>
        <div className="box">
          <img className="catsvg" src={cat3} alt="none" />
          <h3 className="catdesc">Shipping and Logistics</h3>
        </div>
        <div className="box">
          <img className="catsvg" src={cat4} alt="none" />
          <h3 className="catdesc">Real - time visibility</h3>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
