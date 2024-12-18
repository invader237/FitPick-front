import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
} from '@mui/material';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        'http://localhost:8080/api/auth/register',
        { email, password, firstName, lastName },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccess('Inscription réussie ! Redirection vers la page de connexion...');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError("Erreur lors de l'inscription");
      setSuccess('');
      console.error("Erreur d'inscription", err);
    }
  };

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
        padding: '1rem',
      }}
    >
      <Grid item xs={12} sm={10} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '2rem', borderRadius: '8px' }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" component="h1" style={{ fontWeight: 'bold' }}>
              Inscription
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" style={{ marginBottom: '1rem' }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Prénom"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Nom"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
              />
            </Box>
            <Box textAlign="center" mb={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ textTransform: 'uppercase', width: '100%' }}
              >
                S'inscrire
              </Button>
            </Box>
          </form>
          <Box textAlign="center" mt={3}>
            <Typography variant="body2">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Connectez-vous
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
