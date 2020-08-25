import React from "react";
import NewsListHeader from "./NewsListHeader";
import NewsListBody from "./NewsListBody";

// Container for the result of the search
// It includes the search header and the body of the result
const NewsLinks = (props) => {
  return (
    <div>
      <NewsListHeader
        searchKeyword={props.searchKeyword}
        searchNewsListCount={props.searchNewsList.length}
      />
      <NewsListBody
        searchNewsList={props.searchNewsList}
        setView={props.setView}
      />
    </div>
  );
};

export default NewsLinks;
