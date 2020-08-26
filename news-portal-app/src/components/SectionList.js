import React, { Component } from 'react';
import { Link } from "react-router-dom";
import StockInfo from "./StockInfo";
import './SectionList.css';

class SectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportsCont: null
    };
  }

  render() {
    const myLinks = this.props.allSections.map((sec, index) => {
        return (<Link key={index} className={ index === 0 ? "active" : "" } to={`/${sec.secId}`} >
                    {sec.dispTag}
                </Link>);
    });

    return (
        <div className="navbar">
            {myLinks}
            <StockInfo/>
        </div>
    );
  }
}

export default SectionList;