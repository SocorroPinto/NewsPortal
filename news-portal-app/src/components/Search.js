import React from "react";
// import { BsSearch } from "react-icons/bs";

const Search = (props) => {
  console.log(props.searchString);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.setView("search");
        props.handleSearch(event.target.newsSearch.value);
      }}
    >
      <input type="search" id="newsSearch" name="newsSearch"></input>
      {/* <BsSearch /> */}
    </form>
  );
}; // End Search

export default Search;
