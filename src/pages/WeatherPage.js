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
          <ModalDialog>
            <Typography level="h4">Activer la localisation</Typography>
            <Typography sx={{ marginBottom: "16px" }}>
              Nous n'avons pas pu accéder à votre position. Pour obtenir les
              données météo locales, veuillez activer l'accès à votre
              localisation dans les paramètres de votre navigateur.
            </Typography>
            <Button onClick={handlePopupClose}>Fermer</Button>
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
