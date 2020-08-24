import React from "react";
import "./NewsListBody.css";

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
    return (
      <div id="nlb-individual-container" key={index}>
        <div id="nlb-date-container">
          <p>{formattedDate}</p>
        </div>
        <div id="nlb-title-container">
          <p id="nlb-title-container-section">
            {aNews.sectionName.toUpperCase()}
          </p>
          <li id="nlb-title-container-headline">{aNews.webTitle}</li>
        </div>
        <div id="nlb-img-container">
          <img src={aNews.fields.thumbnail} />
        </div>
      </div>
    );
  });

  return (
    <div>
      {newsListWebArray}
      <li
        id="nlb-go-home"
        onClick={() => {
          props.setView("home");
        }}
      >
        Go to Home Page >>
      </li>
    </div>
  );
};

export default NewsListBody;
