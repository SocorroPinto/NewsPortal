import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from "axios";
import SectionMainNew from './SectionMainNew';
import SectionRigthNew from './SectionRigthNew';
import { Link } from "react-router-dom";
import './SectionDet.css';
let myMainUrl = `https://content.guardianapis.com/`;


class SectionDet extends Component {
  constructor(props) {
    super(props);
    this.state = {
            sectionContent: null
        };
    }

    myNewFormat = (myNew, myClass) => {
        let myArrayImage = [];
        let myImageCre = {};

        if ( typeof myNew.blocks.main !== 'undefined') {
            myArrayImage = myNew.blocks.main.elements[0].assets.filter((elem, index) => {
                return (index === 2 && elem.type === 'image')
            });

            myImageCre = {
                alt: myNew.blocks.main.elements[0].imageTypeData.alt,
                caption: myNew.blocks.main.elements[0].imageTypeData.caption,
                copyright: myNew.blocks.main.elements[0].imageTypeData.copyright,
                credit: myNew.blocks.main.elements[0].imageTypeData.credit,
                source: myNew.blocks.main.elements[0].imageTypeData.source,
            }
        } 

        let myImage = (myArrayImage && typeof myArrayImage[0] !== 'undefined') ? myArrayImage[0] : null;
        if ( !myImage ) {
            myImage = { file: null };
        }
        let myContent = document.createElement( 'html' );
        myContent.innerHTML = myNew.blocks.body[0].bodyHtml;

        let myParagraphs = myContent.querySelectorAll('p');
        let myTexts = Array.prototype.slice.call(myParagraphs);
        const myTexts2 = myTexts.map((myText, index) => {
               return (<p className={`my${myClass}Para`} key={index}>{myText.innerText}</p>);
        });

        // console.log(myTexts2[0])
        let myMainImage = null;
        if ( typeof myImageCre !== 'undefined' && myImage.file !== null) {
            myMainImage = (<figure className={`my${myClass}Figure`}>
                            <img className={`my${myClass}Image`} src={myImage.file} alt={myImageCre.alt}></img>
                            <figcaption className={`my${myClass}FigCap`} >{myImageCre.caption}
                                        <div>{myImageCre.credit}</div>
                                        <div>{myImageCre.copyright}</div>
                                        <div>{myImageCre.source}</div>
                            </figcaption>
                            </figure>);
        } else { 
            myMainImage = <img className={`my${myClass}Image`} src={myImage.file} alt=""></img>
        }
        
        const mySecNew = {
                 bodyHTML: myTexts2[0],
                 image: myMainImage,
                 webUrl: myNew.webUrl,
                 webPublicationDate: myNew.webPublicationDate,
                 webTitle: myNew.webTitle,
                 sectionName: myNew.sectionName,
        }

        const myNewFormatted = []
        myNewFormatted.push(<div className={`my${myClass}Cont`}>
                                <div className={`my${myClass}Title`}>{mySecNew.webTitle}</div>
                                <div className={`my${myClass}SecName`}>{mySecNew.sectionName}</div>
                                {mySecNew.image}
                                {mySecNew.bodyHTML}
                            </div>);

        return myNewFormatted;
    }

    componentDidMount = async () => {
        let mySecUrl = `${myMainUrl}${this.props.section}?api-key=${this.props.myApiKey}&show-blocks=main,body`;
        let response = await axios.get(mySecUrl);

        this.setState({
             sectionContent: response.data.response.results
        });
    }

    render() {
        let myWebContent = [];
        let myRightContent = [];
        // console.log(this.state.sectionContent)
        if (this.state.sectionContent) {
           let myContArray = Object.values(this.state.sectionContent);
            myWebContent = myContArray.slice(0,1).map((myNew, index) => {
                return ( <SectionMainNew key={index} myNew={myNew} myNewFormat={this.myNewFormat}/> );
            });
            myRightContent = myContArray.slice(1,3).map((myNew, index) => {
                return ( <SectionRigthNew key={index} myNew={myNew} myNewFormat={this.myNewFormat}/> );
            });
        }

    //console.log(this.props.routerProps);
    return (
        <div className="sectionCont" >
            <div className="mCont">
                {myWebContent}
            </div>
            <div className="sideCont">
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