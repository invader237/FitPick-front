import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Chip,
    Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getClothingItems, updateOutfit, getOutfitById } from "../../utils/api";

const EditOutfitModal = ({ open, onClose, outfitId, onOutfitUpdated }) => {
    const [name, setName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClothing, setSelectedClothing] = useState([]);
    const [availableClothing, setAvailableClothing] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (open && outfitId) {
            const fetchInitialData = async () => {
                try {
                    const outfitDetails = await getOutfitById(outfitId);
                    if (outfitDetails) {
                        setName(outfitDetails.name || "");
                        setSelectedClothing(outfitDetails.clothingList || []);

                        const allClothingItems = await getClothingItems();
                        const unselectedClothing = allClothingItems.filter(
                            (item) => !outfitDetails.clothingList.some((c) => c.cloId === item.cloId)
                        );
                        setAvailableClothing(unselectedClothing);
                    } else {
                        setError("Impossible de récupérer les détails de la tenue.");
                    }
                } catch (err) {
                    console.error("Erreur lors de la récupération des données de la tenue :", err);
                    setError("Erreur lors de la récupération des données de la tenue.");
                }
            };

            fetchInitialData();
        }
    }, [open, outfitId]);

    const handleSelectClothing = (clothing) => {
        if (selectedClothing.length >= 4) {
            setError("Vous ne pouvez sélectionner que jusqu'à 4 vêtements.");
            return;
        }

        setSelectedClothing((prevSelected) => {
            const isSelected = prevSelected.some((item) => item.cloId === clothing.cloId);

            if (!isSelected) {
                setAvailableClothing((prevAvailable) =>
                    prevAvailable.filter((item) => item.cloId !== clothing.cloId)
                );
                return [...prevSelected, clothing];
            }

            return prevSelected;
        });
    };

    const handleRemoveClothing = (cloId) => {
        setSelectedClothing((prevSelected) => {
            const removedItem = prevSelected.find((item) => item.cloId === cloId);

            if (removedItem) {
                setAvailableClothing((prevAvailable) => [...prevAvailable, removedItem]);
            }

            return prevSelected.filter((item) => item.cloId !== cloId);
        });
        setError(null);
    };

    const handleSubmit = async () => {
        if (!name || selectedClothing.length > 4 || selectedClothing.length < 2) {
            setError("Vous devez sélectionner entre 2 et 4 vêtements et fournir un nom.");
            return;
        }

        try {
            const updatedData = {
                name: name.trim(),
                clothingList: selectedClothing.map((item) => item.cloId),
            };

            await updateOutfit(outfitId, updatedData);
            onOutfitUpdated();
            onClose();
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la tenue :", err);
            setError("Une erreur s'est produite lors de la mise à jour de la tenue.");
        }
    };

    const filteredClothing = availableClothing.filter((item) =>
        item.cloLib.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: "85%",
                    maxWidth: "700px",
                    margin: "auto",
                    marginTop: "1.5%",
                    backgroundColor: "#fefefe",
                    borderRadius: "16px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "center",
                        fontWeight: "700",
                        color: "#007BFF",
                    }}
                >
                    Modifier une tenue
                </Typography>

                {error && (
                    <Typography
                        color="error"
                        sx={{
                            textAlign: "center",
                            backgroundColor: "#ffe6e6",
                            color: "#000",
                            padding: 1,
                            borderRadius: "8px",
                        }}
                    >
                        {error}
                    </Typography>
                )}

                <TextField
                    fullWidth
                    label="Nom de la tenue"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                />

                {selectedClothing.length > 0 && (
                    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                        {selectedClothing.map((clothing) => (
                            <Grid item xs={6} sm={4} md={3} key={clothing.cloId}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: "12px",
                                        padding: 1,
                                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                        position: "relative",
                                        "&:hover .tags-overlay": {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={clothing.cloImageUrl || "/placeholder.png"}
                                        alt={clothing.cloLib}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "12px",
                                            marginBottom: 1,
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ textAlign: "center", marginBottom: 1 }}
                                    >
                                        {clothing.cloLib}
                                    </Typography>
                                    <Box
                                        className="tags-overlay"
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            color: "#007BFF",
                                            borderRadius: "12px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            opacity: 0,
                                            transition: "opacity 0.3s",
                                        }}
                                    >
                                        {clothing.tags?.map((tag) => (
                                            <Chip
                                                key={tag.tagId}
                                                label={tag.tagLib}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    color: "#007BFF",
                                                    borderColor: "#007BFF",
                                                    backgroundColor: "transparent",
                                                    margin: 0.5,
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    <IconButton
                                        onClick={() => handleRemoveClothing(clothing.cloId)}
                                        size="small"
                                        sx={{ marginTop: 1, color: "#d32f2f" }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#555" }}
                >
                    Ajouter des vêtements :
                </Typography>
                <TextField
                    fullWidth
                    label="Rechercher un vêtement"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                />
                <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
                    {filteredClothing.map((clothing) => (
                        <ListItem
                            key={clothing.cloId}
                            button
                            onClick={() => handleSelectClothing(clothing)}
                            sx={{
                                backgroundColor: "#f9f9f9",
                                borderRadius: "8px",
                                marginBottom: 1,
                                transition: "background-color 0.3s",
                                "&:hover": { backgroundColor: "#e3f2fd" },
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={clothing.cloImageUrl || "/placeholder.png"}
                                    alt={clothing.cloLib}
                                    sx={{ width: 64, height: 64, borderRadius: "12px" }}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={clothing.cloLib} />
                        </ListItem>
                    ))}
                </List>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        borderRadius: "12px",
                        fontWeight: "bold",
                        background: "linear-gradient(90deg, #007BFF, #0056b3)",
                        color: "#fff",
                        padding: "10px",
                        textTransform: "none",
                        "&:hover": {
                            background: "linear-gradient(90deg, #0056b3, #007BFF)",
                        },
                    }}
                    onClick={handleSubmit}
                >
                    Sauvegarder les modifications
                </Button>
            </Box>
        </Modal>
    );
};

export default EditOutfitModal;
