import React from "react";
import Navbar from "./Sidenav";
import { Switch, Route, Link } from "react-router-dom";
// import Applications from "./Applications";
import DefaultPic from "../../assets/AdamClouse2.jpg";
import "../../styles/Dashboard/Home.css";

const Home = ({ clearToken }) => {

    

  return (
    <div className="home-container">
      <div className="content-container">
        <img src={DefaultPic} alt="no img"  />
      </div>
      
    </div>
  );
};

export default Home;
