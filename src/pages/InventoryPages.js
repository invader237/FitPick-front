import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

const InventoryPage = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClothingItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/api/clothing/user/0`);
                setClothingItems(response.data || []);
            } catch (err) {
                console.error(err);
                setError("Erreur lors du chargement des vêtements");
            } finally {
                setLoading(false);
            }
        };

        fetchClothingItems();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Box className="inventory-page">
            <h2>Votre Inventaire</h2>
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
                        <Card
                            key={item.clo_id}
                            sx={{
                                width: "150px",
                                height: "200px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                textAlign: "center",
                                boxShadow: 2,
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={item.image || "/placeholder.png"}
                                alt={item.clo_lib}
                                style={{
                                    width: "100%",
                                    height: "120px",
                                    objectFit: "cover",
                                }}
                            />
                            <CardContent
                                sx={{
                                    backgroundColor: "#555", // Gris plus clair
                                    color: "#fff",
                                    padding: "10px",
                                    height: "80px",
                                    borderBottomLeftRadius: "8px", // Arrondi en bas à gauche
                                    borderBottomRightRadius: "8px", // Arrondi en bas à droite
                                }}
                            >
                                <Typography level="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                    {item.clo_lib}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div>Aucun vêtement trouvé.</div>
                )}
            </Box>
        </Box>
    );
};

export default InventoryPage;
