import React, { useState, useRef, useEffect } from "react";
import "./Card.css";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import cloud from "../assets/cloud.png";

const Card = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Ranchi");
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef();

  const icons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  useEffect(() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData({
          city: data.name,
          condition : data.weather[0].main,
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          icon: icons[data.weather[0].icon] || clear
        });
        setIsLoading(false);
      })
      .catch((data) => setWeatherData(null));
  }, [city]);

  console.log(weatherData);

  const handleClick = (e) => {
    if (ref.current.value === "") {
      alert("Please enter a city");
    } else {
      setCity(ref.current.value);
    }
  };

  if (isLoading)
    return (
      <div className="box">
        <div className="loading">Loading...</div>
      </div>
    );

  return (
    <div className="container">
      <div className="search">
        <input ref={ref} type="text" placeholder="Enter city" />
        <button className="btn" onClick={handleClick}>
          Search
        </button>
      </div>
      {weatherData !== null ? (
        <>
          <div className="main">
            <img src={weatherData.icon} alt="" />
            <h1 className="temp">{weatherData.temp}°C</h1>
            <h3 className="city">{weatherData.city}</h3>
          </div>
          <div className="footer">
            <div className="left">
              <img src={humidity} alt="" className="image" />
              <div className="foot">
                <h4>{weatherData.humidity + "%"}</h4>
                <p>Humidity</p>
              </div>
            </div>
            <div className="right">
              <img src={wind} alt="" className="image" />
              <div className="foot">
                <h4>{weatherData.wind} Km/hr</h4>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 className="box">Something went wrong</h2>
      )}
    </div>
  );
};

export default Card;
