import React, { Component } from "react";
// import "./ParkDetail.css";
import axios from "axios";
// let DomParser = require('dom-parser');
// let parser = new DomParser();


class Noticia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyHTML: null,
            image: null
        };
    }

    componentDidMount = async () => {
        let myNoticiaUrl = `${this.props.myApiUrl}?api-key=${this.props.myApiKey}&show-blocks=main,body`;
        let response = await axios.get(myNoticiaUrl);

        this.setState({
            bodyHTML: response.data.response.content.blocks.body[0].bodyHtml,
            image: response.data.response.content.blocks.main.elements[0].assets[2].file,
        });
    }

    render() {
        let myContent = document.createElement( 'html' );
        myContent.innerHTML = this.state.bodyHTML;
        let myParagraphs = myContent.querySelectorAll('p');
        let myTexts = Array.prototype.slice.call(myParagraphs);
        const myTexts2 = myTexts.map((myText, index) => {
             return (<p key={index}>{myText.innerText}</p>);
        });

        return ( <div className="detContainer">
            <img src={this.state.image}></img>
            <div>{myTexts2}</div>
            {/* <div>{this.state.bodyHTML}</div> */}
        </div>);
    }
}

export default Noticia;