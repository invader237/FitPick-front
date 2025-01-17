import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../utils/axiosConfig";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

// Icônes MUI pour le vent et l’humidité
import AirIcon from "@mui/icons-material/Air";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

// Composants personnalisés
import InventoryItem from "../components/Inventory/InventoryItem";
import OutfitDetailsModal from "../components/OutfitInventory/OutfitDetailsModal";

// Import des images de fond (adaptez les chemins à votre structure)
import sunnyImg from "../assets/sunny.jpg";
import rainyImg from "../assets/rainy.jpg";
import snowyImg from "../assets/snowy.jpg";
import cloudyImg from "../assets/cloudy.jpg";

// Import du CSS
import "../styles/WeatherPage/WeatherPage.css";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  useEffect(() => {
    const locationStatus = localStorage.getItem("locationStatus");
    if (locationStatus === "accepted") {
      getUserLocation();
    } else {
      setShowPopup(true);
    }
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
<<<<<<< HEAD
          localStorage.setItem("locationStatus", "accepted");
=======
          localStorage.setItem("locationStatus", "accepted"); // Enregistrer que l'accès a été accepté
>>>>>>> dev
          setShowPopup(false);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
<<<<<<< HEAD
            console.warn("Géolocalisation refusée par l'utilisateur.");
            localStorage.setItem("locationStatus", "refused");
            setShowPopup(true);
=======
            console.warn(
              "Erreur de géolocalisation, l'utilisateur a refusé l'accès."
            );
            localStorage.setItem("locationStatus", "refused"); // Enregistrer que l'accès a été refusé
            setShowPopup(true); // Afficher la popup si l'accès est refusé
>>>>>>> dev
          } else {
            console.warn("Erreur géoloc, utilisation coords par défaut.", err);
            getWeatherData(49.1191, 6.1727);
          }
        }
      );
    } else {
<<<<<<< HEAD
      console.warn("Géolocalisation non supportée.");
      getWeatherData(49.1191, 6.1727);
=======
      console.warn("Géolocalisation non prise en charge.");
      getWeatherData(49.1191, 6.1727); // Coordonnées par défaut
>>>>>>> dev
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
      console.error("Erreur récupération météo :", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendation = async () => {
    try {
      const recoResponse = await axiosInstance.get("/api/reco");
      setRecommendation(recoResponse.data);
    } catch (err) {
      console.error("Erreur récupération reco :", err);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
<<<<<<< HEAD
    localStorage.setItem("locationStatus", "refused");
    getWeatherData(49.1191, 6.1727);
=======
    localStorage.setItem("locationStatus", "refused"); // Enregistrer que l'utilisateur a refusé
    getWeatherData(49.1191, 6.1727); // Afficher la météo par défaut
>>>>>>> dev
  };

  const handleOpenDetails = (outfit) => {
    setSelectedOutfit(outfit);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOutfit(null);
  };

  /**
   * Sélectionne l'image de fond en fonction de la description météo.
   */
  const getBackgroundImage = (description) => {
    if (!description) return cloudyImg;
    const desc = description.toLowerCase();
    if (desc.includes("rain")) return rainyImg;
    if (desc.includes("snow")) return snowyImg;
    if (desc.includes("clear")) return sunnyImg;
    if (desc.includes("cloud")) return cloudyImg;
    return cloudyImg;
  };

  const backgroundImage = useMemo(() => {
    return weather ? getBackgroundImage(weather.description) : cloudyImg;
  }, [weather]);

  return (
    <Box
      className="weather-page-container"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay dégradé animé */}
      <div className="overlay-gradient" />

      {/* Vague décorative en bas */}
      <div className="wave"></div>

      {loading ? (
        <Typography level="h4" className="weather-loading">
          Chargement des données...
        </Typography>
      ) : !weather ? (
        <Typography level="h4" className="weather-no-data">
          Pas de données disponibles.
        </Typography>
      ) : (
        <Box className="weather-info-container">
          <Typography level="h2" className="weather-title">
            Météo actuelle
          </Typography>

          <Typography level="h1" className="weather-temperature">
            {Math.round(weather.temperature)}°C
          </Typography>

          {/* Bloc pour afficher la vitesse du vent et l'humidité */}
          <Box className="weather-stats">
            <Box className="weather-stats-item">
              <AirIcon className="weather-stats-icon" />
              <Typography className="weather-stats-text">
                {weather.windSpeed ? `${weather.windSpeed} km/h` : "N/A"}
              </Typography>
            </Box>
            <Box className="weather-stats-item">
              <InvertColorsIcon className="weather-stats-icon" />
              <Typography className="weather-stats-text">
                {weather.humidity ? `${weather.humidity}%` : "N/A"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {recommendation && (
        <Box className="weather-reco-card">
          <Box className="weather-outfit-preview">
            {recommendation.clothingList?.map((item) => (
              <img
                key={item.id}
                src={item.cloImageUrl}
                alt={item.cloLib}
                className="weather-outfit-img"
              />
            ))}
          </Box>
          <Typography className="weather-reco-title">
            {recommendation.name}
          </Typography>
          <Button
            className="weather-details-btn"
            onClick={() => handleOpenDetails(recommendation)}
          >
            Voir détails
          </Button>
        </Box>
      )}
      {showPopup && (
<<<<<<< HEAD
<Modal open={showPopup} onClose={handlePopupClose}>
=======
        <Modal open={showPopup} onClose={handlePopupClose}>
>>>>>>> dev
          <ModalDialog
            sx={{
              background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "24px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
              margin: "0 auto",
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "16px",
                color: "#333",
              }}
            >
              Activer la localisation
            </Typography>
            <Typography
              sx={{
                marginBottom: "24px",
                fontSize: "1rem",
                color: "#555",
                lineHeight: "1.5",
              }}
            >
              Nous n'avons pas pu accéder à votre position. Pour obtenir les
              données météo locales, veuillez activer l'accès à votre
              localisation dans les paramètres de votre navigateur.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Button
                onClick={() => getUserLocation()}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                width: "100%",
                }}
              >
                Réessayer
              </Button>
              <Button
                onClick={handlePopupClose}
                sx={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: "#e53935",
                  },
                width: "100%",
                }}
              >
                Météo par défaut
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      )}

      {/* Modal pour détails de la tenue */}
      {selectedOutfit && (
        <OutfitDetailsModal
          open={openModal}
          onClose={handleCloseModal}
          outfitReco={selectedOutfit}
        />
      )}
    </Box>
  );
};

export default WeatherPage;
