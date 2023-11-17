import React, { useState, useEffect } from 'react';
import FactureService from '../services/FactureService';
import ClasseService from '../services/ClasseService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EtudiantService from "../services/etudiant.service";

const AddFacture = () => {
    const navigate = useNavigate();

    const [etudiant, setEtudiant] = useState('');
    const [filiere, setFiliere] = useState('');
    const [niveau, setNiveau] = useState('');
    const [fraisInscription, setFraisInscription] = useState('');
    const [fraisScolarite, setFraisScolarite] = useState('');
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
    const [etudiants, setEtudiants] = useState([]);
    const [classes, setClasses] = useState([]);
    const [classId, setClassId] = useState('');

    useEffect(() => {
        fetchEtudiants();
        fetchClasses();
    }, []);

    const fetchEtudiants = async () => {
        try {
            const response = await EtudiantService.getAll();
            const etudiants = response.data;
            console.log('Fetched Etudiants:', etudiants);
            setEtudiants(etudiants);
        } catch (error) {
            console.error('Error retrieving etudiants:', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await ClasseService.getAll();
            const classes = response.data;
            console.log('Fetched Classes:', classes);
            setClasses(classes);
        } catch (error) {
            console.error('Error retrieving classes:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'etudiant':
                setEtudiant(value);
                break;
            case 'filiere':
                setFiliere(value);
                break;
            case 'niveau':
                setNiveau(value);
                break;
            case 'fraisInscription':
                setFraisInscription(value);
                break;
            case 'fraisScolarite':
                setFraisScolarite(value);
                break;
            case 'classId':
                setClassId(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const factureData = {
            etudiant,
            filiere,
            niveau,
            fraisInscription,
            fraisScolarite,
            total: parseFloat(fraisInscription) + parseFloat(fraisScolarite),
            classId,
        };

        try {
            await FactureService.create(factureData);
            console.log('Facture created successfully');
            // Reset the form after successful creation
            setEtudiant('');
            setFiliere('');
            setNiveau('');
            setFraisInscription('');
            setFraisScolarite('');
            setTotal(0);
            setError(null);
            // Notify success using toast
            toast.success('Facture created successfully');
            // Optionally, you can navigate to another page after successful creation
            // navigate('/your-success-page');
        } catch (error) {
            console.error('Error creating facture:', error);
            setError('Error creating facture');
        }
    };

    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>Add Facture</h5>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='etudiant'>Etudiant:</label>
                            {etudiants.length > 0 && (
                                <select
                                    name='etudiant'
                                    id='etudiant'
                                    value={etudiant}
                                    onChange={handleChange}
                                    className='form-control'
                                >
                                    <option value=''>Select an etudiant</option>
                                    {etudiants.map((etudiant) => (
                                        <option key={etudiant._id} value={etudiant._id}>
                                            {etudiant.nom}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='filiere'>Filiere:</label>
                            <input
                                type='text'
                                name='filiere'
                                value={filiere}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='niveau'>Niveau:</label>
                            <input
                                type='number'
                                name='niveau'
                                value={niveau}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='fraisInscription'>Frais d'inscription:</label>
                            <input
                                type='number'
                                name='fraisInscription'
                                value={fraisInscription}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='fraisScolarite'>Frais de scolarite:</label>
                            <input
                                type='number'
                                name='fraisScolarite'
                                value={fraisScolarite}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='classId'>Classe ID</label>
                            <select
                                name='classId'
                                id='classId'
                                value={classId}
                                onChange={handleChange}
                                className='form-control'
                            >
                                <option value=''>Select a class</option>
                                {classes.map((classe) => (
                                    <option key={classe._id} value={classe._id}>
                                        {classe.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Create Facture
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddFacture;
