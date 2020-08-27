import React, { useState, useEffect } from "react";
import "./Time.css";

const Time = () => {
  // Options for formatting date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // REACT HOOKS: MANAGE THE CURRENT TIME STATE
  const [currentTime, setCurrentTime] = useState(new Date());

  // REACT HOOKS: MANAGE THE INTERVAL
  useEffect(() => {
    let timerID = null;
    timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // End setInterval
    return () => clearInterval(timerID);
  }); // End useEffect

  // Create the HTML element for time
  let arrayTime = [];
  arrayTime.push(currentTime.toLocaleTimeString());
  let arrayWebTime = [];
  arrayWebTime = arrayTime.map((elem, index) => {
    return <p key={index}>{elem}</p>;
  });

  // Create the HTML element for date
  let arrayDate = [];
  arrayDate.push(
    currentTime.toLocaleDateString(currentTime.getTimezoneOffset(), options)
  );
  let arrayWebDate = [];
  arrayWebDate = arrayDate.map((elem, index) => {
    return <p key={index}>{elem}</p>;
  });

  // Return JSX Elements
  return (
    <div id="time-container">
      <p>{arrayWebTime}</p>
      <p>{arrayWebDate}</p>
    </div>
  );
};

export default Time;
