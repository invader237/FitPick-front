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
            setOutfits(data);
        } catch (err) {
            console.error("Erreur lors de la récupération des tenues :", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOutfit = async (outfitId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tenue ?")) {
            try {
                await deleteOutfit(outfitId);
                setOutfits((prevOutfits) => prevOutfits.filter((outfit) => outfit.id !== outfitId));
                alert("Tenue supprimée avec succès.");
            } catch (err) {
                console.error("Erreur lors de la suppression de la tenue :", err);
                alert("Échec de la suppression de la tenue. Veuillez réessayer.");
            }
            fetchOutfits();
        }
    };

    const handleOpenDetails = (id) => {
        const outfit = outfits.find((o) => o.id === id);
        setSelectedOutfit(outfit);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "space-between",
                alignItems: "stretch",
                width: "100%",
            }}
        >
            {loading ? (
                <Typography sx={{ textAlign: "center" }}>Chargement...</Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                        justifyContent: "left",
                        alignItems: "flex-start",
                        width: "100%",
                        maxWidth: "1200px",
                        "@media (max-width: 768px)": {
                            gap: "12px",
                        },
                    }}
                >
                    {outfits.map((item) => (
                        <InventoryItem
                            key={item.id}
                            itemId={item.id}
                            title={item.name}
                            imageSrc={item.cloImageUrlList}
                            onClick={handleOpenDetails}
                            type="outfit"
                            defaultImage="https://mon-projet-bucket.s3.eu-north-1.amazonaws.com/311737e2-d5ec-452f-a848-6d50c40eb9ba_t-shirt.d8302ac14cf91e917119.png"
                        />
                    ))}
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
                    outfitId={selectedOutfit.id}
                    onEdit={fetchOutfits}
                    onDelete={handleDeleteOutfit}
                    onRefresh={fetchOutfits}
                />
            )}
        </Box>
    );
};

export default OutfitInventory;
