import React from "react";
import "./Image.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Image = () => {
  return (
    <div className="Image">
      <div className="searchbar">
        <input
          className="search-input"
          placeholder="Search for a product or manufacturers"
        />
        <button className="search-btn">
          <SearchOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default Image;
