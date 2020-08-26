import React, { Component } from "react";
import "./SingleNew.css";
import axios from "axios";
import FakePromo from "./FakePromo";
import FakeAd from "./FakeAd";
let myMainUrl = `https://content.guardianapis.com/`;

class SingleNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articleContent: {}
        };
    }

    componentDidMount = async () => {
        let myNewId = this.props.routerProps.match.params.newId.replace(/-99-/g, "/");
        let myNoticiaUrl = `${myMainUrl}${myNewId}?api-key=${this.props.myApiKey}&show-blocks=main,body`;
        let noticia = await axios.get(myNoticiaUrl);

        this.setState({
            articleContent: noticia.data.response.content
        });
    }

    render() {
        let myNewFormatted = [];

        if ( Object.keys(this.state.articleContent).length !== 0 ) {
            myNewFormatted = this.props.myNewFormat(this.state.articleContent, 'Single');
        }

        return ( <div className="singContainer">
                    <div className="displayedNew" >{myNewFormatted}</div>
                    <div className="fakeAdvertising">
                        <FakeAd/>
                        <FakePromo/>
                        <FakeAd/>
                        <FakePromo/>
                        <FakeAd/>
                    </div> 
                </div>);
    }
}

export default SingleNew;