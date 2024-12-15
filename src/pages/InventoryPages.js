import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";

const InventoryPage = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [newClothing, setNewClothing] = useState({ name: "", tagIds: "" });
    const [deleteClothingId, setDeleteClothingId] = useState("");

    // Récupération des vêtements
    useEffect(() => {
        fetchClothingItems();
    }, []);

    const fetchClothingItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/clothing/user/0`);
            setClothingItems(response.data || []);
        } catch (err) {
            setError("Erreur lors du chargement des vêtements");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Soumission du formulaire d'ajout
    const handleAddSubmit = async () => {
        const tagIdArray = newClothing.tagIds
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
            .map(Number);

        try {
            await axios.post(`http://localhost:8080/api/clothing/user/0/add`, {
                name: newClothing.name,
                tagIds: tagIdArray,
            });
            setOpenAddModal(false);
            setNewClothing({ name: "", tagIds: "" });
            fetchClothingItems();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'ajout du vêtement");
        }
    };

    // Suppression d'un vêtement
    const handleDeleteSubmit = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/clothing/user/0/${deleteClothingId}/delete`);
            setOpenDeleteModal(false);
            setDeleteClothingId("");
            fetchClothingItems();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression du vêtement");
        }
    };

    // Actions du bouton SpeedDial
    const actions = [
        { icon: <AddIcon />, name: "Ajouter un vêtement", action: () => setOpenAddModal(true) },
        { icon: <DeleteIcon />, name: "Supprimer un vêtement", action: () => setOpenDeleteModal(true) },
    ];

    return (
        <Box className="inventory-page" sx={{ position: "relative", minHeight: "100vh" }}>
            <h2>Votre Inventaire</h2>

            {/* Grille des vêtements */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {clothingItems.length > 0 ? (
                    clothingItems.map((item) => (
                        <Card key={item.clo_id} sx={{ width: "150px", textAlign: "center", boxShadow: 2 }}>
                            <img
                                src={item.image || "/placeholder.png"}
                                alt={item.clo_lib || "Vêtement"}
                                style={{ width: "100%", height: "120px", objectFit: "cover" }}
                            />
                            <CardContent
                                sx={{ backgroundColor: "#555", color: "#fff", borderRadius: "0 0 8px 8px" }}
                            >
                                <Typography level="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                    {item.clo_lib}
                                </Typography>
                                <Typography level="body3" sx={{ marginTop: "8px", fontSize: "12px" }}>
                                    ID: {item.clo_id}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>Aucun vêtement trouvé.</Typography>
                )}
            </Box>

            {/* Bouton flottant avec SpeedDial */}
            <SpeedDial
                ariaLabel="SpeedDial ajout et suppression de vêtements"
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 999,
                }}
                icon={<AddIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                    />
                ))}
            </SpeedDial>

            {/* Modal pour ajouter un vêtement */}
            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <ModalDialog>
                    <Typography level="h4" component="h2" sx={{ marginBottom: "16px" }}>
                        Ajouter un vêtement
                    </Typography>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Nom du vêtement</FormLabel>
                            <Input
                                placeholder="Entrez le nom du vêtement"
                                value={newClothing.name}
                                onChange={(e) => setNewClothing({ ...newClothing, name: e.target.value })}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>IDs des tags (séparés par des virgules)</FormLabel>
                            <Input
                                placeholder="Ex : 1,2,3"
                                value={newClothing.tagIds}
                                onChange={(e) => setNewClothing({ ...newClothing, tagIds: e.target.value })}
                            />
                        </FormControl>
                        <Button onClick={handleAddSubmit} variant="solid" color="primary">
                            Ajouter
                        </Button>
                    </Stack>
                </ModalDialog>
            </Modal>

            {/* Modal pour supprimer un vêtement */}
            <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ModalDialog>
                    <Typography level="h4" component="h2" sx={{ marginBottom: "16px" }}>
                        Supprimer un vêtement
                    </Typography>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>ID du vêtement</FormLabel>
                            <Input
                                placeholder="Entrez l'ID du vêtement"
                                value={deleteClothingId}
                                onChange={(e) => setDeleteClothingId(e.target.value)}
                                required
                            />
                        </FormControl>
                        <Button onClick={handleDeleteSubmit} variant="solid" color="danger">
                            Supprimer
                        </Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Box>
    );
};

export default InventoryPage;
