import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  LinearProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import RegisterPageStyles from "../../styles/authentification/RegisterPageStyles";

// Fonction utilitaire pour calculer la force du mot de passe
const calculatePasswordStrength = (password) => {
  const feedback = [];
  let strength = 0;

  if (password.length >= 8) strength += 25;
  else feedback.push("Au moins 8 caractères");

  if (/[A-Z]/.test(password)) strength += 25;
  else feedback.push("Au moins une lettre majuscule");

  if (/[0-9]/.test(password)) strength += 25;
  else feedback.push("Au moins un chiffre");

  if (/[@$!%*?&]/.test(password)) strength += 25;
  else feedback.push("Au moins un caractère spécial (@, $, !, %, *, ?, &)");

  return { strength, feedback };
};

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const { strength, feedback } = calculatePasswordStrength(value);
    setPasswordStrength(strength);
    setPasswordFeedback(feedback);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (passwordStrength < 100) {
      setError("Le mot de passe n’est pas assez fort.");
      return;
    }

    try {
      // Hachage du mot de passe avec crypto-js
      const hashedPassword = CryptoJS.SHA256(password).toString();

      await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password: hashedPassword, // Envoi du hash SHA256 au backend
        firstName,
        lastName,
      });

      setSuccess("Inscription réussie ! Redirection en cours...");
      setError(""); // Supprimez les erreurs si l'inscription réussit
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Affiche le message du backend
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <Grid container style={RegisterPageStyles.container}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={10} style={RegisterPageStyles.paper}>
          <Typography variant="h4" style={RegisterPageStyles.title}>
            Créez un compte
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Prénom"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nom"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <Box mt={2}>
              <TextField
                fullWidth
                label="Mot de passe"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                style={RegisterPageStyles.progressBar}
                color={passwordStrength === 100 ? "success" : "primary"}
              />
              {passwordFeedback.length > 0 && (
                <Box style={RegisterPageStyles.feedbackBox}>
                  {passwordFeedback.map((feedback, index) => (
                    <Typography
                      key={index}
                      style={RegisterPageStyles.feedbackText}
                    >
                      <CancelIcon style={RegisterPageStyles.feedbackIcon} />
                      {feedback}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
            <TextField
              fullWidth
              label="Confirmer le mot de passe"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              style={RegisterPageStyles.submitButton}
              fullWidth
            >
              S'inscrire
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Typography>
              Vous avez déjà un compte ?{" "}
              <Link to="/login" style={RegisterPageStyles.link}>
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
