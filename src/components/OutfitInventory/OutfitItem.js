import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

const OutfitItem = ({ outfit, onClick, onDelete }) => {
    return (
        <Card
            variant="outlined"
            onClick={() => onClick(outfit.fit_id)}
            sx={{
                width: 250,
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
                        src={outfit.image_url || "../assets/outfit-placeholder.png"}
                        alt={outfit.fit_lib || "Unnamed Outfit"}
                        style={{ width: "100%", objectFit: "cover" }}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography textAlign="center">{outfit.fit_lib || "Unnamed Outfit"}</Typography>
            </CardContent>
            <Button
                variant="outlined"
                color="danger"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                sx={{ margin: "8px", alignSelf: "center" }}
            >
                Supprimer
            </Button>
        </Card>
    );
};

OutfitItem.propTypes = {
    outfit: PropTypes.shape({
        fit_id: PropTypes.number.isRequired,
        fit_lib: PropTypes.string,
        image_url: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default OutfitItem;
