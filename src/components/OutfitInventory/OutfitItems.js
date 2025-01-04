import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

const OutfitItem = ({ outfit, onDelete, onClick }) => {
    return (
        <Card
            variant="outlined"
            onClick={() => onClick(outfit.fitId)}
            sx={{
                width: 250,
                margin: "16px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 },
            }}
        >
            <CardOverflow>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                        padding: "16px",
                        color: "#007BFF",
                    }}
                >
                    {outfit.fitLib}
                </Typography>
            </CardOverflow>
            <CardContent>
                <Typography textAlign="center">
                    Contient {outfit.clothes.length} vêtements
                </Typography>
                <Button
                    color="danger"
                    variant="outlined"
                    sx={{
                        marginTop: "16px",
                        textTransform: "none",
                    }}
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche l'événement de clic sur la carte
                        onDelete(outfit.fitId);
                    }}
                >
                    Supprimer
                </Button>
            </CardContent>
        </Card>
    );
};

OutfitItem.propTypes = {
    outfit: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default OutfitItem;
