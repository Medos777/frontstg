import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ListEtudiant from './Etudiant/ListEtudiant';
import AddEtudiant from './Etudiant/AddEtudiant';
import ListClasse from './Classe/ListClasse';
import ListEnseignant from './Enseignant/ListEnseignant';
import AddEnseignant from './Enseignant/AddEnseignant';
import AddClasse from "./Classe/AddClasse";
import AddMatieres from "./Matieres/AddMatieres";
import ListMatieres from "./Matieres/ListMatieres";

const App = () => {
  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            <Button color="inherit" component={Link} to="/etudiants">Etudiants</Button>
            <Button color="inherit" component={Link} to="/AddEtudiants">ajout Etudiant</Button>
            <Button color="inherit" component={Link} to="/classes">classes</Button>
            <Button color="inherit" component={Link} to="/addclasses">Ajout classes</Button>
            <Button color="inherit" component={Link} to="/enseignants"> Enseignant</Button>
            <Button color="inherit" component={Link} to="/Addenseignants"> Ajout Enseignant</Button>
            <Button color="inherit" component={Link} to="/AddMatieres"> Ajout matieres</Button>
            <Button color="inherit" component={Link} to="/ListMatieres"> matieres</Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Navigate to="/etudiants" />} />
          <Route path="/etudiants" element={<ListEtudiant />} />
          <Route path="/AddEtudiants" element={<AddEtudiant />} />
          <Route path="/classes" element={<ListClasse />} />
          <Route path="/addclasses" element={<AddClasse />} />
          <Route path="/enseignants" element={<ListEnseignant />} />
          <Route path="/Addenseignants" element={<AddEnseignant />} />
          <Route path="/AddMatieres" element={<AddMatieres />} />
          <Route path="/ListMatieres" element={<ListMatieres />} />
        </Routes>
      </Router>
  );
};

export default App;