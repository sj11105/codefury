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

      const weatherCondition = data.weather[0]?.main;
      setBackground(weatherCondition);

      const backgroundImages = {
        'few clouds': 'url(https://cdn.pixabay.com/photo/2014/08/09/15/45/sky-414199_1280.jpg)',
        'haze': 'url(https://www.istockphoto.com/photo/smog-over-noida-delhi-gurgaon-in-the-morning-gm873551900-243947436?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fhaze%2F&utm_term=haze)',
        // Add more conditions for different weather backgrounds if needed
      };
      
      const imgUrl = backgroundImages[weatherCondition?.toLowerCase()] || '';
      document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${imgUrl}`;
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
      <div className="card bg-base-100 shadow-xl w-80 mx-auto mt-10">
        <div className="card-body">
          <h5 className="card-title text-2xl font-bold text-center">Weather</h5>
          <div className="flex flex-col items-center">
            <input
              className="input input-bordered w-full max-w-xs mb-4"
              type="text"
              placeholder="Enter city name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch} className="btn btn-primary w-full max-w-xs">Search</button>
          </div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {weather && (
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">{weather.name}</h2>
              <p>Temperature: <span className="font-semibold">{weather.main.temp}°C</span></p>
              <p>Feels Like: <span className="font-semibold">{weather.main.feels_like}°C</span></p>
              <p>Min Temperature: <span className="font-semibold">{weather.main.temp_min}°C</span></p>
              <p>Max Temperature: <span className="font-semibold">{weather.main.temp_max}°C</span></p>
              <p>Pressure: <span className="font-semibold">{weather.main.pressure} hPa</span></p>
              <p>Humidity: <span className="font-semibold">{weather.main.humidity}%</span></p>
              <p>Wind Speed: <span className="font-semibold">{weather.wind.speed} m/s</span></p>
              <p>Wind Gust: <span className="font-semibold">{weather.wind.gust ? weather.wind.gust + ' m/s' : 'N/A'}</span></p>
              <p>Description: <span className="font-semibold">{weather.weather[0].description}</span></p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
