import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <Typography level="h4" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <Typography level="body1" sx={{ mb: 2 }}>
                    {message}
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="soft" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button variant="solid" color="danger" onClick={onConfirm}>
                        Confirmer
                    </Button>
                </div>
            </ModalDialog>
        </Modal>
    );
};

ConfirmationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default ConfirmationModal;
