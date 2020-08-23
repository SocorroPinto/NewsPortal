import React, { Component } from "react";
import "./SectionMainNew.css";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

class SectionMainNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyHTML: null,
            image: null
        };
    }

    render() {
        let myNewFormatted = [];
        myNewFormatted = this.props.myNewFormat(this.props.myNew, 'Main');

        return ( <div>
                    {myNewFormatted} 
                </div> );
    }
}

export default SectionMainNew;