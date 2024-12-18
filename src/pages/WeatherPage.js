import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherPage/WeatherPage.css';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/weather/display?lat=49.1191&lon=6.1727"
      );
      setWeather(response.data);
    } catch (err) {
      setError("Erreur : impossible de récupérer les données météo.");
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherClass = () => {
    if (!weather) return "";
    switch (weather.main.toLowerCase()) {
      case "clear":
        return "sun";
      case "rain":
        return "rain";
      case "snow":
        return "snow";
      case "clouds":
        return "clouds";
      case "storm":
      case "thunderstorm":
        return "storm";
      default:
        return "";
    }
  };

  return (
    <div className={`weather-container ${getWeatherClass()}`}>
      {error && <p className="error">{error}</p>}
      {weather ? (
        <div className="weather-info">
          <h1>Météo actuelle</h1>
          <h2>{Math.round(weather.temperature)}°C</h2>
          <p>{weather.main}</p>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default WeatherPage;
