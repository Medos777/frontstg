import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {logout} from "../Login/Login";
import jwt_decode from "jwt-decode";

const Navbar = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
         setRole(decodedToken.role);
        console.log(role);
    }, []);
    const handleLogout = () => {
        logout();
//        window.location.reload()
       // localStorage.clear()
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="h1">
                    My App
                </Typography>
                {(role === "admin" || role ==="enseignant") && (

                    <Button component={Link} to="/" color="inherit">
                    Stocks
                </Button>
                    )}
                {(role === "admin" || role ==="enseignant" ) && (

                    <Button component={Link} to="/etudiants" color="inherit">
                    Etudiants
                </Button>
                )}
                {(role === "admin" || role ==="enseignant") && (
                <Button component={Link} to="/classes" color="inherit">
                    Classes
                </Button>
                    )}
                {role === "admin" && (
                    <Button component={Link} to="/enseignants" color="inherit">
                    Enseignants
                </Button>
                    )}
                <Button component={Link} to="/ListMatieres" color="inherit">
                    Matieres
                </Button>
                <Button component={Link} to="/Cours" color="inherit">
                    Cours
                </Button>
                <Button component={Link} to="/Dashboard" color="inherit">
                    Dashboard
                </Button>
                <Button component={Link} to="/Factures" color="inherit">
                    Factures
                </Button>
                <Button component={Link} to="/reclamations" color="inherit">
                    Réclamations
                </Button>
                <Button onClick={() => { handleLogout(); window.location.reload(); }} color="error">
                    Logout
                </Button>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
