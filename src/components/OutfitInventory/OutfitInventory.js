import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";
import OutfitDetailsModal from "./OutfitDetailsModal";
import AddOutfitModal from "./AddOutfitModal";
import { getAllOutfits, deleteOutfit } from "../../utils/api";
import InventoryItem from "../Inventory/InventoryItem";

const OutfitInventory = () => {
    const [outfits, setOutfits] = useState([]);
    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOutfits();
    }, []);

    const fetchOutfits = async () => {
        setLoading(true);
        try {
            const data = await getAllOutfits();
            console.log("Réponse des tenues reçues de l'API :", data); // Inspectez ici
            setOutfits(data);
        } catch (err) {
            console.error("Erreur lors de la récupération des tenues :", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOutfit = async (outfitId) => {
        if (window.confirm("Are you sure you want to delete this outfit?")) {
            try {
                await deleteOutfit(outfitId);
                setOutfits((prevOutfits) => prevOutfits.filter((outfit) => outfit.fit_id !== outfitId));
                alert("Outfit deleted successfully.");
            } catch (err) {
                console.error("Error deleting outfit:", err);
                alert("Failed to delete outfit. Please try again.");
            }
        }
    };

    const handleOpenDetails = (id) => {
        const outfit = outfits.find((o) => o.fit_id === id);
        setSelectedOutfit(outfit);
    };

    return (
        <Box>
            {loading ? (
                <Typography sx={{ textAlign: "center" }}>Chargement...</Typography>
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    {outfits.map((item) => (
                        <InventoryItem
                            key={item.fit_id}
                            itemId={item.fit_id}
                            title={item.fit_lib}
                            imageSrc={"https://mon-projet-bucket.s3.eu-north-1.amazonaws.com/311737e2-d5ec-452f-a848-6d50c40eb9ba_t-shirt.d8302ac14cf91e917119.png"}
                            onClick={handleOpenDetails}
                            type="outfit"
                            /*clothingNames={item.clothing.map((c) => c.clo_lib)}*/
                        />
                    ))}
                        {/*

                        <OutfitItem
                            key={item.fit_id}
                            outfit={item}
                            onClick={handleOpenDetails}
                            onDelete={() => handleDeleteOutfit(item.fit_id)}
                        />
                    ))} */}
                </Box>
            )}
            <SpeedDial
                ariaLabel="Ajouter une tenue"
                sx={{
                    position: "fixed",
                    bottom: 40,
                    right: 40,
                }}
                icon={<AddIcon />}
                onClick={() => setOpenAddModal(true)}
            />
            <AddOutfitModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onOutfitAdded={fetchOutfits}
            />
            {selectedOutfit && (
                <OutfitDetailsModal
                    open={!!selectedOutfit}
                    onClose={() => setSelectedOutfit(null)}
                    outfitId={selectedOutfit.fit_id}
                    onEdit={fetchOutfits}
                    onDelete={fetchOutfits}
                    onRefresh={fetchOutfits}
                />
            )}
        </Box>
    );
};

export default OutfitInventory;
