import React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

import tshirtImage from '../assets/t-shirt.png';
import jeanImage from '../assets/jean-skinny.png';
import sneakersImage from '../assets/baskets.png';

const InventoryPage = () => {
    const clothingItems = [
        { id: 1, name: 'T-Shirt', image: tshirtImage },
        { id: 2, name: 'Pantalon', image: jeanImage },
        { id: 3, name: 'Chaussures', image: sneakersImage },
        { id: 4, name: 'T-Shirt', image: tshirtImage },
        { id: 5, name: 'Pantalon', image: jeanImage },
        { id: 6, name: 'Chaussures', image: sneakersImage },
        { id: 7, name: 'T-Shirt', image: tshirtImage },
        { id: 8, name: 'Pantalon', image: jeanImage },
        { id: 9, name: 'Chaussures', image: sneakersImage },
        { id: 10, name: 'T-Shirt', image: tshirtImage },
        { id: 11, name: 'Pantalon', image: jeanImage },
        { id: 12, name: 'Chaussures', image: sneakersImage },
        { id: 13, name: 'T-Shirt', image: tshirtImage },
        { id: 14, name: 'Pantalon', image: jeanImage },
        { id: 15, name: 'Chaussures', image: sneakersImage },
        { id: 16, name: 'T-Shirt', image: tshirtImage },
        { id: 17, name: 'Pantalon', image: jeanImage },
        { id: 18, name: 'Chaussures', image: sneakersImage },
        { id: 19, name: 'T-Shirt', image: tshirtImage },
        { id: 20, name: 'Pantalon', image: jeanImage },
        { id: 21, name: 'Chaussures', image: sneakersImage },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                padding: 2,
                backgroundColor: '#f9f9f9',
            }}
        >
            {clothingItems.map((item) => (
                <Card
                    key={item.id}
                    sx={{
                        flex: '1 1 calc(50% - 16px)',
                        maxWidth: '200px',
                        height: '250px',
                        borderRadius: 'lg',
                        boxShadow: 'md',
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '@media (min-width: 400px)': {
                            flex: '1 1 calc(33.33% - 16px)',
                        },
                        '@media (min-width: 900px)': {
                            flex: '1 1 calc(25% - 16px)',
                        },
                    }}
                >
                    <CardCover>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{
                                objectFit: 'contain',
                                height: '70%',
                                width: '100%',
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </CardCover>
                    <CardContent
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: '#fff',
                            textAlign: 'center',
                            padding: 1,
                        }}
                    >
                        <Typography level="body2" noWrap>
                            {item.name}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default InventoryPage;