import React, { Component } from "react";
import axios from "axios";
import "./Weather.css";

let positionValues = "";

// State weatherData keeps the weather based on latitude and longitud
class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: [],
    };
  }

  // Hit the weatherbit api getting current weather based on latitude and longitud
  // Updates state
  getWeather = async (position) => {
    positionValues =
      "&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;

    const urlGetWeather = `https://api.weatherbit.io/v2.0/current?key=01e9a26df1fc490e8b1e893f0486d97b${positionValues}`;
    const response = await axios.get(urlGetWeather);
    this.setState({
      weatherData: response.data.data,
    });
  };

  // Calls the geolocation features of the browser
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Waits until the component is mounted to get the weather data. It only runs one time when loading the page.
  componentDidMount() {
    this.getLocation();
  }

  // Render the temperature in the header of the page
  // It includes current temperature, icon and description of current conditions, city and country
  render() {
    let weatherWebData = [];
    weatherWebData = this.state.weatherData.map((weatherInstance, index) => {
      const iconName = `/icons/${weatherInstance.weather.icon}.png`;
      return (
        <div id="weather-container" key={index}>
          <div id="weather-temperature-container">
            <img id="weather-icon" alt="" src={iconName} />
            <p>{weatherInstance.app_temp}º</p>
          </div>
          <p className="weather-text">{weatherInstance.weather.description}</p>
          <p className="weather-text">
            {weatherInstance.city_name}, {weatherInstance.country_code}
          </p>
        </div>
      );
    });

    return <div>{weatherWebData}</div>;
  }
}

export default Weather;
