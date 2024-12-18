import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import DeleteClothingModal from "./DeleteClothingModal";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Grid from "@mui/joy/Grid";
import EditClothingModal from "./EditClothingModal";

const ClothingDetailsModal = ({ open, onClose, imageSrc, title, clothingId }) => {
    const [tags, setTags] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const userId = 0; 

    useEffect(() => {
        if (open) {
            fetchTags();
        }
    }, [open]);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8080/api/clothing/user/${userId}/item/${clothingId}/tags`
            );
            setTags(response.data);
            setLoading(false);
        } catch (err) {
            setError("Erreur lors de la récupération des tags.");
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                {/* Titre */}
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        marginBottom: "16px",
                    }}
                >
                    <Typography level="h4" component="h2">
                        Détails du vêtement
                    </Typography>

                    <IconButton onClick={onClose} size="sm">
                        <CloseRoundedIcon />
                    </IconButton>
                </Grid>

                {/* Image */}
                <img
                    src={imageSrc}
                    alt={title}
                    style={{
                        width: "100%",
                        objectFit: "contain",
                        marginBottom: "16px",
                    }}
                />

                {/* Nom */}
                <Typography level="body-md" sx={{ marginBottom: "16px" }}>
                    Nom : <strong>{title}</strong>
                </Typography>

                {/* Liste des tags */}
                <Typography level="body-md" sx={{ marginBottom: "8px" }}>
                    Tags :
                </Typography>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {loading ? (
                        <Typography level="body-sm" sx={{ color: "grey.500" }}>
                            Chargement des tags...
                        </Typography>
                    ) : error ? (
                        <Typography level="body-sm" sx={{ color: "red" }}>
                            {error}
                        </Typography>
                    ) : (
                        tags.length > 0 ? (
                            tags.map((tag, index) => (
                                <Chip key={`${tag.tag_id}-${index}`} label={tag.tag_lib} color="primary" variant="solid"> {tag.tag_lib} </Chip>
                            ))
                        ) : (
                            <Typography level="body-sm" sx={{ color: "grey.500" }}>
                                Aucun tag associé
                            </Typography>
                        )
                    )}
                </div>

                {/* Boutons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Button
                        onClick={handleOpenEdit}
                        variant="solid"
                        color="primary"
                        sx={{
                            marginTop: "16px",
                            width: "48%",
                            boxShadow: 2,
                            borderRadius: "8px",
                            padding: "8px 16px",
                            fontWeight: 'bold',
                        }}
                    >
                        Modifier
                    </Button>
                    <EditClothingModal
                        open={openEdit}
                        onClose={handleCloseEdit}
                        clothingId={clothingId}
                        initialName={title}
                        initialTags={tags}
                        userId={userId}
                        onSave={fetchTags}
                    />
                    <Button
                        onClick={handleDelete}
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
                        <DeleteClothingModal
                            open={openDelete}
                            onClose={handleCloseDelete}
                            clothingId={clothingId}
                            onDelete={onClose}
                        />
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default ClothingDetailsModal;
