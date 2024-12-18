import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      localStorage.setItem('authToken', response.data.token);

      setSuccess('Connexion réussie ! Redirection en cours...');
      setError('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Email ou mot de passe incorrect');
      setSuccess('');
      console.error('Erreur de connexion', err);
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
              Connexion
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
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
                Se connecter
              </Button>
            </Box>
          </form>
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" style={{ marginBottom: '1rem' }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Mot de passe oublié ?
              </Link>
            </Typography>
            <Typography variant="body2">
              Pas de compte ?{' '}
              <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Inscrivez-vous
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
