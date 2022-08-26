import React from "react";
import Vision from "./about/Vision";
import Footer from "./Homepage/Footer";
import Navbar from "../components/Navbar";
import Auth from "./auth/Auth";

const About = () => {
  return (
    <>
      <Navbar />
      {/* <Auth /> */}
      <Vision />
      <Footer />
    </>
  );
};

export default About;
