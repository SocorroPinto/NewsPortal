import React, { Component } from "react";
import "./SingleNew.css";
import axios from "axios";
import FakePromo from "./FakePromo";
// let DomParser = require('dom-parser');
// let parser = new DomParser();
let myMainUrl = `https://content.guardianapis.com/`;



class SingleNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articleContent: {}
        };
    }

    formatSingleArt = (myNew, myClass) => {
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
        //'./images/GuardianDef.jpg'
        if ( !myImage ) {
             myImage = { file: '../images/GuardianDef.jpg'  }
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
                 bodyHTML: myTexts2,
                 image: myMainImage,
                 webUrl: myNew.webUrl,
                 webPublicationDate: myNew.webPublicationDate,
                 webTitle: myNew.webTitle,
                 sectionName: myNew.sectionName,
                 sectionId: myNew.sectionId,
                 newId: myNew.id.replace(/\//g, "-99-")
        }

        const myNewFormatted = []
        myNewFormatted.push(<div className={`my${myClass}Cont`}>
                                <div className={`my${myClass}Title`}>
                                        {mySecNew.webTitle}
                                </div>
                                <div className={`my${myClass}SecName`}>{mySecNew.sectionName}</div>
                                {mySecNew.image}
                                <a className={`my${myClass}LinkArt`} href={mySecNew.webUrl}>Go to The Guardian original article.</a>
                                <div className={`my${myClass}ParCont`}>{mySecNew.bodyHTML}</div>
                            </div>);

        return myNewFormatted;
    }

    componentDidMount = async () => {
        let myNewId = this.props.routerProps.match.params.newId.replace(/\-99\-/g, "/");
        let myNoticiaUrl = `${myMainUrl}${myNewId}?api-key=${this.props.myApiKey}&show-blocks=main,body`;
        let noticia = await axios.get(myNoticiaUrl);
        //console.log(noticia.data.response.content)
        this.setState({
            articleContent: noticia.data.response.content
        });
    }

    render() {
        let myNewFormatted = [];
        //console.log('Estoy aqui, queriendote!!!');

        if ( Object.keys(this.state.articleContent).length !== 0 ) {
            console.log(this.state.articleContent)
            myNewFormatted = this.formatSingleArt(this.state.articleContent, 'Single');
        }

        return ( <div className="singContainer">
                    <div>{myNewFormatted}</div>
                    <div>
                        <FakePromo/>
                        <FakePromo/>
                        <FakePromo/>
                        <FakePromo/>
                    </div> 
                </div>);
    }
}

export default SingleNew;