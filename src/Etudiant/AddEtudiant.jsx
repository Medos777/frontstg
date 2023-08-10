import React, { useState } from 'react';
import EtudiantService from "../services/etudiant.service";
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
const saveData =(e)=> {
    toast("ok");

    e.preventDefault();
    const classId = "64c2a49d194c15b2542707ec";
    const etudiant = { matricule, nom, email, password, adresse, tel};
    EtudiantService.create(classId, etudiant).then(res => {
        console.log('avec succee');
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
                        <button className='btn btn-primary' onClick={(e)=> saveData(e)}>Enregistrer</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddEtudiant;