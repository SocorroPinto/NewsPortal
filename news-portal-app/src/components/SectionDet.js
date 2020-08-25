import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from "axios";
import SectionBigNews from './SectionBigNews';
import SectionRigthNew from './SectionRigthNew';
import './SectionDet.css';
let myMainUrl = `https://content.guardianapis.com/`;


class SectionDet extends Component {
  constructor(props) {
    super(props);
    this.state = {
            sectionName: null,
            sectionContent: null
        };
    }

    componentDidMount = async () => {
        let mySecUrl = `${myMainUrl}${this.props.section}?api-key=${this.props.myApiKey}&show-blocks=main,body`;
        let response = await axios.get(mySecUrl);

        this.setState({
            sectionName: this.props.section,
            sectionContent: response.data.response.results
        });
    }

    render() {
        let myWebContent = [];
        let myRightContent = [];

        if (this.state.sectionContent) {
            let myContArray = Object.values(this.state.sectionContent);
             myWebContent = myContArray.slice(0,1).map((myNew, index) => {
                 return ( <SectionBigNews key={index} myNewId={index} myNew={myNew} myNewFormat={this.props.myNewFormat}/> );
             });
             myRightContent = myContArray.slice(1,3).map((myNew, index) => {
                 return ( <SectionRigthNew key={index+1} myNewId={index+1} myNew={myNew} myNewFormat={this.props.myNewFormat}/> );
             });
        }

    return (
        <div className="sectionCont" >
            <div key="0" className="mCont">
                {myWebContent}
            </div>
            <div key="2" className="sideCont">
                {myRightContent}
            </div>
        </div>
    );
  }
}

export default SectionDet;

                    // { ( index > 0 ) && <SectionRigthNew  key={index} myNew={myNew} myNewFormat={this.myNewFormat}/> }
                //     {/* <a href={myNew.webUrl}>{myNew.webTitle}</a>  */}
                //    {/* <Noticia myApiKey={myApiKey} myApiUrl={myNew.apiUrl} /> */});