import React from 'react';
import {Route, Routes } from 'react-router-dom';

// Pages
import WeatherPage from '../pages/WeatherPage';

import NavBar from '../components/NavBar';


const Layout = () => {
  return (
    <div className="main-container">
        <Routes>
          <Route path="/" element={<WeatherPage />} />
        </Routes>
        <NavBar />
    </div>
  );
};

export default Layout;
