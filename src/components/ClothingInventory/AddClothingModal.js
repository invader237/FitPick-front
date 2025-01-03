import React, { useState } from "react";
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
import TagSelector from "./TagSelector";
import { addClothing, uploadImage } from "../../utils/api";
import tshirtImage from "../../assets/t-shirt.png";
import jeanImage from "../../assets/jean-skinny.png";

const AddClothingModal = ({ open, onClose, onClothingAdded }) => {
    const [name, setName] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [customFile, setCustomFile] = useState(null);
    const [error, setError] = useState(null);
    const [showDefaultImages, setShowDefaultImages] = useState(true); // État pour gérer l'affichage des images par défaut

    const defaultImages = [
        { label: "T-shirt classique", src: tshirtImage },
        { label: "Jean skinny", src: jeanImage },
    ];

    const handleSelectDefaultImage = (imageSrc) => {
        setSelectedImage(imageSrc);
        setCustomFile(null);
    };

    const handleSelectCustomImage = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setCustomFile(file);
            setSelectedImage(null);
            setShowDefaultImages(false); // Masquer les images par défaut lorsqu'une image est téléversée
        } else {
            setError("Seuls les fichiers d'image sont autorisés.");
        }
    };

    const handleSubmit = async () => {
        if (!name || (!selectedImage && !customFile) || selectedTags.length === 0) {
            setError("Tous les champs sont requis.");
            return;
        }

        try {
            let imageUrl = selectedImage;

            if (selectedImage && !customFile) {
                const response = await fetch(selectedImage);
                const blob = await response.blob();
                const file = new File([blob], `${selectedImage.split('/').pop()}`, { type: blob.type });
                imageUrl = await uploadImage(file);
            }

            if (customFile) {
                imageUrl = await uploadImage(customFile);
            }

            const clothingData = {
                name,
                tagIds: selectedTags.map((tag) => tag.tagId),
                imageUrl,
            };
            await addClothing(clothingData);
            onClothingAdded();
            onClose();
        } catch (err) {
            console.error("Erreur lors de l'ajout :", err);
            setError("Une erreur est survenue lors de l'ajout.");
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
                    Ajouter un vêtement
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
                    label="Nom du vêtement"
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

                <TagSelector
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
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
                    Choisir une image :
                </Typography>

                {showDefaultImages && (
                    <Grid container spacing={2}>
                        {defaultImages.map((img) => (
                            <Grid item xs={6} key={img.label}>
                                <Card
                                    sx={{
                                        cursor: "pointer",
                                        borderRadius: "12px",
                                        boxShadow:
                                            selectedImage === img.src
                                                ? "0 0 10px #007BFF"
                                                : "none",
                                        transition: "transform 0.3s ease-in-out",
                                        "&:hover": { transform: "scale(1.05)" },
                                    }}
                                    onClick={() => handleSelectDefaultImage(img.src)}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image={img.src}
                                            alt={img.label}
                                            sx={{
                                                objectFit: "contain",
                                                borderRadius: "12px",
                                            }}
                                        />
                                        <CardContent>
                                            <Typography
                                                textAlign="center"
                                                fontSize="14px"
                                            >
                                                {img.label}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {!showDefaultImages && (
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            marginTop: 2,
                            textTransform: "none",
                            borderRadius: "8px",
                            color: "#007BFF",
                            borderColor: "#007BFF",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#e3f2fd",
                                borderColor: "#0056b3",
                            },
                        }}
                        onClick={() => setShowDefaultImages(true)} // Réafficher les images par défaut
                    >
                        Afficher les images par défaut
                    </Button>
                )}

                <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    sx={{
                        marginTop: 3,
                        borderRadius: "8px",
                        color: "#007BFF",
                        borderColor: "#007BFF",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#e3f2fd", borderColor: "#0056b3" },
                    }}
                >
                    Téléverser une image
                    <input type="file" hidden accept="image/*" onChange={handleSelectCustomImage} />
                </Button>

                {customFile && (
                    <Box
                        sx={{
                            marginTop: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={URL.createObjectURL(customFile)}
                            alt="Aperçu"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                )}

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
                        "&:hover": { background: "linear-gradient(90deg, #0056b3, #007BFF)" },
                    }}
                    onClick={handleSubmit}
                >
                    Ajouter
                </Button>
            </Box>
        </Modal>
    );
};

export default AddClothingModal;
