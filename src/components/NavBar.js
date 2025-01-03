import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Inventory from '@mui/icons-material/Inventory';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [value, setValue] = React.useState(0);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isExtraSmallScreen = useMediaQuery('(max-width:420px)');
    const navigate = useNavigate();

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        const routes = ['/', '/', '/inventory', '/dashboard'];
        navigate(routes[newValue]);
    };

    const navbarItemStyle = {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderRadius: '5rem',
        cursor: 'pointer',
        transition: 'all 0.07s ease-in-out',
    };

    return (
        <Paper
            sx={{
                display: 'flex',
                flex: 1,
                position: 'fixed',
                alignItems: 'center',
                bottom: 0,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 16,
                boxShadow: 9,
                marginBottom: '8px',
                width: 'calc(100% - 16px)',
                maxWidth: '1080px',
                zIndex: 1000,
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
                <BottomNavigationAction sx={navbarItemStyle} label="Accueil" icon={<HomeIcon />} />
                <BottomNavigationAction sx={navbarItemStyle} label="Recherche" icon={<SearchIcon />} />
                <BottomNavigationAction sx={navbarItemStyle} label="Inventaire" icon={<Inventory />} />
                <BottomNavigationAction sx={navbarItemStyle} label="Profil" icon={<Person />} />
            </BottomNavigation>
        </Paper>
    );
};

export default Navbar;
