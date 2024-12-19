import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CssBaseline,
  CircularProgress,
  Alert,
  Collapse,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import forgotPasswordStyles from "../../styles/authentification/ForgotPasswordPageStyles";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(""); // "success" ou "error"
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /**
   * Gestion de l'envoi du formulaire de réinitialisation de mot de passe
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de l'email
    if (!email.trim() || !validateEmail(email)) {
      setMessage("Veuillez entrer une adresse e-mail valide.");
      setSeverity("error");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setShowAlert(false); // Cache l'alerte précédente
    try {
      // Appel à l'API
      await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        null,
        { params: { email } }
      );

      // Toujours afficher un message de succès pour préserver la sécurité
      setMessage(
        "Si cette adresse e-mail est associée à un compte, un lien de réinitialisation a été envoyé."
      );
      setSeverity("success");
      setShowAlert(true);
    } catch (error) {
      // Même si une erreur API survient, afficher le message de succès
      console.error("Erreur lors de l'envoi du formulaire : ", error);
      setMessage(
        "Si cette adresse e-mail est associée à un compte, un lien de réinitialisation a été envoyé."
      );
      setSeverity("success");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Valide une adresse email
   * @param {string} email
   * @returns {boolean}
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Retour à la page précédente
   */
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={forgotPasswordStyles.container}>
        <Paper elevation={12} style={forgotPasswordStyles.paper}>
          {/* Bouton Retour */}
          <Box style={forgotPasswordStyles.backButtonBox}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              style={forgotPasswordStyles.backButton}
            >
              Retour
            </Button>
          </Box>

          {/* Icône principale */}
          <Box style={forgotPasswordStyles.iconBox}>
            <MailOutlineIcon style={forgotPasswordStyles.icon} />
          </Box>

          {/* Titre */}
          <Typography variant="h4" style={forgotPasswordStyles.title}>
            Mot de passe oublié
          </Typography>
          <Typography variant="body1" style={forgotPasswordStyles.description}>
            Indiquez votre adresse e-mail. Si celle-ci est associée à un compte,
            vous recevrez un lien sécurisé pour réinitialiser votre mot de passe.
          </Typography>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Adresse e-mail"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={forgotPasswordStyles.textField}
            />
            <Box textAlign="center" marginTop={2}>
              <Button
                type="submit"
                variant="contained"
                style={forgotPasswordStyles.submitButton}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Envoyer"}
              </Button>
            </Box>
          </form>

          {/* Affichage du message (succès ou erreur) */}
          <Collapse in={showAlert}>
            <Box style={forgotPasswordStyles.alertBox}>
              <Alert
                severity={severity}
                onClose={() => setShowAlert(false)}
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                }}
              >
                {message}
              </Alert>
            </Box>
          </Collapse>
        </Paper>
      </Container>
    </>

  );
};

export default ForgotPasswordPage;
