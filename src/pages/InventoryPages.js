import React from "react";
import { Tabs, Tab, TabList, TabPanel } from "@mui/joy";
import ClothingInventory from "../components/ClothingInventory/ClothingInventory";
import OutfitInventory from "../components/OutfitInventory/OutfitInventory";
import "../styles//InventoryPage/InventoryTabs.css"; // Importation du fichier CSS

const InventoryPages = () => {
    return (
        <div className="inventory-container">
            <Tabs defaultValue={0} className="inventory-tabs">
                <TabList className="inventory-tab-list" variant="outlined">
                    <Tab className="inventory-tab">Vêtements</Tab>
                    <Tab className="inventory-tab">Tenues</Tab>
                </TabList>

                <TabPanel value={0}>
                    <ClothingInventory />
                </TabPanel>
                <TabPanel value={1}>
                    <OutfitInventory />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default InventoryPages;
