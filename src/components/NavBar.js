import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 16, // Décalage du bas
        left: 16, // Décalage gauche
        right: 16, // Décalage droite
        borderRadius: 16, // Arrondi des coins
        boxShadow: 3, // Ombre légère
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          borderRadius: 16, // Garde les coins arrondis pour toute la navbar
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;
