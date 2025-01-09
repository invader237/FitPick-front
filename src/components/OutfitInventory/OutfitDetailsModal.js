import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";


const OutfitDetailsModal = ({ open, onClose, outfit, onEdit, onDelete }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: "90%",
                    maxWidth: 400,
                    margin: "10% auto",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    padding: 3,
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                    {outfit.fit_lib}
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 2 }}>
                    {/*outfit.clothes.length()*/} vêtements
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
                    {Array.isArray(outfit.clothes) ? (
                        outfit.clothes.map((clothing, index) => (
                            <Chip label={clothing.cloLib} key={index} />
                        ))
                    ) : (
                        <Typography variant="body2">Aucun vêtement disponible</Typography>
                    )}
                </Stack>
                <Button variant="contained" fullWidth onClick={onEdit} sx={{ mb: 2 }}>
                    Modifier
                </Button>
                <Button variant="outlined" color="error" fullWidth onClick={onDelete}>
                    Supprimer
                </Button>
            </Box>
        </Modal>
    );
};

OutfitDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    outfit: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default OutfitDetailsModal;
