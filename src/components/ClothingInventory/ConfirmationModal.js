import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";

const ConfirmationModal = ({ open, onClose, onConfirm, title, message, confirmText, cancelText }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <Typography level="h4" sx={{ marginBottom: "16px" }}>
                    {title}
                </Typography>
                <Typography level="body-md" sx={{ marginBottom: "16px" }}>
                    {message}
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="soft" color="neutral" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button variant="solid" color="danger" onClick={onConfirm}>
                        {confirmText}
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
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
};

export default ConfirmationModal;
