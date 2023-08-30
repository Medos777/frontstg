import React, { useState } from 'react';
import EnseignantService from "../services/EnseignantService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AddEnseignant = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adresse, setAdresse] = useState('');
    const [tel, setTel] = useState('');
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    const saveData = async (e) => {
        e.preventDefault();

     /*   if (!photo) {
            toast.error('Veuillez sélectionner une photo.');
            return;
        }*/

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('nom', nom);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('adresse', adresse);
            formData.append('tel', tel);
            formData.append('photo', photo);

            await EnseignantService.create(formData);
            toast.success('Enseignant ajouté avec succès!');
            navigate('/enseignants');
        } catch (error) {
            console.error('Erreur:', error);

            if (error.response) {
                // Handle specific error messages from the backend if available
                if (error.response.data.error) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error('Une erreur s\'est produite lors de l\'ajout de l\'enseignant.');
                }
            } else {
                toast.error('Une erreur s\'est produite lors de la communication avec le serveur.');
            }
        } finally {
            setLoading(false);
            // Clear the form fields
            setNom('');
            setEmail('');
            setPassword('');
            setAdresse('');
            setTel('');
            setPhoto(null);
        }
    }

    return (
        <div className='container mt-5'>
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <h5 className='card-header'>Ajout Enseignant</h5>
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
                        <div className="form-group">
                            <label htmlFor="photo">Photo</label>
                            <input
                                type="file"
                                name="photo"
                                id="photo"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className="form-control"
                            />
                        </div>


                        <button
                            className='btn btn-primary'
                            onClick={saveData}
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? 'Enregistrement en cours...' : 'Enregistrer'}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddEnseignant;
