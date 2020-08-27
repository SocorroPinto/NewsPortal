import React, { Component } from "react";
import "./SectionRigthNew.css";

class SectionRigthNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyHTML: null,
            image: null
        };
    }

    render() {
        let myNewFormatted = [];
        myNewFormatted = this.props.myNewFormat(this.props.myNew, 'Right', this.props.myNewId);

        return ( <div>
                    {myNewFormatted} 
                </div> );
    }
}

export default SectionRigthNew;