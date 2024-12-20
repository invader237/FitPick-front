import React from 'react';

import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Inventory from '@mui/icons-material/Inventory';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar/NavBar.css';

const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:420px)');
  const navigate = useNavigate();

  const handleNavigation = (newValue) => {
    setValue(newValue);
    const routes = ['/', '/', '/inventory', '/dashboard'];
    navigate(routes[newValue]);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: 16,
        boxShadow: 9,
        marginBottom: '8px',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleNavigation}
        showLabels={!isSmallScreen}
        sx={{
          borderRadius: 32,
          width: '100%',
          padding: isExtraSmallScreen ? '0 5px' : '0 16px',
        }}
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} />
        <BottomNavigationAction label="Recherche" icon={<SearchIcon />} />
        <BottomNavigationAction label="Inventaire" icon={<Inventory />} /> 
        <BottomNavigationAction label="Profil" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;
