// ClothingItem.js
import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";

const ClothingItem = ({
    imageSrc,
    title = "Nom non spécifié",
    clothingId,
    onClick,
    defaultImage = "/assets/default-clothing.png",
}) => {
    return (
        <Card
            variant="outlined"
            onClick={() => onClick(clothingId)}
            sx={{
                width: 150,
                margin: "4px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": { boxShadow: 4 },
            }}
        >
            <CardOverflow>
                <AspectRatio ratio="1">
                    <img
                        src={imageSrc || defaultImage}
                        alt={title}
                        onError={(e) => (e.target.src = defaultImage)}
                        style={{ width: "100%", objectFit: "cover" }}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography>{title}</Typography>
            </CardContent>
        </Card>
    );
};

ClothingItem.propTypes = {
    imageSrc: PropTypes.string,
    title: PropTypes.string,
    clothingId: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    defaultImage: PropTypes.string,
};

export default ClothingItem;
