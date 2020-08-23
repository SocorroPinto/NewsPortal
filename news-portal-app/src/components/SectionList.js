import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from "axios";
// import Noticia from "./components/Noticia";
import { Link } from "react-router-dom";
import './SectionList.css';
let myApiKey = "8e3808f1-0f78-4746-ba70-fd8bf8ce21f4";
let myMainUrl = `https://content.guardianapis.com/search?api-key=${myApiKey}&section=business`;


class SectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportsCont: null
    };
  }

//   componentDidMount = () => {
//     this.setState({
//         sportsCont: 1,
//     });
//   }

  render() {
    const myLinks = this.props.allSections.map((sec, index) => {
        return (<Link key={index} className={ index === 0 ? "active" : "" } to={`/${sec.secId}`} >
                    {sec.dispTag}
                </Link>);
    });

    return (
        <div className="navbar">
            {myLinks}
        </div>
    );
  }
}

export default SectionList;