import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    Typography,
    Button,
    TextField,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
} from "@mui/material";
import { addOutfit, getClothingItems } from "../../utils/api";

const AddOutfitModal = ({ open, onClose, onOutfitAdded }) => {
    const [name, setName] = useState("");
    const [selectedClothing, setSelectedClothing] = useState([]); // Multi-selection support
    const [availableClothing, setAvailableClothing] = useState([]); // List of all clothing items
    const [error, setError] = useState(null);

    useEffect(() => {
        if (open) {
            const fetchClothingItems = async () => {
                try {
                    const items = await getClothingItems();
                    console.log("Fetched clothing items:", items); // Log pour débogage
                    setAvailableClothing(items || []);
                } catch (err) {
                    console.error("Error fetching clothing items:", err);
                }
            };
            fetchClothingItems();
        }
    }, [open]);



    // Handle clothing selection (multi-select with a maximum of 4 items)
    const handleSelectClothing = (clothing) => {
        setSelectedClothing((prevSelected) => {
            const isSelected = prevSelected.some((item) => item.cloId === clothing.cloId);

            const updatedSelection = isSelected
                ? prevSelected.filter((item) => item.cloId !== clothing.cloId)
                : [...prevSelected, clothing];

            console.log("Updated selection:", updatedSelection); // Log pour déboguer
            return updatedSelection;
        });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!name || selectedClothing.length !== 4) {
            setError("You must select exactly 4 clothing items and provide a name.");
            return;
        }

        try {
            const outfitData = {
                name: name.trim(),
                clothingList: selectedClothing.map((item) => item.cloId), // Assurez-vous que cloId existe
            };

            console.log("Payload being sent:", outfitData); // Vérifiez la charge utile

            await addOutfit(outfitData);
            onOutfitAdded();
            onClose();
        } catch (err) {
            console.error("Error adding outfit:", err.response?.data || err.message);
            setError("An error occurred while adding the outfit.");
        }
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: "85%",
                    maxWidth: "450px",
                    margin: "auto",
                    marginTop: "5%",
                    backgroundColor: "#fefefe",
                    borderRadius: "16px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "center",
                        marginBottom: 3,
                        fontWeight: "700",
                        fontSize: "20px",
                        color: "#007BFF",
                    }}
                >
                    Add an Outfit
                </Typography>

                {error && (
                    <Typography
                        color="error"
                        sx={{
                            marginBottom: 2,
                            textAlign: "center",
                            fontSize: "14px",
                            backgroundColor: "#ffe6e6",
                            color: "#d32f2f",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        {error}
                    </Typography>
                )}

                <TextField
                    fullWidth
                    label="Outfit Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        marginBottom: 3,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                />

                <Typography
                    variant="subtitle1"
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        fontWeight: "bold",
                        color: "#555",
                    }}
                >
                    Select Clothing Items (4 max):
                </Typography>

                <Box
                    sx={{
                        maxHeight: "300px", // Définir une hauteur maximale pour la liste
                        overflowY: "auto",  // Activer le défilement vertical
                        paddingRight: "8px", // Ajouter un padding pour éviter la superposition avec la barre de défilement
                    }}
                >
                    <Grid container spacing={2}>
                        {availableClothing.map((clothing) => (
                            <Grid item xs={6} key={clothing.cloId}> {/* Propriété key ajoutée */}
                                <Card
                                    sx={{
                                        cursor: "pointer",
                                        borderRadius: "12px",
                                        boxShadow: selectedClothing.includes(clothing)
                                            ? "0 0 10px #007BFF"
                                            : "none",
                                        border: selectedClothing.includes(clothing)
                                            ? "2px solid #007BFF"
                                            : "1px solid #ddd",
                                        transition: "transform 0.3s ease-in-out",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                    onClick={() => handleSelectClothing(clothing)}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image={clothing.cloImageUrl || "/placeholder.png"} // Image par défaut
                                            alt={clothing.cloLib || "Unnamed Clothing"} // Texte alternatif par défaut
                                            sx={{
                                                objectFit: "cover",
                                                borderRadius: "12px",
                                            }}
                                        />
                                        <CardContent>
                                            <Typography
                                                textAlign="center"
                                                fontSize="14px"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {clothing.cloLib || "Unnamed Clothing"}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>


                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        marginTop: 3,
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
                    Add Outfit
                </Button>
            </Box>
        </Modal>
    );
};

export default AddOutfitModal;
