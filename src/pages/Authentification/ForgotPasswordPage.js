import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/auth/request-reset-password', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage('Un lien de réinitialisation a été envoyé à votre adresse email.');
      setError('');
    } catch (err) {
      setError('Erreur lors de la demande. Veuillez vérifier votre email.');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Réinitialiser le mot de passe</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Envoyer le lien</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
