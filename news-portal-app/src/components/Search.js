import React from "react";
import "./Search.css";

// Display the search form. It includes the search field and the Go button
const Search = (props) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.setView("search");
        props.handleSearch(event.target.newsSearch.value);
      }}
    >
      <div id="search-container">
        <input type="text" name="newsSearch" placeholder="SEARCH"></input>
        <button id="searchButton" name="searchButton">
          Go
        </button>
      </div>
    </form>
  );
}; // End Search

export default Search;
