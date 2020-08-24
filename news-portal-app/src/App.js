import React, { Component } from 'react';
import axios from "axios"; 

import './App.css';

import Header from "./components/Header";
import NewsList from "./components/NewsList";
import Search from "./components/Search";
//import Test from "./components/Test";

import SectionList from './components/SectionList';
import SectionDet from './components/SectionDet';
import SingleNew from "./components/SingleNew";

import { Route, Link, Switch, Redirect } from "react-router-dom";

const sections = [{secId: "news",
                   dispTag: " News"}, 
                  {secId: "world",
                   dispTag: " World"},
                  {secId: "culture",
                   dispTag: " Culture"},
                  {secId: "business",
                   dispTag: " Business"},
                  {secId: "politics",
                   dispTag: " Politics"},
                  {secId: "science",
                   dispTag: " Science"},
                  {secId: "sport",
                   dispTag: " Sports"},
                  {secId: "technology",
                   dispTag: " Technology"},
                  {secId: "search",
                   dispTag: " Search"}];

let myApiKey = "8e3808f1-0f78-4746-ba70-fd8bf8ce21f4";

class App extends Component {
  constructor() {
    super();
    this.state = {
      section: "news",
      searchNewsList: [],
      searchKeyword: "",
      currentView: "",
    };
  }

  handleSearch = async (searchString) => {
    const urlNewsSearch = `https://content.guardianapis.com/search?api-key=8e3808f1-0f78-4746-ba70-fd8bf8ce21f4&q=${searchString}&show-fields=thumbnail`;
    // console.log(urlNewsSearch);
    const response = await axios.get(urlNewsSearch);
    console.log(response.data.response.results);
    this.setState({
      searchNewsList: response.data.response.results,
      searchKeyword: searchString,
    });
  };

  setView = (view) => {
    this.setState({
      currentView: view,
    });
  }; // End setView

  pageView = () => {
    switch (this.state.currentView) {
      case "search":
        return (
          <NewsList
            searchNewsList={this.state.searchNewsList}
            searchKeyword={this.state.searchKeyword}
            setView={this.setView}
          />
        );
        break;
      default:
        return (<div></div>);
        // return <Test />;
    }
  }; // End pageView

  render() {
    const myRoutes = sections.map((section, index) => {
        return (<Route exact={true} key={index} path={`/${section.secId}/`} render={(routerProps) => 
          ( <div className="allContent">
                <SectionList myApiKey={myApiKey} allSections={sections}/>
                <SectionDet myApiKey={myApiKey} section={section.secId} routerProps={routerProps}/>
          </div> ) } />)
    });

    const myRoutesSingle = sections.map((section, index) => {
      return (<Route key={index} path={`/${section.secId}/:newId`} render={(routerProps) => 
        ( <div className="allContent">
              <SectionList myApiKey={myApiKey} allSections={sections}/>
              <SingleNew myApiKey={myApiKey} routerProps={routerProps}/>
        </div> ) } />)
    });

    return (
      <div className="App">
        <header className="App-header">
        <Header
          setView={this.setView}
          searchString={this.state.searchString}
          handleSearch={this.handleSearch}
        />
        </header>
        <main>
          <Switch>
            <Route exact path="/" >
                <div>
                  <SectionList myApiKey={myApiKey} allSections={sections} />
                  <SectionDet myApiKey={myApiKey} section="news" />
                </div>
            </Route>
            <Route exact path="/search" >
                <div>
                  <SectionList myApiKey={myApiKey} allSections={sections} />
                  <Search
                    searchString={this.state.searchString}
                    handleSearch={this.handleSearch}
                    setView={this.setView}
                  />
                  {/* <NewsList
                    searchNewsList={this.state.searchNewsList}
                    searchKeyword={this.state.searchKeyword}
                    setView={this.setView}
                  /> */}
                  {this.pageView()} 
                </div>
            </Route>
            {myRoutes}
            {myRoutesSingle}
            
            {/* <Route exact path="/search" >
                <div>
                  <SectionList myApiKey={myApiKey} allSections={sections} />
                  <>
                </div>
            </Route> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;