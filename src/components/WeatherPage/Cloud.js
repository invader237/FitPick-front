import React, { useState, useEffect } from 'react';
import '../../styles/WeatherPage/Cloud.css';

const Cloud = ({ type }) => {
    const [position, setPosition] = useState({ x: '0vw', y: '0vh' });
    const [animationClass, setAnimationClass] = useState('');
    const [cloudColor, setCloudColor] = useState('');

    useEffect(() => {
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            const containerWidth = mainContainer.getBoundingClientRect().width;
            const randomX = Math.random() * containerWidth;
            const randomY = Math.random() * 30 + 10;
            setPosition({ x: `${randomX}px`, y: `${randomY}vh` });
        }

        if (type === 'snow') {
            setCloudColor('#72757e');
        } else if (type === 'rain') {
            setCloudColor('#72757e');
        } else {
            setCloudColor('#ffffff');
        }
    }, [type]);

    return (
        <div className={`cloud ${animationClass}`} style={{ left: position.x, top: position.y, width: '200px', height: '150px' }}>
            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%">
                <rect x="0" y="50%" width="200" height="50%" rx="50" fill={cloudColor} />
                <circle cx="40%" cy="50%" r="25%" fill={cloudColor} />
            </svg>
        </div>
    );
};

export default Cloud;
