import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div id="news-header-container">
      <h1 id="news-header-title">Daily Planet</h1>
      <div id="news-header-button-container">
        <button>SUSCRIBE NOW</button>
        <button>LOGIN</button>
      </div>
    </div>
  );
};

export default Header;
