import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { deleteClothing, getClothingTags } from "../../utils/api";
import ConfirmationModal from "./ConfirmationModal";
import EditClothingModal from "./EditClothingModal";

const ClothingDetailsModal = ({ open, onClose, clothing, onRefresh }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [tags, setTags] = useState([]);
    const [loadingTags, setLoadingTags] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            if (!clothing?.cloId) {
                console.error("Aucun ID de vêtement fourni. Impossible de récupérer les tags.");
                return;
            }

            try {
                console.log("Récupération des tags pour le vêtement ID :", clothing.cloId);
                setLoadingTags(true);
                const fetchedTags = await getClothingTags(clothing.cloId);
                console.log("Tags récupérés :", fetchedTags);
                setTags(fetchedTags);
            } catch (err) {
                console.error("Erreur lors de la récupération des tags :", err);
            } finally {
                setLoadingTags(false);
            }
        };

        if (open) {
            fetchTags();
        }
    }, [open, clothing]);

    const handleDelete = async () => {
        if (!clothing?.cloId) {
            console.error("Aucun ID de vêtement fourni pour suppression.");
            return;
        }

        try {
            console.log("Suppression du vêtement ID :", clothing.cloId);
            await deleteClothing(clothing.cloId);
            onRefresh(); // Rafraîchit la liste des vêtements dans l'inventaire
            onClose(); // Ferme le modal
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "400px",
                    margin: "auto",
                    marginTop: "10%",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Card sx={{ borderRadius: "16px", overflow: "hidden" }}>
                    <CardMedia
                        component="img"
                        image={clothing?.cloImageUrl || "https://via.placeholder.com/400"}
                        alt={clothing?.cloLib}
                        sx={{
                            height: "250px",
                            objectFit: "contain",
                            backgroundColor: "#f9f9f9",
                            padding: "16px",
                        }}
                    />
                    <IconButton
                        aria-label="Fermer"
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: "16px",
                            top: "16px",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            "&:hover": { backgroundColor: "#fff" },
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: "16px",
                                color: "#333",
                            }}
                        >
                            {clothing?.cloLib || "Détails du vêtement"}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{
                                marginBottom: "16px",
                                textAlign: "center",
                            }}
                        >
                            Tags associés :
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            sx={{
                                flexWrap: "wrap",
                                gap: "8px",
                                padding: "8px",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "8px",
                                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {loadingTags ? (
                                <Typography variant="body2">Chargement des tags...</Typography>
                            ) : tags.length ? (
                                tags.map((tag) => (
                                    <Chip
                                        key={tag.tagId}
                                        label={tag.tagLib}
                                        color="primary"
                                        variant="outlined"
                                        sx={{
                                            fontWeight: "bold",
                                            padding: "4px 8px",
                                        }}
                                    />
                                ))
                            ) : (
                                <Typography variant="body2">Aucun tag</Typography>
                            )}
                        </Stack>
                    </CardContent>
                    <CardActions
                        sx={{
                            justifyContent: "space-around",
                            paddingBottom: "16px",
                            paddingTop: "8px",
                            backgroundColor: "#f9f9f9",
                            borderTop: "1px solid #eee",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenEdit(true)}
                            sx={{
                                textTransform: "none",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                backgroundImage: "linear-gradient(90deg, #007BFF, #0056b3)",
                                "&:hover": {
                                    backgroundImage: "linear-gradient(90deg, #0056b3, #007BFF)",
                                },
                            }}
                        >
                            Modifier
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenDelete(true)}
                            sx={{
                                textTransform: "none",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                            }}
                        >
                            Supprimer
                        </Button>
                    </CardActions>
                </Card>
                <EditClothingModal
                    open={openEdit}
                    onClose={() => {
                        setOpenEdit(false);
                        onClose(); // Ferme également le ClothingDetailsModal après modification
                    }}
                    clothingId={clothing?.cloId}
                    onSave={() => {
                        onRefresh(); // Rafraîchit les données après modification
                        onClose(); // Ferme ClothingDetailsModal après sauvegarde
                    }}
                />
                <ConfirmationModal
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    onConfirm={handleDelete}
                    title="Confirmer la suppression"
                    message="Êtes-vous sûr de vouloir supprimer cet article ?"
                    confirmText="Supprimer"
                    cancelText="Annuler"
                />
            </Box>
        </Modal>
    );
};

export default ClothingDetailsModal;
