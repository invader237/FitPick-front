import React, { useState } from "react";
import axios from "axios";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import TagSelector from "./TagSelector";

const AddClothingModal = ({ open, onClose, onClothingAdded }) => {
    const [newClothing, setNewClothing] = useState({
        name: "",
        tagIds: [],
    });
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTagSelection = (tags) => {
        setSelectedTags(tags);
        setNewClothing({
            ...newClothing,
            tagIds: tags.map((tag) => tag.tag_id),
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/api/clothing/user/0/add", newClothing);
            if (response.status === 201) {
                onClothingAdded(); 
                setNewClothing({ name: "", tagIds: [] });
                setSelectedTags([]);
                onClose(); 
            }
        } catch (err) {
            console.error("Erreur lors de l'ajout du vêtement :", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <Typography level="h4" component="h2" sx={{ marginBottom: "16px" }}>
                    Ajouter un vêtement
                </Typography>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Nom du vêtement</FormLabel>
                        <Input
                            placeholder="Entrez le nom du vêtement"
                            value={newClothing.name}
                            onChange={(e) =>
                                setNewClothing({ ...newClothing, name: e.target.value })
                            }
                            required
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tags associés</FormLabel>
                        <TagSelector
                            selectedTags={selectedTags}
                            setSelectedTags={handleTagSelection}
                        />
                    </FormControl>

                    <Button
                        onClick={handleSubmit}
                        variant="solid"
                        color="primary"
                        loading={loading}
                        disabled={loading || !newClothing.name}
                    >
                        Ajouter
                    </Button>
                </Stack>
            </ModalDialog>
        </Modal>
    );
};

export default AddClothingModal;
