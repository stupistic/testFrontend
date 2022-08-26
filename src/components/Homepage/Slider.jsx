import React from "react";
import "./Slider.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Slider = () => {
  return (
    <div>
      <div className="slider-title">
        <span className="slider-title1">The Indian Manufacturing Culture</span>
        <div className="sliders">
          <div className="slider-btn">
            <KeyboardArrowLeftIcon />
          </div>
          <div className="slider-item"></div>
          <div className="slider-btn">
            <KeyboardArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
