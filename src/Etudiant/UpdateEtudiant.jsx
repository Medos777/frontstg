import React, { useState, useEffect, useRef } from 'react';
import EtudiantService from '../services/etudiant.service';
import { useParams, useNavigate } from

        'react-router-dom';
import Button from

        '@mui/material/Button';
import TextField from

        '@mui/material/TextField';

import Paper from

        '@mui/material/Paper';
import Stack from

        '@mui/material/Stack';

const UpdateEtudiant = () => {
    const { etudiantId } = useParams();
    const navigate = useNavigate();

    const [etudiant, setEtudiant] = useState({});

    const nomRef = useRef();
    const emailRef = useRef();
    const adresseRef = useRef();
    const telRef = useRef();
    const classeIdRef = useRef();

    // Initialize the updatedEtudiant object outside of handleSubmit
    const [updatedEtudiant, setUpdatedEtudiant] = useState({});

    useEffect(() => {
        fetchEtudiant();
    }, []);

    const fetchEtudiant = async () => {
        try {
            const response = await EtudiantService.getEtudiantById(etudiantId);
            setEtudiant(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setUpdatedEtudiant({ ...updatedEtudiant, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Update the etudiant using the updatedEtudiant object
        try {
            await EtudiantService.update(etudiantId, updatedEtudiant);
            navigate('/etudiants');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Mettre à jour l'étudiant</h2>
            <Paper>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            id="nom"
                            label="Nom"
                            defaultValue={etudiant.nom}
                            inputRef={nomRef}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            defaultValue={etudiant.email}
                            inputRef={emailRef}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="adresse"
                            label="Adresse"
                            defaultValue={etudiant.adresse}
                            inputRef={adresseRef}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="tel"
                            label="Tel"
                            defaultValue={etudiant.tel}
                            inputRef={telRef}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="classeId"
                            label="ClasseId"
                            defaultValue={etudiant.classeId}
                            inputRef={classeIdRef}
                            onChange={handleInputChange}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Mettre à jour
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/etudiants')}
                        >
                            Annuler
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
};

export default UpdateEtudiant;
