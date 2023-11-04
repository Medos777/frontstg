import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
//import Dashboard from "./Dashbord/Dashboard";
import AddFacture from "./Facture/AddFacture";
import Login from "./Login/Login";
import { logout } from "./Login/Login";
import styles from './Login/log.module.css';
import AuthGuard from "./Auth/AuthGuard";
import AddReclamation from "./Reclamation/AddReclamation";
import ReclamationDetail from "./Reclamation/ReclamationDetail";
import EtudiantDetail from "./Etudiant/EtudiantDetail";
import ListReclamation from "./Reclamation/ListReclamation";
import Navbar from "./Navbar/Navbar";
import GetFactureByEtudiant from "./Facture/GetFacutreByEtudiant";
//import GetFactureByEtudiant from "./Facture/GetFacutreByEtudiant";


const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
   // const etudiantId = localStorage.getItem("userId");
    //const etudiantId ="64d7f2af4bee7be3ef8f818e"
        useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        console.log("isLoggedIn:", isLoggedIn);
        if (isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, []);


    return (

        <>
            {isLoggedIn && <Navbar />}            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/etudiants" element={<AuthGuard><ListEtudiant /></AuthGuard>} />
                    <Route path="/addreclamations" element={<AuthGuard><AddReclamation /></AuthGuard>} />
                    <Route path="/reclamations/:id" element={<AuthGuard><ReclamationDetail /></AuthGuard>} />
                    <Route path="/reclamations" element={<AuthGuard><ListReclamation /></AuthGuard>} />
                    <Route path="/AddEtudiants" element={<AuthGuard><AddEtudiant /></AuthGuard>} />
                    <Route path="/classes" element={<AuthGuard><ListClasse /></AuthGuard>} />
                    <Route path="/addclasses" element={<AuthGuard><AddClasse /></AuthGuard>} />
                    <Route path="/enseignants" element={<AuthGuard><ListEnseignant /></AuthGuard>} />
                    <Route path="/Addenseignants" element={<AuthGuard><AddEnseignant /></AuthGuard>} />
                    <Route path="/AddMatieres" element={<AuthGuard><AddMatieres /></AuthGuard>} />
                    <Route path="/ListMatieres" element={<AuthGuard><ListMatieres /></AuthGuard>} />
                    <Route path="/Cours" element={<AuthGuard><ListCours /></AuthGuard>} />
                    <Route path="/AddCours" element={<AuthGuard><AddCours /></AuthGuard>} />
                    <Route path="/Dashboard" element={<Dashboard /> }/>
                    <Route path="/AddFactures" element={<AuthGuard><AddFacture /></AuthGuard>} />
                    <Route path="/Factures" element={<AuthGuard><GetFactureByEtudiant /></AuthGuard>} />
                    <Route path="/etudiants/:id" component={EtudiantDetail} />

                </Routes>
            </div>

        </>
    );

};

export default App;
