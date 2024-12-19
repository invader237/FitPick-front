import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import ClothingDetailsModal from "./ClothingDetailsModal";

const ClothingItem = ({imageSrc, title, clothingId, backgroundColor = "background.level1" }) => {
    const [open, setOpen] = useState(false); 

    return (
        <>
            {/* Carte cliquable */}
            <Card
                variant="outlined"
                onClick={() => setOpen(true)} 
                sx={{
                    width: 150,
                    margin: "4px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": { boxShadow: 4 },
                }}
            >
                {/* Image */}
                <CardOverflow>
                    <AspectRatio ratio="1">
                        <img
                            src={imageSrc}
                            loading="lazy"
                            alt={title}
                            style={{ objectFit: "cover"}}
                        />
                    </AspectRatio>
                </CardOverflow>

                {/* Titre */}
                <CardOverflow variant="soft" sx={{ bgcolor: backgroundColor }}>
                    <Divider inset="context" />
                    <CardContent
                        orientation="horizontal"
                        sx={{
                            justifyContent: "left",
                            padding: "8px 0",
                        }}
                    >
                        <Typography level="title-md" sx={{ fontWeight: "bold", textAlign: "center" }}>
                            {title}
                        </Typography>
                    </CardContent>
                </CardOverflow>
            </Card>

            {/* Modal pour les détails */}
            <ClothingDetailsModal
                open={open}
                onClose={() => setOpen(false)}  
                imageSrc={imageSrc}
                title={title}
                clothingId={clothingId} 
            />
        </>
    );
};

export default ClothingItem;
