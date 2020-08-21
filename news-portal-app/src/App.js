import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from "axios";
import Noticia from "./components/Noticia";
import './App.css';
let myApiKey = "8e3808f1-0f78-4746-ba70-fd8bf8ce21f4";
let myMainUrl = `https://content.guardianapis.com/search?api-key=${myApiKey}&section=business`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      sportsCont: null
    };
  }

  componentDidMount = async () => {
    let response = await axios.get(myMainUrl);
    
    this.setState({
      sportsCont: response.data.response.results
    });
  }

  render() {

    let myWebContent = [];
    if (this.state.sportsCont) {
      let myContArray = Object.values(this.state.sportsCont);
        myWebContent = myContArray.map((myNew, index) => {
          return(<div key={index}>
                  <a href={myNew.webUrl}>{myNew.webTitle}</a>
                  <Noticia myApiKey={myApiKey} myApiUrl={myNew.apiUrl} />
                </div>);
          });
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>My News Portal</h1>
        </header>
        {myWebContent}
      </div>
    );
  }
}

export default App;