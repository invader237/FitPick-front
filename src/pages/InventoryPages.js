import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabList, TabPanel } from "@mui/joy";
import ClothingInventory from "../components/ClothingInventory/ClothingInventory";
import OutfitInventory from "../components/OutfitInventory/OutfitInventory";
import { tabClasses } from '@mui/joy/Tab';

const InventoryPages = () => {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab) {
            setActiveTab(Number(savedTab));
        }
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        localStorage.setItem("activeTab", newValue);
    };

    return (
        <div className="inventory-container">
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className="inventory-tabs"
                sx={{ bgcolor: 'transparent' }}
            >
                <TabList
                    className="inventory-tab-list"
                    disableUnderline
                    sx={{
                        display: 'flex', // Active le modèle flexible
                        width: 'fit-content', // Ajuste la largeur à la taille du contenu
                        margin: 'auto', // Centre la liste des onglets
                        justifyContent: 'center', // Centre horizontalement les onglets
                        alignItems: 'center', // Centre verticalement les onglets
                        p: 1,
                        gap: 0.5,
                        borderRadius: 'xl',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Ombre pour la liste entière
                        [`& .${tabClasses.root}[aria-selected="true"]`]: {
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Ombre forte pour l'onglet actif
                            borderRadius: 'lg', // Coins arrondis pour l'onglet actif
                        },
                        [`& .${tabClasses.root}[aria-selected="false"]`]: {
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Ombre plus légère pour les onglets inactifs
                            transition: 'box-shadow 0.3s',
                            '&:hover': {
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Ombre renforcée au survol
                            },
                        },
                    }}
                >
                    <Tab className="inventory-tab" disableIndicator>Vêtements</Tab>
                    <Tab className="inventory-tab" disableIndicator>Tenues</Tab>
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
