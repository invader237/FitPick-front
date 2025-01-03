import { useState, useEffect } from "react";
import { getAllTags } from "../utils/api";

export const useTags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const response = await getAllTags();

                // Vérifier que la réponse contient les données attendues
                if (Array.isArray(response)) {
                    setTags(
                        response.map((tag) => ({
                            tagId: tag.tagId,
                            tagLib: tag.tagLib,
                        }))
                    );
                    setError(null);
                } else {
                    throw new Error("Format inattendu des données reçues.");
                }
            } catch (err) {
                console.error("Erreur lors du chargement des tags :", err);
                setError("Impossible de charger les tags. Réessayez plus tard.");
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    return { tags, loading, error };
};
