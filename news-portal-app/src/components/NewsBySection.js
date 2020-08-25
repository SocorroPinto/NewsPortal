import React, { Component } from 'react';
import axios from "axios";
import SectionRigthNew from './SectionRigthNew';
import { Link } from "react-router-dom";
import './NewsBySection.css';
let myMainUrl = `https://content.guardianapis.com/`;


class NewsBySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
            sections: ['world', 'politics', 'business'],
            sectNames: ['World News', 'Politics', 'Business'],
            sectionContents: []
        };
    }

    componentDidMount = async () => {
        let myContents = [];
        for (let i = 0; i<this.state.sections.length; i++ ){
            let mySecUrl = `${myMainUrl}${this.state.sections[i]}?api-key=${this.props.myApiKey}&show-blocks=main,body`;  
            let myInfo = await axios.get(mySecUrl);

            myContents.push(myInfo.data.response.results);   
        }
        
        this.setState({
            sectionContents: myContents
        });
    }

    render() {
        let myWebContent = this.state.sectionContents;
        let mySectionContent = [null, null, null];
        let myHorizNews = [];

        if ( myWebContent !== 'undefined') {
            myWebContent.forEach((mySection, index) => {
                let myContArray = Object.values(mySection);

                let myRightContent = myContArray.slice(0,3).map((myNew, index) => {
                     return ( <SectionRigthNew key={`${mySection}${index}`} myNewId={index} myNew={myNew} myNewFormat={this.props.myNewFormat}/> );
                });
                 mySectionContent[index] = myRightContent;
            });


            myHorizNews = this.state.sections.map((elem, index) => {
                return (<div key={`${elem}-${index}`}>
                            <Link key={elem+index} to={`/${elem}`} >
                                {this.state.sectNames[index]}
                            </Link>
                            <div key={elem+'-'+index}  className="horizontalNews">
                                {mySectionContent[index]}
                            </div>
                        </div>);
            });
        }

        return (
            <div className="secNewsRoute" >
                <div className="secNewsRouteCont">
                    { myHorizNews }
                </div>
            </div>
        );
    }
}

export default NewsBySection;
