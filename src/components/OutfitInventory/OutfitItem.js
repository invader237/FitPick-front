import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";

const OutfitItem = ({ outfit, onClick,
    defaultImage = "/assets/default-clothing.png",
    }) => {
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
                        alt={outfit.fit_lib}
                        onError={(e) => (e.target.src = defaultImage)}
                        style={{ width: "100%", objectFit: "cover" }}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography textAlign="center">
                    {outfit.fit_lib}
                </Typography>
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
