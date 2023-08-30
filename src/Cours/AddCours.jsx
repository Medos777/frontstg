import React, { useState, useEffect } from 'react';
import CoursService from "../services/CoursService";
import MatieresService from '../services/MatieresService';
import EnseignantService from '../services/EnseignantService';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddCours = () => {
    const navigate = useNavigate();
    const [libelle, setLibelle] = useState('');
    const [matiereId, setMatiereId] = useState('');
    const [matieres, setMatieres] = useState([]);
    const [enseignantId, setEnseignantId] = useState('');
    const [enseignants, setEnseignants] = useState([]);

    useEffect(() => {
        fetchMatieres();
    },
        []);
    useEffect(() => {
        fetchEnseignants();
    }, []);

    const fetchMatieres = async () => {
        try {
            const response = await MatieresService.getAll();
            const matieres = response.data;
            console.log("Fetched matieres:", matieres);
            setMatieres(matieres);
        } catch (error) {
            console.error('Error retrieving matieres:', error);
        }
    };

    const fetchEnseignants = async () => {
        try {
            const response = await EnseignantService.getAll();
            const enseignants = response.data;
            console.log("Fetched enseignants:", enseignants);
            setEnseignants(enseignants);
        } catch (error) {
            console.error('Error retrieving enseignants:', error);
        }
    };

    const saveData = (e) => {
        e.preventDefault();

        const selectedMatiere = matieres.find((matiere) => matiere._id === matiereId);

        if (!selectedMatiere) {
            console.error('Error: Selected matiere not found');
            return;
        }

        const cours = {
            libelle,
            matiere: selectedMatiere,
            enseignantId: enseignantId || null
        };

        CoursService.create(cours)
            .then(res => {
                console.log('Saved successfully');
                console.log(cours);
                toast.success("Cours added successfully");
                navigate('/Cours');
            })
            .catch(error => {
                console.error('Error saving cours:', error);
                toast.error("Failed to add cours");
            });
    };

    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>Ajout Cours</h5>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='nom'>Nom</label>
                            <input
                                type='text'
                                name='libelle'
                                id='libelle'
                                value={libelle}
                                onChange={(e) => setLibelle(e.target.value)}
                                className='form-control'
                                placeholder="Entrez le nom de l'cours"
                            />
                        </div>
                        <input
                            type='text'
                            name='matiereId'
                            id='matiereId'
                            value={matiereId}
                            onChange={(e) => setMatiereId(e.target.value)}
                            className='form-control'
                            required

                        />
                        <div className='form-group'>
                            <label htmlFor='matiereId'>Matiere ID</label>
                            <select
                                name='matiereId'
                                id='matiereId'
                                value={matiereId}
                                onChange={(e) => setMatiereId(e.target.value)}
                                className='form-control'
                                required

                            >
                                <option value=''>Select a matiere</option>
                                {matieres.map(matiere => (
                                    <option key={matiere._id} value={matiere._id}>{matiere.nom}</option>
                                ))}
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='enseignantId'>Enseignant ID</label>
                            <select
                                name='enseignantId'
                                id='enseignantId'
                                value={enseignantId}
                                onChange={(e) => setEnseignantId(e.target.value)}
                                className='form-control'
                            >
                                <option value=''>Select an enseignant</option>
                                {enseignants.map(enseignant => (
                                    <option key={enseignant._id} value={enseignant._id}>{enseignant.nom}</option>
                                ))}
                            </select>
                        </div>

                        <button className='btn btn-primary' onClick={(e) => saveData(e)}>Enregistrer</button>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AddCours;