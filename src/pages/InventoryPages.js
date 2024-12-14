import React from 'react';
import '../styles/InventoryPage.css';
import ClothingItem from '../components/ClothingItem';

const InventoryPage = () => {
    const clothingItems = [
        { id: 1, name: 'T-Shirt', description: 'T-Shirt blanc', image: 'path/to/image1.jpg' },
        { id: 2, name: 'Pantalon', description: 'Jean bleu', image: 'path/to/image2.jpg' },
        { id: 3, name: 'Chaussures', description: 'Sneakers rouges', image: 'path/to/image3.jpg' },
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
