import React, { useState } from "react";
import axios from "axios";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TagSelector from "./TagSelector"; 

const EditClothingModal = ({ open, onClose, clothingId, initialName, initialTags, userId, onSave }) => {
    const [name, setName] = useState(initialName);
    const [selectedTags, setSelectedTags] = useState(initialTags || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleSave = async () => {
        setLoading(true);
        try {
            const tagIds = selectedTags.map(tag => tag.tag_id);
            const payload = {
                name,
                tagIds,
            };

            await axios.put(
                `http://localhost:8080/api/clothing/user/${userId}/${clothingId}`,
                payload
            );

            setLoading(false);
            onSave(); 
            onClose(); 
        } catch (err) {
            setError("Erreur lors de la mise à jour de l'article.");
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                    }}
                >
                    <Typography level="h4">Modifier le vêtement</Typography>
                    <IconButton onClick={onClose} size="sm">
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>

                {error && (
                    <Typography level="body-sm" sx={{ color: "red", marginBottom: "16px" }}>
                        {error}
                    </Typography>
                )}

                {/* Champ pour modifier le nom */}
                <Typography level="body-md" sx={{ marginBottom: "8px" }}>
                    Nom :
                </Typography>
                <Input
                    placeholder="Nom du vêtement"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: "16px", width: "100%" }}
                />

                {/* Composant TagSelector */}
                <Typography level="body-md" sx={{ marginBottom: "8px" }}>
                    Tags :
                </Typography>
                <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

                {/* Boutons */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        onClick={onClose}
                        variant="soft"
                        color="neutral"
                        sx={{ width: "48%" }}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="solid"
                        color="primary"
                        loading={loading}
                        sx={{ width: "48%" }}
                    >
                        Enregistrer
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default EditClothingModal;
