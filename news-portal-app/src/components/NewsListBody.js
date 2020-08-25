import React from "react";
import "./NewsListBody.css";
import { Link } from "react-router-dom";

// Local function to format publication date with Format Mmm dd, yyyy
const formatDate = (stringDate) => {
  const d = new Date(stringDate);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};

// Function to get the details, format and parse the list of news as a result of the search keyword
const NewsListBody = (props) => {
  // Local variabla ini
  let newsListWebArray = [];
  let formattedDate = "";

  //   const newsListArray = Object.values(props.searchNewsList);

  //Mapping the list of News to the proper HTML format
  newsListWebArray = props.searchNewsList.map((aNews, index) => {
    //Calling funtion to format date
    formattedDate = formatDate(aNews.webPublicationDate);

    // In case the fields option with the thumbnail is not returned we assign a default image
    let myImage = "";
    if (typeof aNews.fields === "undefined") {
      myImage = "../images/GuardianDef.jpg";
    } else {
      myImage = aNews.fields.thumbnail;
    }

    console.log("NEWS ID", aNews.id);
    return (
      <div id="nlb-individual-container" key={index}>
        <div id="nlb-date-container">
          <p>{formattedDate}</p>
        </div>
        <div id="nlb-title-container">
          <p id="nlb-title-container-section">
            {aNews.sectionName.toUpperCase()}
          </p>
          <Link
            to={`/search/${aNews.id.replace(/\//g, "-99-")}`}
            id="nlb-title-container-headline"
          >
            {aNews.webTitle}
          </Link>
          {/* <li id="nlb-title-container-headline">{aNews.webTitle}</li> */}
        </div>
        <div id="nlb-img-container">
          <img alt="" src={myImage} />
        </div>
      </div>
    );
  }); // End MAP

  return <div>{newsListWebArray}</div>;
};

export default NewsListBody;
