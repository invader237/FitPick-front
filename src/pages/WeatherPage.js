import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles
import '../styles/WeatherPage/WeatherPage.css';

// WeatherPage component
import Cloud from '../components/WeatherPage/Cloud';
import Sun from '../components/WeatherPage/Sun';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/weather/display?lat=49.1191&lon=6.1727");
                setWeatherData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();

    }, []);

    return (
        <div id="WeatherPage-container">
            <h2>Météo</h2>

            {loading && <p>Chargement des données...</p>}

            {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
            <div id="meteo-container">
                <div id="sun-container">
                    <Sun />
                </div>
                <div id="cloud-container">
                    <Cloud key={1} type={""} />
                    {weatherData && (<h1 id="temperature">{weatherData.temperature}°C</h1>)}
                    <Cloud key={2} type={""} />
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;
