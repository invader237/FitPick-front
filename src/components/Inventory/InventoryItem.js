// ClothingItem.js
import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";

const InventoryItem = ({
    imageSrc = "",
    title = "Nom non spécifié",
    itemId,
    onClick,
    defaultImage = "/assets/default-clothing.png",
    type,
    clothingNames = [], // Pour les noms des vêtements qui composent une tenue
}) => {
    return (
        <Card
            variant="outlined"
            onClick={() => onClick(itemId)}
            sx={{
                width: "150px",
                margin: "4px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 },
            }}
        >
            <CardOverflow>
                <AspectRatio ratio="1">
                    {type === "clothing" ? (
                        // Affichage d'un vêtement
                        <img
                            src={imageSrc || defaultImage}
                            alt={title}
                            onError={(e) => (e.target.src = defaultImage)}
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        // Affichage d'une tenue
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
                            {
                                <img
                                    src={imageSrc || defaultImage}
                                    alt={title}
                                    onError={(e) => (e.target.src = defaultImage)}
                                    style={{ width: "100%", objectFit: "cover" }}
                                />
                            }
                            {/*Array(4).fill().map((_, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={imageSrc[index] || defaultImage}
                                        alt={clothingNames[index] || title}
                                        onError={(e) => (e.target.src = defaultImage)}
                                        style={{ width: "100%", objectFit: "cover" }}
                                    />
                                    {clothingNames[index] && (
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "0.7em",
                                            }}
                                        >
                                            {clothingNames[index]}
                                        </Typography>
                                    )}
                                </div>
                            ))*/}
                        </div>
                    )}
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography>{title}</Typography>
            </CardContent>
        </Card>
    );
};

InventoryItem.propTypes = {
    imageSrc: PropTypes.oneOfType([
        PropTypes.string, // Pour un vêtement
        PropTypes.arrayOf(PropTypes.string), // Pour une tenue (jusqu'à 4 images)
    ]).isRequired,
    title: PropTypes.string,
    itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClick: PropTypes.func.isRequired,
    defaultImage: PropTypes.string,
    type: PropTypes.oneOf(["clothing", "outfit"]).isRequired,
    clothingNames: PropTypes.arrayOf(PropTypes.string), // Noms des vêtements pour une tenue
};

export default InventoryItem;
