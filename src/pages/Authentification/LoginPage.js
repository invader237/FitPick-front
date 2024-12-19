import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js"; // Importation de crypto-js

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Collapse,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CircularProgress from "@mui/material/CircularProgress";
import LoginPageStyles from "../../styles/authentification/LoginPageStyles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowAlert(false);
    setLoading(true);

    try {
      // Hachage du mot de passe avec crypto-js
      const hashedPassword = CryptoJS.SHA256(password).toString();

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password: hashedPassword }, // Envoyer le mot de passe hashé
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("authToken", response.data.token);
      setSuccess("Connexion réussie ! Redirection...");
      setShowAlert(true);
      setTimeout(() => navigate("/profil"), 2000);
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container style={LoginPageStyles.container}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper style={LoginPageStyles.paper} elevation={12}>
          <Typography variant="h4" style={LoginPageStyles.title}>
            Connexion
          </Typography>

          <Collapse in={showAlert}>
            {error && (
              <Alert severity="error" style={LoginPageStyles.alert}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" style={LoginPageStyles.alert}>
                {success}
              </Alert>
            )}
          </Collapse>

          <form onSubmit={handleSubmit} style={LoginPageStyles.form}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Mot de passe"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Box>
            <Box textAlign="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                style={LoginPageStyles.button}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Se connecter"}
              </Button>
            </Box>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              <Link to="/forgot-password" style={LoginPageStyles.link}>
                Mot de passe oublié ?
              </Link>
            </Typography>
            <Typography variant="body2">
              Pas de compte ?{" "}
              <Link to="/register" style={LoginPageStyles.link}>
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
