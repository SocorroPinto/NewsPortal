import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsList from "./components/NewsList";
import Search from "./components/Search";

import SectionList from "./components/SectionList";
import NewsBySection from "./components/NewsBySection";
import SectionDet from "./components/SectionDet";
import SingleNew from "./components/SingleNew";

// import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Route, Link, Switch } from "react-router-dom";

const DEF_IMAGE = '../images/GuardianDef.jpg';

const sections = [
  { secId: "news", dispTag: " News" },
  { secId: "world", dispTag: " World" },
  { secId: "culture", dispTag: " Culture" },
  { secId: "business", dispTag: " Business" },
  { secId: "politics", dispTag: " Politics" },
  { secId: "science", dispTag: " Science" },
  { secId: "sport", dispTag: " Sports" },
  { secId: "technology", dispTag: " Technology" },
  { secId: "search", dispTag: " Search" },
];

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

  imageArticle = (pClass, pMainBlock, pImageData) => {
    let myArrayImage = [];
    let myImageCre = {
            alt: '',
            caption: '',
            copyright: '',
            credit: '',
            source: '' }
    let myImage = { file: DEF_IMAGE,
                    creditos: null}

    myArrayImage = pMainBlock.filter((elem, index) => {
      return (index === 2 && elem.type === 'image')
    });

    if ( pImageData !== 'undefined' ) {
      
      for ( let elem in pImageData ) {
        
        switch ( elem ) {
          case 'alt':
            myImageCre.alt = pImageData[elem];
          break;
          case 'caption':
            myImageCre.caption = pImageData[elem];
          break;
          case 'copyright':
            myImageCre.copyright = pImageData[elem];
          break;
          case 'credit':
            myImageCre.credit = pImageData[elem];
          break;
          case 'source':
            myImageCre.source = pImageData[elem];
          break;
        }
      }
    }

    myImage.creditos = myImageCre;
    myImage.file = (myArrayImage && typeof myArrayImage[0] !== 'undefined') ? myArrayImage[0].file : myImage.file;

    let myMainImage = (<figure className={`my${pClass}Figure`}>
                        <img className={`my${pClass}Image`} src={myImage.file} alt={myImage.creditos.alt}></img>
                        <figcaption className={`my${pClass}FigCap`} >{myImage.creditos.caption}
                                    <div>{myImage.creditos.credit}</div>
                                    <div>{myImage.creditos.copyright}</div>
                                    <div>{myImage.creditos.source}</div>
                        </figcaption>
                        </figure>);

    return myMainImage;
  }

  paragraphsArticle = (pClass, pBody) => {
    let myContent = document.createElement( 'html' );
    myContent.innerHTML = pBody;
      
    let myParagraphs = myContent.querySelectorAll('p');
    let myTexts = Array.prototype.slice.call(myParagraphs);
    const myTexts2 = myTexts.map((myText, index) => {
      return (<p className={`my${pClass}Para`} key={index}>{myText.innerText}</p>);
    });

    if ( pClass === 'Single' ) {
      return myTexts2;
    } else {
      return myTexts2[0];
    }
  }

  myNewFormat = (myNew, myClass) => {
    let myMainImage = null;
    if ( typeof myNew.blocks.main !== 'undefined' ) {
      myMainImage = this.imageArticle(myClass, myNew.blocks.main.elements[0].assets, myNew.blocks.main.elements[0].imageTypeData)
    } else {
      myMainImage = this.imageArticle(myClass, [], {})
    }

    let myParagraphs = null;
    if ( typeof myNew.blocks.body[0].bodyHtml !== 'undefined' ) {
      myParagraphs = this.paragraphsArticle(myClass, myNew.blocks.body[0].bodyHtml)
    }

    const mySecNew = {
             bodyHTML: myParagraphs,
             image: myMainImage,
             webUrl: myNew.webUrl,
             webPublicationDate: myNew.webPublicationDate,
             webTitle: myNew.webTitle,
             sectionName: myNew.sectionName,
             sectionId: myNew.sectionId,
             newId: myNew.id.replace(/\//g, "-99-")
    }

    const myNewFormatted = []
    myNewFormatted.push(<div key={`content${myClass}`} className={`my${myClass}Cont`}>
                            <div className={`my${myClass}Title`}>
                                <Link className={`my${myClass}Link`} to={`/${mySecNew.sectionId}/${mySecNew.newId}`} >
                                    {mySecNew.webTitle}
                                </Link>
                            </div>
                            <div className={`my${myClass}SecName`}>{mySecNew.sectionName}</div>
                            {mySecNew.image}
                            {myClass === 'Single' && 
                            <a className={`my${myClass}LinkArt`} href={mySecNew.webUrl}>Go to The Guardian original article</a> }
                            <div className={`my${myClass}ParCont`}>{mySecNew.bodyHTML}</div>
                        </div>);

    return myNewFormatted;
  }



  handleSearch = async (searchString) => {
    const urlNewsSearch = `https://content.guardianapis.com/search?api-key=8e3808f1-0f78-4746-ba70-fd8bf8ce21f4&q=${searchString}&show-fields=thumbnail`;
    const response = await axios.get(urlNewsSearch);
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
        return <div></div>;
      // return <Test />;
    }
  }; // End pageView

  render() {
    const myRoutes = sections.slice(1,sections.length).map((section, index) => {
      return (
        <Route
          exact={true}
          key={index}
          path={`/${section.secId}/`}
          render={(routerProps) => (
            <div className="allContent">
              <SectionList myApiKey={myApiKey} allSections={sections} />
              <SectionDet
                myApiKey={myApiKey}
                section={section.secId}
                myNewFormat={this.myNewFormat}
                routerProps={routerProps}
              />
            </div>
          )}
        />
      );
    });

    const myRoutesSingle = sections.slice(1,sections.length).map((section, index) => {
      return (
        <Route
          key={index}
          path={`/${section.secId}/:newId`}
          render={(routerProps) => (
            <div className="allContent">
              <SectionList myApiKey={myApiKey} allSections={sections} />
              <SingleNew myApiKey={myApiKey} myNewFormat={this.myNewFormat} routerProps={routerProps} />
            </div>
          )}
        />
      );
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
            <Route exact path="/">
              <div>
                <SectionList myApiKey={myApiKey} allSections={sections} />
                <NewsBySection myApiKey={myApiKey}  myNewFormat={this.myNewFormat} section="news" />
              </div>
            </Route>
            <Route exact path="/news">
              <div>
                <SectionList myApiKey={myApiKey} allSections={sections} />
                <NewsBySection myApiKey={myApiKey}  myNewFormat={this.myNewFormat} section="news" />
              </div>
            </Route>
            <Route exact path="/search">
              <div>
                <SectionList myApiKey={myApiKey} allSections={sections} />
                <Search
                  searchString={this.state.searchString}
                  handleSearch={this.handleSearch}
                  setView={this.setView}
                />
                {this.pageView()}
              </div>
            </Route>
            {myRoutes}
            {myRoutesSingle}
          </Switch>
        </main>
        <footer className="">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
