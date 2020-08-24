import React, { Component } from "react";
import "./FakePromo.css";


class FakePromo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let myCoupon = null;
        if ( this.props.url ) {
            myCoupon = (<div className="coupon">
                <div className="container">
                    <h3>Socorro Company</h3>
                 </div>
                <img className="iCoupon" src={this.props.url} alt="Coupon"></img>
                <div className="container blanco">
                    <h2><b>20% OFF YOUR PURCHASE</b></h2> 
                    <p>Lorem ipsum dolor sit amet, et nam pertinax gloriatur. Sea te minim soleat senserit, ex quo luptatum tacimates voluptatum, salutandi delicatissimi eam ea. In sed nullam laboramus appellantur, mei ei omnis dolorem mnesarchum.</p>
                </div>
                    <div className="container">
                        <p>Use Promo Code: <span className="promo">BOH232</span></p>
                        <p className="expire">Expires: Jan 03, 2021</p>
                    </div> 
                </div> );
        }

        return ( <div className="myCoupon">
            {myCoupon}
        </div>);
    }
}

export default SingleNew;