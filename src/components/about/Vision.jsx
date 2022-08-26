import { margin } from "@mui/system";
import React from "react";
import image1 from "./av-image.svg";
import image2 from "./pv-image.svg";
import team1 from "./team1.svg";
import team2 from "./team2.svg";
import team3 from "./team3.svg";
import team4 from "./team4.svg";
import "./Vision.css";

const Vision = () => {
  return (
    <div className="v-header">
      <div className="av-head">
        <div className="av-text">
          <h3 style={{ fontSize: "4rem" }}>Lorem Ipsum</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quos
          animi perferendis fuga ut inventore iusto provident magni dolorem
          culpa molestias voluptas amet nostrum maiores, praesentium dolor!
          Vero, in pariatur.
        </div>
        <div className="av-image">
          <img className="image1" src={image1} alt="none" />
        </div>
      </div>
      <div className="vp-head">
        <div className="vp-image">
          <img className="image2" src={image2} alt="none" />
        </div>
        <div className="vp-text">
          <h3 style={{ fontSize: "4rem" }}>Lorem Ipsum</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quos
          animi perferendis fuga ut inventore iusto provident magni dolorem
          culpa molestias voluptas amet nostrum maiores, praesentium dolor!
          Vero, in pariatur.
        </div>
      </div>
      <div className="team">
        <h1 style={{ textAlign: "center" }}>Our Team</h1>
        <div className="boxes">
          <div className="box">
            <img className="teamsvg" src={team1} alt="none" />
            <h4 style={{ margin: "1rem" }}>Miss Theresa Webb</h4>
          </div>
          <div className="box">
            <img className="teamsvg" src={team2} alt="none" />
            <h4>Mr Darrell Steward</h4>
          </div>
          <div className="box">
            <img className="teamsvg" src={team3} alt="none" />
            <h4>Ms Esther Howard</h4>
          </div>
          <div className="box">
            <img className="teamsvg" src={team4} alt="none" />
            <h4>Mr Bessie Cooper</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
