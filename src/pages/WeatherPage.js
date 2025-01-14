import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WeatherPage/WeatherPage.css";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Coordonnées GPS :", latitude, longitude);
          getWeatherData(latitude, longitude);
        },
        (err) => {
          console.warn(
            "Erreur de géolocalisation. Utilisation des coordonnées par défaut :",
            err
          );
          setShowPopup(true);
          // Utilisation des coordonnées de Metz en cas d'erreur
          getWeatherData(49.1191, 6.1727);
        }
      );
    } else {
      console.warn("Géolocalisation non prise en charge. Utilisation des coordonnées par défaut.");
      setShowPopup(true);
      getWeatherData(49.1191, 6.1727);
    }
  };

  const getWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/weather/display?lat=${lat}&lon=${lon}`
      );
      console.log("Données météo reçues :", response.data);
      setWeather(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des données météo :", err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherClass = () => {
    if (!weather || !weather.weather || !weather.weather[0] || !weather.weather[0].main) {
      return ""; 
    }

    switch (weather.weather[0].main.toLowerCase()) {
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

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className={`weather-container ${getWeatherClass()}`}>
      {loading ? (
        <p>Chargement des données...</p>
      ) : weather ? (
        <div className="weather-info">
          <h1>Météo actuelle</h1>
          <h2>{Math.round(weather.temperature)}°C</h2>
          <p>{weather.main || "Condition inconnue"}</p>
        </div>
      ) : (
        <p>Pas de données disponibles.</p>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Activer la localisation</h2>
            <p>
              Nous n'avons pas pu accéder à votre position. Pour obtenir les
              données météo locales, veuillez activer l'accès à votre
              localisation dans les paramètres de votre navigateur.
            </p>
            <button onClick={handlePopupClose}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
