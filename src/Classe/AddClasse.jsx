import React, { useState , useEffect } from 'react';
import EtudiantService from "../services/etudiant.service";
import ClasseService from '../services/ClasseService';
import {ToastContainer,toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Accueil from "../Dashbord/Acceuil";

const AddClasse = () => {
    const navigate = useNavigate();
    const [name, setNom] = useState('');
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
        const classe = {  name};

        ClasseService.create(classe)
            .then(res => {
                console.log('avec succee');
                console.log(classe)
                navigate('/classes');

            }).catch(error => {
            console.log('erreur', error);

        });
    }
    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>Ajout classe</h5>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='nom'>Nom</label>
                            <input
                                type='text'
                                name='nom'
                                id='nom'
                                value={name}
                                onChange={(e) => setNom(e.target.value)}
                                className='form-control'
                                placeholder='Entrez le nom de l&#x27;étudiant'
                            />
                        </div>
                        <button className='btn btn-primary' onClick={(e)=> saveData(e)}>Enregistrer</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddClasse;