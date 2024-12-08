import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';

// Import CSS (si utilisé)
import '../styles/NavBar/NavBar.css';

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  const isExtraSmallScreen = useMediaQuery('(max-width:420px)');

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
        onChange={(event, newValue) => setValue(newValue)}
        showLabels={!isSmallScreen} 
        sx={{
          borderRadius: 32,
          width: '100%',
          padding: isExtraSmallScreen ? '0 5px' : '0 16px', 
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;
