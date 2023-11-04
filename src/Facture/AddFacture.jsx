import React, { useState, useEffect } from 'react';
import FactureService from '../services/FactureService';
import ClasseService from '../services/ClasseService';
import EtudiantService from '../services/etudiant.service';

const AddFacture = () => {
    const [etudiant, setEtudiant] = useState({ _id: '' });
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
        } catch (error) {
            console.error('Error creating facture:', error);
            setError('Error creating facture');
        }
    };

    return (
        <div>
            <h2>Add Facture</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>


                <div className="form-group">
                    <label htmlFor="etudiant">Etudiant:</label>
                    {etudiants.length > 0 && (
                        <select
                            name="etudiant"
                            id="etudiant"
                            value={etudiant._id}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select an etudiant</option>
                            {etudiants.map((etudiant) => (
                                <option key={etudiant._id} value={etudiant._id}>
                                    {etudiant.nom}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div>
                    <label>Filiere:</label>
                    <input type="text" name="filiere" value={filiere} onChange={handleChange} />
                </div>
                Here's the continuation of the corrected `AddFacture` component:

                ```javascript
                <div>
                    <label>Niveau:</label>
                    <input type="number" name="niveau" value={niveau} onChange={handleChange} />
                </div>
                <div>
                    <label>Frais d'inscription:</label>
                    <input
                        type="number"
                        name="fraisInscription"
                        value={fraisInscription}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Frais de scolarite:</label>
                    <input
                        type="number"
                        name="fraisScolarite"
                        value={fraisScolarite}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="classId">Classe ID</label>
                    <select
                        name="classId"
                        id="classId"
                        value={classId}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Select a class</option>
                        {classes.map((classe) => (
                            <option key={classe._id} value={classe._id}>
                                {classe.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Facture</button>
            </form>
        </div>
    );
};

export default AddFacture;