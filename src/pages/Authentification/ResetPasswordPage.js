import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CssBaseline,
  LinearProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import ResetPasswordPageStyles from "../../styles/authentification/ResetPasswordPageStyles";
import { useSearchParams, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; // Importation de crypto-js

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage("Aucun token fourni. Veuillez vérifier votre lien.");
      setTokenExpired(true);
    }
  }, [token]);

  /**
   * Calcule la force du mot de passe et fournit des retours
   * @param {string} password
   * @returns {number} Force du mot de passe (en pourcentage)
   */
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

    setPasswordFeedback(feedback);
    return strength;
  };

  /**
   * Soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des mots de passe
    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setSuccess(false);
      return;
    }

    if (passwordStrength < 100) {
      setMessage("Le mot de passe n'est pas assez fort.");
      setSuccess(false);
      return;
    }

    try {
      // Hachage du mot de passe avec crypto-js
      const hashedPassword = CryptoJS.SHA256(newPassword).toString();

      const response = await fetch(
        `http://localhost:8080/api/auth/reset-password?token=${token}&newPassword=${encodeURIComponent(
          hashedPassword
        )}`,
        { method: "POST" }
      );
      const result = await response.text();

      if (response.status === 400 && result.includes("expiré")) {
        setMessage("Le lien a expiré ou a déjà été utilisé. Veuillez demander un nouveau lien.");
        setTokenExpired(true);
        setSuccess(false);
      } else if (response.ok) {
        setSuccess(true);
        setMessage("Votre mot de passe a été réinitialisé avec succès !");
      } else {
        setMessage(result || "Une erreur est survenue.");
        setSuccess(false);
      }
    } catch (error) {
      setMessage("Erreur lors de la réinitialisation du mot de passe.");
      setSuccess(false);
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <Container style={ResetPasswordPageStyles.container}>
        <Paper elevation={10} style={ResetPasswordPageStyles.paper}>
          <Box style={ResetPasswordPageStyles.iconBox}>
            <LockResetIcon style={ResetPasswordPageStyles.icon} />
          </Box>
          <Typography variant="h4" style={ResetPasswordPageStyles.title}>
            Réinitialisation du mot de passe
          </Typography>

          {message && (
            <Alert
              severity={success ? "success" : "error"}
              style={ResetPasswordPageStyles.alert}
            >
              {message}
            </Alert>
          )}

          {tokenExpired ? (
            <Button
              href="/forgot-password"
              style={ResetPasswordPageStyles.linkButton}
            >
              Demander un nouveau lien
            </Button>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography style={ResetPasswordPageStyles.description}>
                Veuillez saisir un mot de passe sécurisé.
              </Typography>
              <TextField
                fullWidth
                label="Nouveau mot de passe"
                variant="outlined"
                margin="normal"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordStrength(
                    calculatePasswordStrength(e.target.value)
                  );
                }}
                required
              />
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                style={ResetPasswordPageStyles.progressBar}
                color={passwordStrength === 100 ? "success" : "primary"}
              />
              {passwordFeedback.length > 0 && (
                <Box style={ResetPasswordPageStyles.feedbackBox}>
                  {passwordFeedback.map((feedback, index) => (
                    <Tooltip title="Critère manquant" key={index}>
                      <Typography
                        style={ResetPasswordPageStyles.feedbackText}
                      >
                        {feedback}
                      </Typography>
                    </Tooltip>
                  ))}
                </Box>
              )}
              <TextField
                fullWidth
                label="Confirmer le mot de passe"
                variant="outlined"
                margin="normal"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                style={ResetPasswordPageStyles.submitButton}
                fullWidth
              >
                Réinitialiser le mot de passe
              </Button>
            </form>
          )}

          <Box textAlign="center" mt={2}>
            <Button
              onClick={redirectToLogin}
              style={ResetPasswordPageStyles.linkButton}
            >
              Retourner à la page de connexion
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
