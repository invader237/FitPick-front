import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/authentification/RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard'); // Rediriger vers le tableau de bord
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        email,
        password,
        firstName,
        lastName,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setSuccess('Inscription réussie ! Redirection vers la page de connexion...');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Erreur lors de l\'inscription');
      setSuccess('');
      console.error('Erreur d\'inscription', err);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Inscription</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Prénom</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Nom</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">S'inscrire</button>
      </form>
      <div className="login-link">
        <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;