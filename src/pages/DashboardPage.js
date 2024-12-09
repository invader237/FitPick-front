import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Rediriger vers la page de connexion si non authentifié
    }
  }, [navigate]);

  const handleLogout = () => {
    // Supprimer le token et rediriger vers la page de connexion
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur votre tableau de bord ! Vous êtes connecté.</p>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default DashboardPage;