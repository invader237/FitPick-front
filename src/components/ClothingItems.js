import React from 'react';
import '../styles/ClothingItem/ClothingItem.css';

const ClothingItem = ({ item }) => {
    return (
        <div className="clothing-item">
            <img src={item.image} alt={item.name} className="clothing-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
        </div>
    );
};

export default ClothingItem;
