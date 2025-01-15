import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import InventoryItem from "../components/Inventory/InventoryItem";
import OutfitDetailsModal from "../components/OutfitInventory/OutfitDetailsModal";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
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
          localStorage.setItem("locationStatus", "accepted"); // Enregistrer que l'accès a été accepté
          setShowPopup(false);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            console.warn(
              "Erreur de géolocalisation, l'utilisateur a refusé l'accès."
            );
            localStorage.setItem("locationStatus", "refused"); // Enregistrer que l'accès a été refusé
            setShowPopup(true); // Afficher la popup si l'accès est refusé
          } else {
            console.warn(
              "Erreur de géolocalisation, utilisation des coordonnées par défaut.",
              err
            );
            getWeatherData(49.1191, 6.1727); // Coordonnées par défaut
          }
        }
      );
    } else {
      console.warn("Géolocalisation non prise en charge.");
      getWeatherData(49.1191, 6.1727); // Coordonnées par défaut
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

  const handlePopupClose = () => {
    setShowPopup(false);
    localStorage.setItem("locationStatus", "refused"); // Enregistrer que l'utilisateur a refusé
    getWeatherData(49.1191, 6.1727); // Afficher la météo par défaut
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        gap: "24px",
      }}
    >
      {loading ? (
        <Typography level="h4">Chargement des données...</Typography>
      ) : weather ? (
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <Typography level="h2" sx={{ marginBottom: "8px", color: "#ffffff" }}>
            Météo actuelle
          </Typography>
          <Typography
            level="h1"
            sx={{ fontWeight: "bold", color: "#ffffff", fontSize: "5rem" }}
          >
            {Math.round(weather.temperature)}°C
          </Typography>
        </Box>
      ) : (
        <Typography level="h4">Pas de données disponibles.</Typography>
      )}

      {recommendation && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <InventoryItem
            key={recommendation.id}
            itemId={recommendation.id}
            title={recommendation.name}
            imageSrc={recommendation.clothingList.map((item) => item.cloImageUrl)}
            clothingNames={recommendation.clothingList.map((item) => item.cloLib)}
            onClick={() => handleOpenDetails(recommendation)}
            type="outfit"
          />
        </Box>
      )}

      {showPopup && (
        <Modal open={showPopup} onClose={handlePopupClose}>
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
