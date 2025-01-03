import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";
import TagSelector from "./TagSelector";

// Utilitaires API
import {
  getClothingById,
  getClothingTags,
  updateClothing,
  uploadImage
} from "../../utils/api";

/**
 * Composant EditClothingModal
 * Permet d'éditer un vêtement : nom, tags associés et image.
 *
 * @param {boolean} open - Contrôle l'ouverture de la modal.
 * @param {function} onClose - Fonction appelée pour fermer la modal.
 * @param {number} clothingId - ID du vêtement à éditer.
 * @param {function} onSave - Fonction appelée après la sauvegarde réussie.
 */
const EditClothingModal = ({ open, onClose, clothingId, onSave }) => {
  // ─────────────────────────────────────────────────────────────
  // ÉTATS
  // ─────────────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // CHARGEMENT DES DONNÉES LORS DE L'OUVERTURE DE LA MODAL
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    /**
     * Récupère les informations du vêtement et ses tags associés
     * puis met à jour les états correspondants.
     */
    const fetchData = async () => {
      if (!open || !clothingId) {
        // Nettoyage des champs si on ferme la modal
        setName("");
        setSelectedTags([]);
        setImageFile(null);
        setImagePreview("");
        setError(null);
        return;
      }

      try {
        setLoading(true);
        const clothing = await getClothingById(clothingId);
        const associatedTags = await getClothingTags(clothingId);

        setName(clothing.clo_lib || "");
        setSelectedTags(associatedTags || []);
        setImagePreview(clothing.cloImageUrl || "");
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, clothingId]);

  // ─────────────────────────────────────────────────────────────
  // GESTION DU CHANGEMENT DE FICHIER IMAGE
  // ─────────────────────────────────────────────────────────────
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérification de la taille (ex : 5 Mo max)
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image est trop volumineuse (max : 5 Mo).");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ─────────────────────────────────────────────────────────────
  // GESTION DE LA SAUVEGARDE
  // ─────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!name || selectedTags.length === 0) {
        setError("Le nom et au moins un tag sont requis.");
        return;
    }

    try {
        setLoading(true);
        let imageUrl = imagePreview;

        if (imageFile) {
            imageUrl = await uploadImage(imageFile);
        }

        const updatedData = {
            name,
            tagIds: selectedTags.map((tag) => tag.tagId),
            imageUrl,
        };

        await updateClothing(clothingId, updatedData);

        onSave(); // Appelle la fonction de rafraîchissement après sauvegarde
        onClose(); // Ferme le modal de modification
    } catch (err) {
        console.error("Erreur lors de la sauvegarde des modifications :", err);
        setError("Impossible de sauvegarder les modifications.");
    } finally {
        setLoading(false);
    }
};
  // ─────────────────────────────────────────────────────────────
  // RENDU DU COMPOSANT
  // ─────────────────────────────────────────────────────────────
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "90%",
          maxWidth: 400,
          margin: "10% auto",
          backgroundColor: "#fefefe",
          borderRadius: 2,
          padding: 3,
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)",
          overflow: "hidden"
        }}
      >
        {/* Titre de la modale */}
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            color: "#1976d2",
            fontSize: 20
          }}
        >
          Modifier le vêtement
        </Typography>

        {/* Affichage des erreurs éventuelles */}
        {error && (
          <Typography
            color="error"
            sx={{
              mb: 2,
              textAlign: "center",
              fontSize: 14,
              backgroundColor: "#f8d7da",
              color: "#721c24",
              p: 1,
              borderRadius: 1
            }}
          >
            {error}
          </Typography>
        )}

        {/* Champ texte : Nom du vêtement */}
        <TextField
          fullWidth
          label="Nom du vêtement"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root fieldset": {
              borderRadius: 2
            }
          }}
        />

        {/* Sélecteur de tags */}
        <Typography
          variant="subtitle1"
          sx={{
            mb: 1,
            fontWeight: "bold",
            color: "#555"
          }}
        >
          Tags associés :
        </Typography>
        <TagSelector
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        {/* Sélecteur d'image */}
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            mb: 1,
            fontWeight: "bold",
            color: "#555"
          }}
        >
          Image associée :
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2
          }}
        >
          <Button
            variant="outlined"
            component="label"
            sx={{
              mb: 2,
              textTransform: "none",
              borderRadius: 2,
              fontWeight: "bold",
              borderColor: "#1976d2",
              color: "#1976d2",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#145ea8",
                backgroundColor: "#e3f2fd"
              }
            }}
          >
            Choisir une image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Aperçu de l'image"
              sx={{
                width: "100%",
                maxWidth: 200,
                maxHeight: 200,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)"
                }
              }}
            />
          )}
        </Box>

        {/* Bouton de sauvegarde */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.2,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#1565c0"
            }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sauvegarder"}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditClothingModal;
