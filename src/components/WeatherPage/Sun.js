import React, { useState, useEffect } from 'react';
import '../../styles/WeatherPage/Sun.css';

const Sun = () => {
    const [position, setPosition] = useState({ x: '0vw', y: '0vh' });
    const [animationClass] = useState('');

    useEffect(() => {
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            const containerWidth = mainContainer.getBoundingClientRect().width;
            const randomX = Math.random() * containerWidth;
            const randomY = Math.random() * 30 + 10;
            setPosition({ x: `${randomX}px`, y: `${randomY}vh` });
        }
    }, []);

    return (
        <div className={`cloud ${animationClass}`} style={{ left: position.x, top: position.y, width: '200px', height: '200px' }}>
            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%">
                <circle cx="50%" cy="50%" r="40%" fill="yellow" />
            </svg>
        </div>
    );
};

export default Sun;
