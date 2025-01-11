import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";
import AddClothingModal from "./AddClothingModal";
import ClothingDetailsModal from "./ClothingDetailsModal";
import { getClothingItems } from "../../utils/api";
import InventoryItem from "../Inventory/InventoryItem";

const ClothingInventory = () => {
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
        <Box>
            {loading ? (
                <Typography>Chargement...</Typography>
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    {clothingItems.map((item) => (
                        <InventoryItem
                            key={item.cloId}
                            itemId={item.cloId}
                            title={item.cloLib}
                            imageSrc={item.cloImageUrl}
                            onClick={handleOpenDetails}
                            type="clothing"
                        />
                    ))}
                </Box>
            )}
            <SpeedDial
                ariaLabel="Ajouter un vêtement"
                sx={{ position: "fixed", bottom: 40, right: 40 }}
                icon={<AddIcon />}
                onClick={() => setOpenAddModal(true)}
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
                    onRefresh={fetchClothingItems}
                />
            )}
        </Box>
    );
};

export default ClothingInventory;
