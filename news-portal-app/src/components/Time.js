import React, { Component } from "react";
import "./Time.css";

// State date keeps the current date/time
class Time extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }

  // Update the current date/time state
  thick = () => {
    this.setState({
      date: new Date(),
    });
  }; // End thick

  // Set the timer
  setTimer = () => {
    this.timerID = setInterval(() => this.thick(), 1000);
  }; // End setTimer

  // Executing when unmounting component
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Executing when component is mounted
  componentDidMount() {
    this.setTimer();
  } // End componentDidMount

  render() {
    // Options for formatting date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // Return JSX Elements
    return (
      <div id="time-container">
        <p>{this.state.date.toLocaleTimeString()}</p>
        <p>
          {this.state.date.toLocaleDateString(
            this.state.date.getTimezoneOffset(),
            options
          )}
        </p>
      </div>
    );
  }
}
export default Time;
