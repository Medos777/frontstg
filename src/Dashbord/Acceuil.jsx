import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { logout } from '../Login/Login';

export default function Accueil() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(true);
    };

    return (
        <AppBar position="static">
            <Box sx={{ display: 'flex' }}>
                <Box
                    component="nav"
                    sx={{ width: '200px', flexShrink: 0, bgcolor: '#f5f5f5' }}
                >
                    <Box sx={{ padding: '10px' }}>
                        <Button color="inherit" component={Link} to="/etudiants">
                            Etudiants
                        </Button>
                    </Box>

                    <Box sx={{ padding: '10px' }}>
                        <Button color="inherit" component={Link} to="/classes">
                            Classes
                        </Button>
                    </Box>

                    <Box sx={{ padding: '10px' }}>
                        <Button color="inherit" component={Link} to="/enseignants">
                            Enseignant
                        </Button>
                    </Box>

                    <Box sx={{ padding: '10px' }}>
                        <Button color="inherit" component={Link} to="/ListMatieres">
                            Matieres
                        </Button>
                    </Box>
                    <Box sx={{ padding: '10px' }}>
                        <Button color="inherit" component={Link} to="/Cours">
                            Cours
                        </Button>
                    </Box>

                    <Box sx={{ padding: '10px' }}>
                        <Button color="inherit" component={Link} to="/Dashboard">
                            Dashboard
                        </Button>
                    </Box>
                </Box>
                {isLoggedIn ? (
                    <Box sx={{ flexGrow: 1, padding: '10px' }}>
                        // The rest of your page content goes here
                    </Box>
                ) : null}
            </Box>
        </AppBar>
    );
}
