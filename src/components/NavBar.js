import React, { useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Inventory from '@mui/icons-material/Inventory';
import { Person } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isExtraSmallScreen = useMediaQuery('(max-width:420px)');

    const routes = ['/inventory', '/', '/profile'];
    const getValueFromPath = (path) => routes.indexOf(path);

    // Initialiser l'état en fonction de l'URL actuelle
    const [value, setValue] = React.useState(() => {
        return getValueFromPath(location.pathname) || 1; // Par défaut, "Accueil"
    });

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        navigate(routes[newValue]);
    };

    useEffect(() => {
        // Mettre à jour l'état si l'URL change
        const currentValue = getValueFromPath(location.pathname);
        if (currentValue !== -1 && currentValue !== value) {
            setValue(currentValue);
        }
    }, [location.pathname, value]);

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
                <BottomNavigationAction sx={navbarItemStyle} label="Inventaire" icon={<Inventory />} />
                <BottomNavigationAction sx={navbarItemStyle} label="Accueil" icon={<HomeIcon />} />
                <BottomNavigationAction sx={navbarItemStyle} label="Profil" icon={<Person />} />
            </BottomNavigation>
        </Paper>
    );
};

export default Navbar;
