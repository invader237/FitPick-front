import React, { useState, useEffect } from "react";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";
import ClothingItem from "../components/ClothingInventory/ClothingItem";
import AddClothingModal from "../components/ClothingInventory/AddClothingModal";
import ClothingDetailsModal from "../components/ClothingInventory/ClothingDetailsModal";
import { getClothingItems } from "../utils/api";

const InventoryPages = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedClothing, setSelectedClothing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClothingItems();
    }, []);

    const fetchClothingItems = async () => {
        setLoading(true);
        try {
            const items = await getClothingItems();
            setClothingItems(items);
        } catch (err) {
            console.error("Erreur :", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetails = (id) => {
        const clothing = clothingItems.find((item) => item.cloId === id);
        setSelectedClothing(clothing);
    };

    return (
        <Box sx={{ padding: "16px",position: "relative", minHeight: "100vh" }}>
            <Typography level="h4">Votre inventaire</Typography>
            {loading ? (
                <Typography>Chargement...</Typography>
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    {clothingItems.map((item) => (
                        <ClothingItem
                            key={item.cloId}
                            clothingId={item.cloId}
                            title={item.cloLib}
                            imageSrc={item.cloImageUrl}
                            onClick={handleOpenDetails}
                        />
                    ))}
                </Box>
            )}
            <SpeedDial
                ariaLabel="Actions d'inventaire"
                sx={{ 
                    position: "absolute", // Position relative au conteneur parent
                    bottom: "80px", // Décalage depuis le bord bas du conteneur
                    transform: "translateY(-50%)", // Ajuste pour un centrage parfait
                    right: "8px", // Décalage depuis le bord droit du conteneur
                    zIndex: 1100 // S'assurer qu'il reste visible
                }}
                icon={<AddIcon />}
                FabProps={{ onClick: () => setOpenAddModal(true) }}
            />
            <AddClothingModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onClothingAdded={fetchClothingItems}
            />
            {selectedClothing && (
                <ClothingDetailsModal
                open={!!selectedClothing}
                onClose={() => setSelectedClothing(null)}
                clothing={selectedClothing}
                onRefresh={() => {
                    // Rafraîchit uniquement les détails du vêtement sélectionné
                    fetchClothingItems(); // Facultatif : si la liste doit aussi être mise à jour
                }}
            />

            )}
        </Box>
    );
};

export default InventoryPages;
