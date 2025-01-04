import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { getAllTags } from "../../utils/api";

const TagSelector = ({ selectedTags, setSelectedTags, tagType = "generic" }) => {
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getAllTags(tagType);
                setAllTags(response || []);
            } catch (err) {
                console.error("Erreur lors du chargement des tags :", err);
                setError("Impossible de charger les tags.");
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, [tagType]);

    return (
        <Autocomplete
            multiple
            options={allTags}
            getOptionLabel={(option) => option.tagLib || ""}
            value={selectedTags}
            onChange={(event, newValue) => setSelectedTags(newValue)}
            isOptionEqualToValue={(option, value) => option.tagId === value.tagId}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Tags"
                    placeholder="Ajouter des tags"
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default TagSelector;
