import React from "react";
import axios from "axios";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

const DeleteClothingModal = ({ open, onClose, clothingId, onDelete }) => {
    const handleDeleteSubmit = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/clothing/user/0/${clothingId}/delete`);
            onDelete(); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                {/* Titre */}
                <Typography level="h4" component="h2" sx={{ marginBottom: "16px" }}>
                    Supprimer un vêtement
                </Typography>

                {/* Message de confirmation */}
                <Typography level="body-sm" sx={{ marginBottom: "16px" }}>
                    Êtes-vous sûr de vouloir supprimer ce vêtement ?
                </Typography>

                {/* Boutons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Button
                        onClick={onClose}
                        variant="solid"
                        color="neutral"
                        sx={{
                            marginTop: "16px",
                            width: "48%",
                            boxShadow: 2,
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontWeight: 'bold',
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleDeleteSubmit}
                        variant="solid"
                        color="danger"
                        sx={{
                            marginTop: "16px",
                            width: "48%",
                            boxShadow: 2,
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontWeight: 'bold',
                        }}
                    >
                        Supprimer
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default DeleteClothingModal;
