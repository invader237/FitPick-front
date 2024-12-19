import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";

import ClothingItem from "../components/ClothingInventory/ClothingItem";
import ClothingDetailsModal from "../components/ClothingInventory/ClothingDetailsModal";
import AddClothingModal from "../components/ClothingInventory/AddClothingModal";

import shirt from "../assets/t-shirt.png";

const InventoryPage = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedClothing, setSelectedClothing] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);

    useEffect(() => {
        fetchClothingItems();
    }, []);

    const fetchClothingItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/clothing/user/0");
            setClothingItems(response.data || []);
        } catch (err) {
            console.error("Erreur lors du chargement des vêtements :", err);
        }
    };

    const handleOpenDetailsModal = (item) => {
        setSelectedClothing(item);
        setOpenDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setSelectedClothing(null);
    };

    return (
        <Box className="inventory-page" sx={{ position: "relative", minHeight: "100vh" }}>
            <Typography level="h2">Votre Inventaire</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "left" }}>
                {clothingItems.map((item) => (
                    <ClothingItem
                        key={item.clo_id}
                        imageSrc={shirt}
                        title={item.clo_lib}
                        clothingId={item.clo_id}
                        onClick={() => handleOpenDetailsModal(item)}
                    />
                ))}
            </Box>

            <SpeedDial
                ariaLabel="Actions d'inventaire"
                sx={{ position: "fixed", bottom: "20px", right: "20px" }}
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
                    open={openDetailsModal}
                    onClose={handleCloseDetailsModal}
                    imageSrc={shirt}
                    title={selectedClothing.clo_lib}
                    clothingId={selectedClothing.clo_id}
                />
            )}
        </Box>
    );
};

export default InventoryPage;
