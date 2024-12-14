import React from 'react';
import '../styles/InventoryPage/InventoryPage.css';
import ClothingItem from '../components/ClothingItems';

import tshirtImage from '../assets/t-shirt.png';
import jeanImage from '../assets/jean-skinny.png';
import sneakersImage from '../assets/baskets.png';


const InventoryPage = () => {
    const clothingItems = [
        { id: 1, name: 'T-Shirt', description: 'T-Shirt blanc', image: tshirtImage },
        { id: 2, name: 'Pantalon', description: 'Jean bleu', image: jeanImage },
        { id: 3, name: 'Chaussures', description: 'Sneakers rouges', image: sneakersImage },
    ];

    return (
        <div className="inventory-page">
            <h2>Inventaire des vêtements</h2>
            <div className="inventory-grid">
                {clothingItems.map(item => (
                    <ClothingItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default InventoryPage;
