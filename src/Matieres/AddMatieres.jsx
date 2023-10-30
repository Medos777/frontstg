import React, { useState , useEffect } from 'react';
import MatieresService from "../services/MatieresService";
import {ToastContainer,toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Accueil from "../Dashbord/Acceuil";

const AddMatieres = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [code, setCode] = useState('');




    const saveData =(e)=> {
        toast("ok");

        e.preventDefault();
        const matiere = {  nom};

        MatieresService.create(matiere)
            .then(res => {
                console.log('avec succee');
                console.log(matiere)
                navigate('/ListMatieres');

            }).catch(error => {
            console.log('erreur', error);

        });
    }
    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>Ajout matiere</h5>
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
                                placeholder='Entrez le nom de l&#x27;matiere'
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

export default AddMatieres;