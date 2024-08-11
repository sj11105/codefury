'use client'
import React, { useState } from "react";

function Weather() {
  const [background, setBackground] = useState();
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const apiKey = "b571afaa1cae624ad34071c6b9b3f178";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      
      setWeather(data);
      setError("");
      console.log(data);

      // Use optional chaining to avoid issues if background is undefined
      const weatherCondition = data.weather[0]?.main;
      setBackground(weatherCondition);

      const backgroundImages = {
        'few clouds': 'url(https://cdn.pixabay.com/photo/2014/08/09/15/45/sky-414199_1280.jpg)',
        'haze': 'url(https://www.istockphoto.com/photo/smog-over-noida-delhi-gurgaon-in-the-morning-gm873551900-243947436?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fhaze%2F&utm_term=haze)',
        // Add more conditions for different weather backgrounds if needed
      };
      
      const imgUrl = backgroundImages[weatherCondition?.toLowerCase()] || '';
      document.body.style.backgroundImage = imgUrl;
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchWeatherData();
    }
  };

  return (
    <>
      <div className="card weathercard" style={{ width: "18rem", justifyContent: 'center' }}>
        <div className="card-body">
          <h5 className="card-title center">Weather</h5>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Enter city name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch} className="btn btn-info btnw">Search</button>
          </div>
          {error && <p>{error}</p>}
          {weather && (
            <div className="info">
              <h2>{weather.name}</h2>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Feels Like: {weather.main.feels_like}°C</p>
              <p>Min Temperature: {weather.main.temp_min}°C</p>
              <p>Max Temperature: {weather.main.temp_max}°C</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Wind Gust: {weather.wind.gust ? weather.wind.gust + ' m/s' : 'N/A'}</p>
              <p>Description: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;