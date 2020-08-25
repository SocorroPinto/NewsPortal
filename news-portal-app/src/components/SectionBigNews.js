import React, { Component } from "react";
import "./SectionBigNews.css";

class SectionBigNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyHTML: null,
            image: null
        };
    }

    render() {
        let myNewFormatted = [];
        myNewFormatted = this.props.myNewFormat(this.props.myNew, 'Main', this.props.myNewId);

        return ( <div>
                    {myNewFormatted} 
                </div> );
    }
}

export default SectionBigNews;