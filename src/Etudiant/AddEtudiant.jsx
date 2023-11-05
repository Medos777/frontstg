import React, { useState , useEffect } from 'react';
import EtudiantService from "../services/etudiant.service";
import ClasseService from '../services/ClasseService';
import {ToastContainer,toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddEtudiant = () => {
    const navigate = useNavigate();
    const [matricule, setMatricule] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adresse, setAdresse] = useState('');
    const [tel, setTel] = useState('');
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await ClasseService.getAll();
            const classes = response.data; // Assuming the classes are in the `data` property of the response
            console.log("Fetched Classes:", classes); // Check the fetched classes in the console
            setClasses(classes);
        } catch (error) {
            console.error('Error retrieving classes:', error);
        }
    };
    const saveData =(e)=> {
        toast("ok");

        e.preventDefault();
        const etudiant = {  nom, email, password, adresse, tel,classes};
        const selectedClass = classes.find((classe) => classe._id === classId);
        const selectedClassId = selectedClass ? selectedClass._id : '';

        EtudiantService.create(selectedClassId, etudiant)
            .then(res => {
                console.log('avec succee');
                console.log(etudiant)
                navigate('/etudiants');

            }).catch(error => {
            console.log('erreur', error);

        });
    }
    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>Ajout Etudiant</h5>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='nom'>Nom</label>
                            <input
                                type='text'
                                name='nom'
                                id='nom'
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className='form-control'
                                placeholder='Entrez le nom de l&#x27;étudiant'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='form-control'
                                placeholder='Entrez l&#x27;email de l&#x27;étudiant'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Mot de passe</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='form-control'
                                placeholder='Entrez le mot de passe de l&#x27;étudiant'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='adresse'>Adresse</label>
                            <input
                                type='text'
                                name='adresse'
                                id='adresse'
                                value={adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                                className='form-control'
                                placeholder='Entrez l&#x27;adresse de l&#x27;étudiant'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='tel'>Numéro de téléphone</label>
                            <input
                                type='text'
                                name='tel'
                                id='tel'
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                className='form-control'
                                placeholder='Entrez le numéro de téléphone de l&#x27;étudiant'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='classId'>Classe ID</label>
                            <select
                                name='classId'
                                id='classId'
                                value={classId}
                                onChange={(e) => setClassId(e.target.value)}
                                className='form-control'
                            >
                                <option value=''>Select a class</option>
                                {classes.map(classe => (
                                    <option key={classe._id} value={classe._id}>{classe.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className='btn btn-primary' onClick={(e)=> saveData(e)}>Enregistrer</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddEtudiant;