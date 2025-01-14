import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import InventoryItem from "../components/Inventory/InventoryItem";
import OutfitDetailsModal from "../components/OutfitInventory/OutfitDetailsModal";
import "../styles/WeatherPage/WeatherPage.css";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        },
        (err) => {
          console.warn(
            "Erreur de géolocalisation, utilisation des coordonnées par défaut.",
            err
          );
          setShowPopup(true);
          getWeatherData(49.1191, 6.1727); // Coordonnées par défaut
        }
      );
    } else {
      console.warn("Géolocalisation non prise en charge.");
      setShowPopup(true);
      getWeatherData(49.1191, 6.1727);
    }
  };

  const getWeatherData = async (lat, lon) => {
    try {
      const weatherResponse = await axiosInstance.get(
        `/api/weather/display?lat=${lat}&lon=${lon}`
      );
      setWeather(weatherResponse.data);
      fetchRecommendation();
    } catch (err) {
      console.error("Erreur lors de la récupération des données météo :", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendation = async () => {
    try {
      const recoResponse = await axiosInstance.get("/api/reco");
      setRecommendation(recoResponse.data);
    } catch (err) {
      console.error("Erreur lors de la récupération de la recommandation :", err);
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

  const handleOpenDetails = (outfit) => {
    setSelectedOutfit(outfit);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOutfit(null);
  };

  return (
    <div className={`weather-container ${getWeatherClass()}`}>
      {loading ? (
        <p>Chargement des données...</p>
      ) : weather ? (
        <div className="weather-info">
          <h1>Météo actuelle</h1>
          <h2>{Math.round(weather.temperature)}°C</h2>
        </div>
      ) : (
        <p>Pas de données disponibles.</p>
      )}

      {recommendation && (
        <div className="recommendation-details">
          <h2>Recommandation</h2>
          <div className="recommendation-items">
            <InventoryItem
              key={recommendation.id}
              itemId={recommendation.id}
              title={recommendation.name}
              imageSrc={recommendation.clothingList.map((item) => item.cloImageUrl)}
              clothingNames={recommendation.clothingList.map((item) => item.cloLib)}
              onClick={() => handleOpenDetails(recommendation)}
              type="outfit"
            />
          </div>
        </div>
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

      {selectedOutfit && (
        <OutfitDetailsModal
          open={openModal}
          onClose={handleCloseModal}
          outfitReco={selectedOutfit}
        />
      )}
    </div>
  );
};

export default WeatherPage;
