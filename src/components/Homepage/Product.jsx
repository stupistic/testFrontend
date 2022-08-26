import React from "react";
import "./Product.css";

const Product = () => {
  return (
    <div className="product-main">
      <div className="product-left">
        <h1 style={{ fontSize: "40px" }}>
          Lorem, ipsum dolor sit amet consectetur
        </h1>
        <br />
        <p style={{ color: " #939393" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt placeat
          atque, dolor voluptatum optio, sed praesentium est deleniti
          asperiores, iusto neque facere rem blanditiis velit
        </p>
      </div>
      <div className="product-right">
        <div className="rectangle">
          <div className="rectangle circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
