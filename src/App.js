import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthGuard from "./Auth/AuthGuard";
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
import AddFacture from "./Facture/AddFacture";
import Login from "./Login/Login";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/etudiants" element={<AuthGuard><ListEtudiant /></AuthGuard>} />
                <Route path="/AddEtudiants" element={<AuthGuard><AddEtudiant /></AuthGuard>} />
                <Route path="/classes" element={<AuthGuard><ListClasse /></AuthGuard>} />
                <Route path="/addclasses" element={<AuthGuard><AddClasse /></AuthGuard>} />
                <Route path="/enseignants" element={<AuthGuard><ListEnseignant /></AuthGuard>} />
                <Route path="/Addenseignants" element={<AuthGuard><AddEnseignant /></AuthGuard>} />
                <Route path="/AddMatieres" element={<AuthGuard><AddMatieres /></AuthGuard>} />
                <Route path="/ListMatieres" element={<AuthGuard><ListMatieres /></AuthGuard>} />
                <Route path="/Cours" element={<AuthGuard><ListCours /></AuthGuard>} />
                <Route path="/AddCours" element={<AuthGuard><AddCours /></AuthGuard>} />
                <Route path="/Dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="/Factures" element={<AuthGuard><AddFacture /></AuthGuard>} />
            </Routes>
        </Router>
    );
};

export default App;
