import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Pages
import WeatherPage from '../pages/WeatherPage';
import LoginPage from '../pages/Authentification/LoginPage';
import RegisterPage from '../pages/Authentification/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import ForgotPasswordPage from '../pages/Authentification/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Authentification/ResetPasswordPage';
import InventoryPage from '../pages/InventoryPages';

// Composants
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div className="main-container">
      {/* Définition des Routes */}
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> 
        <Route path="/" element={<WeatherPage />} />
        <Route path="/inventory" element={<InventoryPage />} />

      </Routes>
      <NavBar />
    </div>
  );
};

export default Layout;
