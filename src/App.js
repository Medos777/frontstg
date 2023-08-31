import React from 'react';
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
import ListCours from "./Cours/ListCours";
import AddCours from "./Cours/AddCours";
import Dashboard from "./Dashbord/Dashboard";

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
              université privée
            </Typography>
          </Toolbar>
        </AppBar>

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

          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/Dashboard" />} />
              <Route path="/etudiants" element={<ListEtudiant />} />
              <Route path="/AddEtudiants" element={<AddEtudiant />} />
              <Route path="/classes" element={<ListClasse />} />
              <Route path="/addclasses" element={<AddClasse />} />
              <Route path="/enseignants" element={<ListEnseignant />} />
              <Route path="/Addenseignants" element={<AddEnseignant />} />
              <Route path="/AddMatieres" element={<AddMatieres />} />
              <Route path="/ListMatieres" element={<ListMatieres />} />
              <Route path="/Cours" element={<ListCours />} />
              <Route path="/AddCours" element={<AddCours />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
  );
};

export default App;
