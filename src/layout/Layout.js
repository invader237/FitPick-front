import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Pages
import WeatherPage from '../pages/WeatherPage';
import ProfilePage from '../pages/ProfilPage';
import LoginPage from '../pages/Authentification/LoginPage';
import RegisterPage from '../pages/Authentification/RegisterPage';
import ForgotPasswordPage from '../pages/Authentification/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Authentification/ResetPasswordPage';

// Composants
import NavBar from '../components/NavBar';

const Layout = () => {
  const location = useLocation();

  // Liste des routes d'authentification
  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

  // Vérifie si la route actuelle fait partie des routes d'authentification
  const isAuthRoute = authRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="main-container">
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Routes principales */}
        <Route path="/" element={<WeatherPage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>

      {/* Affiche la Navbar uniquement si ce n'est pas une route d'authentification */}
      {!isAuthRoute && <NavBar />}
    </div>
  );
};

export default Layout;
