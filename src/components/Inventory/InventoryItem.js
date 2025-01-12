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
                width: type === "clothing" ? "150px" : "300px",
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
                            src={typeof imageSrc === "string" ? imageSrc : defaultImage}
                            alt={title}
                            onError={(e) => (e.target.src = defaultImage)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain", // Ajuste pour rendre toute l'image visible
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
                                justifyContent: imageSrc.length === 2 ? "center" : "space-between", 
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {(Array.isArray(imageSrc) ? imageSrc : []).slice(0, 4).map((src, index) => (
                                <div
                                    key={index}
                                    style={{
                                        flex: imageSrc.length === 2 ? "0 0 45%" : "1 1 50%", 
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

                            {/* Remplissage des espaces vides si moins de 4 images */}
                            {Array.from({
                                length: 4 - (imageSrc?.length || 0),
                            }).map((_, idx) => (
                                <div
                                    key={`empty-${idx}`}
                                    style={{
                                        flex: "1 1 50%",
                                        backgroundColor: "#f0f0f0",
                                        margin: "0",
                                        height: "50%", // Ajuste la hauteur pour correspondre aux images existantes
                                    }}
                                ></div>
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
