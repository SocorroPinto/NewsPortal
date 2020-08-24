import React from "react";
import NewsListHeader from "./NewsListHeader";
import NewsListBody from "./NewsListBody";

const NewsLinks = (props) => {
  console.log(
    "Hitting the news link page with links",
    props.searchNewsList.length
  );
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
