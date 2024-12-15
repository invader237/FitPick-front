import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Utiliser la config Axios
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

const InventoryPage = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10); // Taille de page
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClothingItems = async () => {
            try {
                const response = await axios.get(`/api/clothing/user/1/page`, {
                    params: { page, size: pageSize },
                });
                setClothingItems(response.data.content); // Assurez-vous que l'API renvoie `.content`
            } catch (err) {
                setError("Erreur lors du chargement des vêtements");
            } finally {
                setLoading(false);
            }
        };
        fetchClothingItems();
    }, [page]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {clothingItems.map((item) => (
                <Card key={item.clo_id} sx={{ maxWidth: 200, textAlign: 'center' }}>
                    <img
                        src={item.image || '/placeholder.png'}
                        alt={item.clo_lib}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <CardContent>
                        <Typography level="body2">{item.clo_lib}</Typography>
                        {item.tags && <Typography level="body3">Tags: {item.tags.join(', ')}</Typography>}
                    </CardContent>
                </Card>
            ))}
            {/* Pagination */}
            <div style={{ width: '100%', textAlign: 'center' }}>
                <button onClick={() => setPage(Math.max(0, page - 1))}>Précédent</button>
                <button onClick={() => setPage(page + 1)}>Suivant</button>
            </div>
        </Box>
    );
};

export default InventoryPage;
