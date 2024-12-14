import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import WeatherPage from '../pages/WeatherPage';
import InventoryPage from '../pages/InventoryPages'; // Import de la page InventoryPage

import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<WeatherPage />} />
        <Route path="/inventory" element={<InventoryPage />} /> {/* Ajout de la route pour InventoryPage */}
      </Routes>
      <NavBar />
    </div>
  );
};

export default Layout;
