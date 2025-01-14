import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import CryptoJS from 'crypto-js';

// Import de vos fonctions API
import { getProfile, updateProfile, updateAvatar, changePassword } from '../utils/api';

/* Transition pour la Dialog */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* Popup d'Achievement */
const AchievementPopup = ({ open, message }) => {
  return (
    open && (
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #f9c74f, #f9844a)',
          color: '#fff',
          padding: 3,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          animation: 'fadeIn 0.5s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(-10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <CelebrationIcon fontSize="large" />
        <Box>
          <Typography fontWeight="bold" fontSize="1.2rem">
            Félicitations !
          </Typography>
          <Typography>{message}</Typography>
        </Box>
      </Paper>
    )
  );
};

/* Carte d'achievement */
const AchievementCard = ({ title, description, icon, unlocked }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        textAlign: 'center',
        mb: 2,
        transition: 'all 0.3s ease',
        background: unlocked
          ? 'linear-gradient(135deg, #4caf50, #81c784)'
          : 'linear-gradient(135deg, #ff6f61, #ff8e72)',
        color: '#fff',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0px 6px 14px rgba(0,0,0,0.25)',
        },
      }}
    >
      <Box sx={{ mb: 1, fontSize: '2rem' }}>{icon}</Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {unlocked ? `✅ ${title}` : title}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {description}
      </Typography>
    </Box>
  );
};

/* Section regroupant tous les achievements */
const AchievementsSection = ({ achievements }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #f3f4f6, #fdfdfd)',
        textAlign: 'center',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #e63946, #f77f00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Objectifs
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {achievements.map((ach) => (
        <AchievementCard
          key={ach.id}
          title={ach.name}
          description={ach.description}
          icon={ach.icon}
          unlocked={ach.unlocked}
        />
      ))}
    </Paper>
  );
};

/* Calcul de la force du mot de passe */
const calculatePasswordStrength = (password) => {
  const feedback = [];
  let strength = 0;

  if (password.length >= 8) strength += 25;
  else feedback.push('Au moins 8 caractères');

  if (/[A-Z]/.test(password)) strength += 25;
  else feedback.push('Au moins une lettre majuscule');

  if (/[0-9]/.test(password)) strength += 25;
  else feedback.push('Au moins un chiffre');

  if (/[@$!%*?&]/.test(password)) strength += 25;
  else feedback.push('Au moins un caractère spécial (@, $, !, %, *, ?, &)');

  return { strength, feedback };
};

const ProfilePage = () => {
  const navigate = useNavigate();

  /* État du profil */
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  });
  const [editedProfileData, setEditedProfileData] = useState(null);

  /* État pour le mot de passe */
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [, setPasswordFeedback] = useState([]);
  const [passwordError, setPasswordError] = useState('');

  /* Autres états */
  const [editing, setEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  /* État pour l’achievement */
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: 'Premier Avatar',
      description: 'Ajouter votre premier avatar pour débloquer cet objectif.',
      icon: <CameraAltIcon />,
      unlocked: false,
    },
  ]);

  /* Récupération du profil */
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const decodedToken = jwtDecode(token);
        const email = decodedToken.sub;
        if (!email) {
          navigate('/login');
          return;
        }

        const data = await getProfile(email);
        setProfileData(data);
        setEditedProfileData(data);

        // Marquer l'achievement "Premier Avatar" si déjà présent
        if (data.avatar && !data.avatar.includes('placeholder')) {
          setAchievements((prev) =>
            prev.map((ach) =>
              ach.id === 1 ? { ...ach, unlocked: true } : ach
            )
          );
        }

        localStorage.setItem('userEmail', email);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        navigate('/login');
      }
    };
    fetchProfileData();
  }, [navigate]);

  /* Gestion du input text pour firstName / lastName */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData((prev) => ({ ...prev, [name]: value }));
  };

  /* Gestion du champ mot de passe */
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    if (name === 'newPassword') {
      const { strength, feedback } = calculatePasswordStrength(value);
      setPasswordStrength(strength);
      setPasswordFeedback(feedback);
    }
  };

  /* Toggle edit pour le profil */
  const toggleEditing = () => {
    if (!editing) {
      setEditedProfileData({ ...profileData });
    }
    setEditing(!editing);
  };

  /* Sauvegarde du profil modifié */
  const handleSave = async () => {
    try {
      await updateProfile(profileData.email, {
        firstName: editedProfileData.firstName,
        lastName: editedProfileData.lastName,
      });
      setProfileData({ ...editedProfileData });
      setSnackbarMessage('Mise à jour du profil réussie');
      setSnackbarOpen(true);
      setEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
    }
  };

  /* Déconnexion */
  const handleLogout = () => {
    setDialogOpen(true);
  };
  const confirmLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  /* Gestion du changement d'avatar */
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const previousAvatar = profileData.avatar;
        const avatarUrl = await updateAvatar(profileData.email, file);

        setProfileData((prev) => ({ ...prev, avatar: avatarUrl }));

        // Débloquer achievement si c'était un avatar placeholder
        if (!previousAvatar || previousAvatar.includes('placeholder')) {
          setAchievements((prev) =>
            prev.map((ach) =>
              ach.id === 1 ? { ...ach, unlocked: true } : ach
            )
          );
          setAchievementUnlocked(true);
          setTimeout(() => setAchievementUnlocked(false), 5000);
        }

        setSnackbarMessage('Avatar mis à jour avec succès');
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'avatar :", error);
      }
    }
  };

/* --------------------------------------
   Gestion du changement de mot de passe
----------------------------------------*/
const handlePasswordUpdate = async () => {
  const { currentPassword, newPassword, confirmPassword } = passwordData;

  // Vérifications basiques
  if (!currentPassword || !newPassword || !confirmPassword) {
    setPasswordError('Tous les champs sont requis.');
    return;
  }
  if (newPassword !== confirmPassword) {
    setPasswordError('Les mots de passe ne correspondent pas.');
    return;
  }
  if (passwordStrength < 100) {
    setPasswordError("Le mot de passe n'est pas assez fort.");
    return;
  }

  // Hash
  const hashedCurrentPassword = CryptoJS.SHA256(currentPassword).toString();
  const hashedNewPassword = CryptoJS.SHA256(newPassword).toString();

  try {
    // On appelle l'API de la même manière que "updateAvatar"
    // Sauf qu'ici, c'est "changePassword"
    await changePassword({
      oldPassword: hashedCurrentPassword,
      newPassword: hashedNewPassword,
    });

    // S'il n'y a pas d'erreur thrown, on considère que c'est un succès
    // On réinitialise les champs
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordError('');

    // On affiche le Snackbar
    setSnackbarMessage('Mot de passe mis à jour avec succès');
    setSnackbarOpen(true);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    // Ici on peut setPasswordError(...) ou un message générique
    setPasswordError('Une erreur est survenue lors de la mise à jour du mot de passe.');
  }
};


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Popup Achievement */}
      <AchievementPopup
        open={achievementUnlocked}
        onClose={() => setAchievementUnlocked(false)}
        message="Achievement débloqué : Premier Avatar !"
      />

      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #232526, #414345)',
          p: 4,
          borderRadius: 2,
          mb: 4,
          textAlign: 'center',
          color: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Bienvenue, {profileData.firstName} !
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          Prêt à personnaliser et sécuriser votre compte ?
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Avatar & Achievements */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff, #f7f7f7)',
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={profileData.avatar}
                alt="Avatar"
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  },
                }}
              >
                <CameraAltIcon />
                <input type="file" hidden onChange={handleAvatarChange} />
              </IconButton>
            </Box>
            <Typography variant="h5">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {profileData.email}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              fullWidth
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </Paper>

          {/* AchievementsSection */}
          <AchievementsSection achievements={achievements} />
        </Grid>

        {/* Infos profil + Mot de passe */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4">Informations du Profil</Typography>
              <Button
                variant={editing ? 'contained' : 'outlined'}
                color="primary"
                startIcon={editing ? <SaveIcon /> : <EditIcon />}
                onClick={editing ? handleSave : toggleEditing}
              >
                {editing ? 'Sauvegarder' : 'Modifier'}
              </Button>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  name="firstName"
                  value={editedProfileData?.firstName || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="lastName"
                  value={editedProfileData?.lastName || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  variant="outlined"
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={3}
            sx={{ mt: 4, p: 4, borderRadius: 3 }}
          >
            <Typography variant="h5">Changer le mot de passe</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mot de passe actuel"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  variant="outlined"
                />
                <LinearProgress variant="determinate" value={passwordStrength} sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirmer le mot de passe"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {passwordError && (
              <Typography color="error" mt={2}>
                {passwordError}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handlePasswordUpdate}
            >
              Mettre à jour le mot de passe
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />

      <Dialog open={dialogOpen} TransitionComponent={Transition}>
        <DialogTitle>Confirmer la déconnexion</DialogTitle>
        <DialogContent>Êtes-vous sûr de vouloir vous déconnecter ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button onClick={confirmLogout} color="error">
            Déconnexion
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
