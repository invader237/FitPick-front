import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import OutfitDetailsModal from "./OutfitDetailsModal";
import AddIcon from "@mui/icons-material/Add";
import SpeedDial from "@mui/material/SpeedDial";
import { getOutfits } from "../../utils/api";

const OutfitInventory = () => {
    const [outfits, setOutfits] = useState([]);
    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOutfits();
    }, []);

    const fetchOutfits = async () => {
        setLoading(true);
        try {
            const data = await getOutfits();
            setOutfits(data);
        } catch (err) {
            console.error("Erreur :", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetails = (id) => {
        const outfit = outfits.find((o) => o.fitId === id);
        setSelectedOutfit(outfit);
    };

    return (
        <Box>
            {loading ? (
                <Typography>Chargement...</Typography>
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    {outfits.map((outfit) => (
                        <Box
                            key={outfit.fitId}
                            onClick={() => handleOpenDetails(outfit.fitId)}
                            sx={{
                                padding: 2,
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                cursor: "pointer",
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <Typography variant="h6">{outfit.fitLib}</Typography>
                            <Typography>{outfit.clothes.length} vêtements</Typography>
                        </Box>
                    ))}
                </Box>
            )}
            <SpeedDial
                ariaLabel="Ajouter une tenue"
                sx={{ position: "fixed", bottom: 40, right: 40 }}
                icon={<AddIcon />}
                onClick={() => console.log("Ajouter une tenue")} // Ajouter la modal correspondante
            />
            {selectedOutfit && (
                <OutfitDetailsModal
                    open={!!selectedOutfit}
                    onClose={() => setSelectedOutfit(null)}
                    outfit={selectedOutfit}
                    onEdit={() => console.log("Modifier la tenue")} // Ajouter l'édition
                    onDelete={() => console.log("Supprimer la tenue")} // Ajouter la suppression
                />
            )}
        </Box>
    );
};

export default OutfitInventory;
