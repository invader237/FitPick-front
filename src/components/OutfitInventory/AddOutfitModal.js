import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addOutfit } from "../../utils/api";

const AddOutfitModal = ({ open, onClose, onOutfitAdded }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const handleAddOutfit = async () => {
        if (!name) {
            setError("Le nom de la tenue est requis.");
            return;
        }

        try {
            await addOutfit({ fitLib: name, clothes: [] }); // Envoyer une tenue vide
            onOutfitAdded();
            onClose();
        } catch (err) {
            console.error("Erreur lors de l'ajout de la tenue :", err);
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
                }}
            >
                <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    Ajouter une tenue
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
                <Button variant="contained" fullWidth onClick={handleAddOutfit}>
                    Ajouter
                </Button>
            </Box>
        </Modal>
    );
};

export default AddOutfitModal;
