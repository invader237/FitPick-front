// src/pages/DashboardPage.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérification du token dans le localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Si pas de token, redirection vers la page de login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur votre tableau de bord ! Vous êtes connecté.</p>
    </div>
  );
};

export default DashboardPage;
