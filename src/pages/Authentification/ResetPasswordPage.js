import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Récupère le token depuis l'URL
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setMessage('');
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/auth/reset-password`, {
        token,
        newPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('Mot de passe réinitialisé avec succès.');
      setError('');

      // Rediriger vers la page de connexion après un délai
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Erreur lors de la réinitialisation du mot de passe.');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Définir un nouveau mot de passe</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nouveau mot de passe</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>Confirmer le mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Réinitialiser</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
