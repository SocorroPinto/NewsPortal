import React from "react";
import "./Header.css";
import Weather from "./Weather.js";

// Header of the page. It displays title, suscribe and login buttons and temperature
const Header = (props) => {
  return (
    <div id="news-header-container">
      <h1 id="news-header-title">Daily Planet</h1>
      <div id="news-header-button-temp-container">
        <div id="news-header-button-container">
          <button>SUSCRIBE NOW</button>
          <button>LOGIN</button>
        </div>
        <div id="news-header-temperature">
          <Weather />
        </div>
      </div>
    </div>
  );
};

export default Header;
