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
    clothingNames = [], // Noms des vêtements pour une tenue
}) => {
    return (
        <Card
            variant="outlined"
            onClick={() => onClick(itemId)}
            sx={{
                flex: type === "clothing" ? "1 1 calc(20% - 16px)" : "1 1 calc(28% - 16px)",
                margin: "8px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                maxWidth: "calc(28% - 16px)",
                minHeight: "250px", 
                maxHeight: "765px",
                justifyContent: "space-between", 
                "@media (max-width: 901px)": {
                    flex: type === "clothing" ? "1 1 calc(20% - 16px)" : "1 1 calc(27% - 16px)", 
                    maxWidth: type === "clothing" ? "calc(45% - 16px)" : "calc(45% - 16px)",
                },
                "@media (max-width: 801px)": {
                    flex: type === "clothing" ? "1 1 calc(40% - 16px)" : "1 1 calc(27% - 16px)",
                    maxWidth: type === "clothing" ? "calc(50% - 16px)" : "calc(45% - 16px)",
                },
                "@media (max-width: 601px)": {
                    flex: "1 1 calc(100% - 16px)", 
                    maxWidth: "calc(100% - 16px)",
                },
                "&:hover": { boxShadow: 4 },
            }}
        >
            <CardOverflow>
                <AspectRatio ratio="1">
                    {type === "clothing" ? (
                        // Affichage d'un vêtement
                        <img
                            src={typeof imageSrc === "string" ? imageSrc : defaultImage}
                            alt={title}
                            onError={(e) => (e.target.src = defaultImage)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        // Affichage d'une tenue
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: "0",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {(Array.isArray(imageSrc) ? imageSrc : []).slice(0, 4).map((src, index) => (
                                <div
                                    key={index}
                                    style={{
                                        flex: "1 1 45%",
                                        boxSizing: "border-box",
                                        margin: "0",
                                        height: "50%",
                                    }}
                                >
                                    <img
                                        src={src || defaultImage}
                                        alt={clothingNames[index] || title}
                                        onError={(e) => (e.target.src = defaultImage)}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            ))}
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
