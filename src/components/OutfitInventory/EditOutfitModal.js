import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TagSelector from "./TagSelector";
import { updateOutfit } from "../../utils/api";

const EditOutfitModal = ({ open, onClose, outfit, onSave }) => {
    const [name, setName] = useState(outfit.fitLib || "");
    const [selectedClothingIds, setSelectedClothingIds] = useState(
        outfit.clothes.map((clothing) => clothing.cloId)
    );
    const [error, setError] = useState(null);

    const handleSave = async () => {
        if (!name) {
            setError("Le nom de la tenue est requis.");
            return;
        }

        try {
            await updateOutfit(outfit.fitId, { name, clothingIds: selectedClothingIds });
            onSave(); // Callback pour rafraîchir la liste des tenues
            onClose();
        } catch (err) {
            console.error("Erreur lors de la modification de la tenue :", err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: "90%",
                    maxWidth: 400,
                    margin: "10% auto",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    padding: 3,
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    Modifier la tenue
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                        {error}
                    </Typography>
                )}
                <TextField
                    fullWidth
                    label="Nom de la tenue"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TagSelector
                    selectedTags={selectedClothingIds}
                    setSelectedTags={setSelectedClothingIds}
                    tagType="clothing" // Paramètre pour différencier les tags (si nécessaire)
                />
                <Button variant="contained" fullWidth onClick={handleSave}>
                    Sauvegarder
                </Button>
            </Box>
        </Modal>
    );
};

export default EditOutfitModal;
