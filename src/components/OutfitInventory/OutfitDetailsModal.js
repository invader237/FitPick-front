import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Card from "@mui/material/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Chip from "@mui/material/Chip";
import ConfirmationModal from "./ConfirmationModal";
import CardActions from "@mui/material/CardActions";
import EditOutfitModal from "./EditOutfitModal";
import { getOutfitById, deleteOutfit } from "../../utils/api";

const OutfitDetailsModal = ({ open, onClose, outfitId, onRefresh, outfitReco}) => {
    const [outfitDetails, setOutfitDetails] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    useEffect(() => {
        if (outfitId && !outfitReco) {
            fetchOutfitDetails();
        } else if(outfitReco) {
            setOutfitDetails(outfitReco);
        }
    }, [outfitId]);

    const fetchOutfitDetails = async () => {
        try {
            const details = await getOutfitById(outfitId);
            setOutfitDetails(details);
        } catch (err) {
            console.error("Erreur lors de la récupération des détails de la tenue :", err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteOutfit(outfitId);
            onClose();
            if (typeof onRefresh === "function") {
                onRefresh();
            }
        } catch (err) {
            console.error("Erreur lors de la suppression de la tenue :", err);
        }
    };

    if (!outfitDetails) {
        return null;
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "600px",
                    margin: "auto",
                    marginTop: "5%",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Card
                    sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        position: "relative",
                        paddingTop: "32px",
                    }}
                >
                    <IconButton
                        aria-label="Fermer"
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: "16px",
                            top: "8px",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            "&:hover": { backgroundColor: "#fff" },
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            justifyContent: "center",
                            padding: "16px",
                        }}
                    >
                        {outfitDetails.clothingList.map((clothing) => (
                            <Card
                                key={clothing.cloId}
                                sx={{
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    position: "relative",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    width: "45%",
                                }}
                            >
                                <AspectRatio ratio="1">
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                            height: "100%",
                                            "&:hover .overlay": {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <img
                                            src={clothing.cloImageUrl || "/placeholder.png"}
                                            alt={clothing.cloLib}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <Box
                                            className="overlay"
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                opacity: 0,
                                                transition: "opacity 0.3s ease-in-out",
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: "bold", color: "black", marginBottom: "8px" }}
                                            >
                                                {clothing.cloLib}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: "4px",
                                                    flexWrap: "wrap",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {clothing.tags.map((tag) => (
                                                    <Chip
                                                        key={tag.tagId}
                                                        label={tag.tagLib}
                                                        color="primary"
                                                        variant="outlined"
                                                        sx={{ fontWeight: "bold", padding: "4px 8px" }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                </AspectRatio>
                            </Card>
                        ))}
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            margin: "16px 0",
                            color: "#333",
                        }}
                    >
                        {outfitDetails.name}
                    </Typography>
                    {!outfitReco && (
                    <>
                    <CardActions
                        sx={{
                            display: "flex",
                            padding: "16px",
                            borderTop: "1px solid #eee",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenEditModal(true)}
                            sx={{
                                textTransform: "none",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                width: "100%",
                            }}
                        >
                            Modifier
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenConfirmModal(true)}
                            sx={{
                                textTransform: "none",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                width: "100%",
                            }}
                        >
                            Supprimer
                        </Button>
                    </CardActions>

                    </>
                    )}
                </Card>
                <EditOutfitModal
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    outfitId={outfitId}
                    onOutfitUpdated={onRefresh}
                />

                <ConfirmationModal
                    open={openConfirmModal}
                    onClose={() => setOpenConfirmModal(false)}
                    onConfirm={handleDelete}
                    title="Confirmer la suppression"
                    message="Êtes-vous sûr de vouloir supprimer cette tenue ? Cette action est irréversible."
                    confirmText="Supprimer"
                    cancelText="Annuler"
                />
            </Box>
        </Modal>
    );
};

export default OutfitDetailsModal;
