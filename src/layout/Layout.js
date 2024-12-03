import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import LoginPage from '../pages/Authentification/LoginPage'; // Page de login
import RegisterPage from '../pages/Authentification/RegisterPage'; // Page d'inscription
import DashboardPage from '../pages/Authentification/DashboardPage'; // Page dashboard

// Composants
import NavBar from '../components/NavBar'; // Barre de navigation

const Layout = () => {
  return (
    <div className="main-container">
      
      {/* Définition des Routes */}
      <Routes>
        <Route path="/login" element={<LoginPage />} /> {/* Page de login */}
        <Route path="/register" element={<RegisterPage />} /> {/* Page d'inscription */}
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Page dashboard */}
      </Routes>

      <NavBar />
    </div>
  );
};

export default Layout;