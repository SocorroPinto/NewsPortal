import React from "react";
import "./Footer.css";

// Footer of the page. It displays several options
const Footer = (props) => {
  const options = [
    "© 2020 The True Media Company",
    "Contact Us",
    "Work with us",
    "Advertise",
    "Privacy",
    "Site Map",
    "Help",
    "Subscriptors",
  ];
  const creators =
    "Designed & Developed by Socorro Pinto and Cesar Trevino, 2020";

  const paddingImage = "/images/footerImg.png";
  //Creating the HTML elemnt to display as a first line of footer
  const footerWebLine1 = options.map((footerElement, index) => {
    return <p key={index}>{footerElement}</p>;
  }); // End mapping

  // Returning the footer with the two lines
  return (
    <div>
      <img alt="" src={paddingImage} />
      <div id="line1Container">{footerWebLine1}</div>
      <div id="line2Container">{creators}</div>
    </div>
  );
};

export default Footer;
