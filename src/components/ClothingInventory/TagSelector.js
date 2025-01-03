import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { getAllTags } from "../../utils/api";

const TagSelector = ({ selectedTags, setSelectedTags }) => {
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const response = await getAllTags();
                setAllTags(response || []);
                setError(null);
            } catch (err) {
                setError("Erreur lors du chargement des tags.");
                console.error("Erreur API :", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, []);
    

    return (
        <div>
            <Autocomplete
                multiple
                options={allTags}
                getOptionLabel={(option) => option.tagLib || ""}
                value={selectedTags}
                onChange={(event, value) => setSelectedTags(value)}
                isOptionEqualToValue={(option, value) => option.tagId === value.tagId}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Tags associés"
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
        </div>
    );
};

export default TagSelector;
