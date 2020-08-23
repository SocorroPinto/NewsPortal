import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from "axios";
// import Noticia from "./components/Noticia";
import Noticia from "./components/Noticia";
import './App.css';
import SectionList from './components/SectionList';
import SectionDet from './components/SectionDet';
import { Route, Link, Switch, Redirect } from "react-router-dom";

const sections = [{secId: "news",
                   dispTag: " News",
                   secUrl: "https://content.guardianapis.com/news"}, 
                  {secId: "world",
                   dispTag: " World",
                   secUrl: "https://content.guardianapis.com/world"},
                  {secId: "culture",
                   dispTag: " Culture",
                   secUrl: "https://content.guardianapis.com/culture"},
                  {secId: "business",
                   dispTag: " Business",
                   secUrl: "https://content.guardianapis.com/business"},
                  {secId: "politics",
                   dispTag: " Politics",
                   secUrl: "https://content.guardianapis.com/politics"},
                  {secId: "science",
                   dispTag: " Science",
                   secUrl: "https://content.guardianapis.com/science"},
                  {secId: "sport",
                   dispTag: " Sports",
                   secUrl: "https://content.guardianapis.com/sport"},
                  {secId: "technology",
                   dispTag: " Technology",
                   secUrl: "https://content.guardianapis.com/technology"}];

let myApiKey = "8e3808f1-0f78-4746-ba70-fd8bf8ce21f4";

class App extends Component {
  constructor() {
    super();
    this.state = {
      section: "news",
    };
  }

  render() {

    const myRoutes = sections.map((section, index) => {
        return (<Route key={index} path={`/${section.secId}/`} render={(routerProps) => 
          ( <div className="allContent">
                <SectionList myApiKey={myApiKey} allSections={sections}/>
                <SectionDet myApiKey={myApiKey} section={section.secId} routerProps={routerProps}/>
          </div> ) } />)
    });


    return (
      <div className="App">
        <header className="App-header">
          <h1>My REACT News Portal</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/" >
                <div>
                  <SectionList myApiKey={myApiKey} allSections={sections} />
                  <SectionDet myApiKey={myApiKey} section="news" />
                </div>
            </Route>
            {myRoutes}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;