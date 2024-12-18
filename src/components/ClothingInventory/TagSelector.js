import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/joy/Autocomplete";
import Chip from "@mui/joy/Chip";
import Close from "@mui/icons-material/Close";
import Typography from "@mui/joy/Typography";
import PropTypes from "prop-types";

const TagSelector = ({ selectedTags, setSelectedTags }) => {
    // États pour les tags
    const [tagList, setTagList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/tags/");
            setTagList(response.data || []);
        } catch (err) {
            setError("Erreur lors du chargement des tags");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    if (loading) {
        return <Typography>Chargement...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Autocomplete
            multiple
            options={tagList}
            getOptionLabel={(option) => option.tag_lib || "Inconnu"}
            isOptionEqualToValue={(option, value) => option.tag_id === value.tag_id}
            value={selectedTags}
            onChange={(event, newValue) => setSelectedTags(newValue)}
            renderTags={(tags, getTagProps) =>
                tags.map((item, index) => (
                    <Chip
                        key={item.tag_id}
                        variant="solid"
                        color="primary"
                        endDecorator={
                            <Close
                                fontSize="sm"
                                onClick={() =>
                                    setSelectedTags((prev) =>
                                        prev.filter((tag) => tag.tag_id !== item.tag_id)
                                    )
                                }
                            />
                        }
                        {...getTagProps({ index })}
                    >
                        {item.tag_lib}
                    </Chip>
                ))
            }
            sx={{
                width: "100%",
                marginBottom: "16px",
            }}
        />
    );
};

TagSelector.propTypes = {
    selectedTags: PropTypes.array.isRequired,
    setSelectedTags: PropTypes.func.isRequired,
};

export default TagSelector;
