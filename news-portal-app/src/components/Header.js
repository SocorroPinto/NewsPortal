import React from "react";
import "./Header.css";
import Weather from "./Weather.js";
import Time from "./Time.js";

// Header of the page. It displays title, suscribe and login buttons and time/temperature
const Header = (props) => {
  return (
    <div id="news-header-container">
      <h1 id="news-header-title">THE PROPHET</h1>
      <div id="news-header-button-container">
        <button>SUSCRIBE NOW</button>
        <button>LOGIN</button>
      </div>
      <div id="news-header-time-temp-container">
        <Weather />
        <Time />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Header;
