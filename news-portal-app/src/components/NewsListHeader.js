import React from "react";
import "./NewsListHeader.css";

// Structure of the search header. It includes the number of news displayed and the keyword
const NewsListHeader = (props) => {
  const showingLine1 = `Showing ${props.searchNewsListCount} results of`;
  const showingLine2 = props.searchKeyword;
  return (
    <div id="nlh-header-conteiner">
      <p id="nlh-line1">{showingLine1}</p>
      <p id="nlh-line2">{showingLine2}</p>
    </div>
  );
};
export default NewsListHeader;
