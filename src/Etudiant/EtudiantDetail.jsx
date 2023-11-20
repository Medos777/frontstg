import React, { useState, useEffect, useRef } from 'react';
import EtudiantService from '../services/etudiant.service';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const EtudiantDetail = () => {
    const navigate= useNavigate();
    const { etudiantId } = useParams();
    const [etudiant, setEtudiant] = useState(null);

    useEffect(() => {
        const fetchEtudiant = async () => {
            try {
                const response = await EtudiantService.getEtudiantById(etudiantId);
                setEtudiant(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEtudiant();
    }, [etudiantId]);

    return (
        <div className="container">
            {etudiant && (
                <div>
                    <h2>Détails de l'étudiant</h2>
                    <p>Nom: {etudiant.nom}</p>
                    <p>Email: {etudiant.email}</p>
                    <p>Adresse: {etudiant.adresse}</p>
                    <p>Tel: {etudiant.tel}</p>
                    <p>Classe: {etudiant.classe ? etudiant.classe.name : 'Aucune'}</p>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/etudiants')}
                    >
                        Retourner
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EtudiantDetail;
