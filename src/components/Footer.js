import React from "react";
import "./Footer.css";

// Footer of the page. It displays several options
const Footer = (props) => {
  const options = [
    "© The True Media Company",
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

  const disclosure =
    "We do not own the news and images displayed at this page. The app has been developed for educational purposes";

  const resources = "API's resource: The guardian, Wheaterbit";

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
      <div className="line2Container">{creators}</div>
      <div className="line2Container">{disclosure}</div>
      <div className="line2Container">{resources}</div>
    </div>
  );
};

export default Footer;
