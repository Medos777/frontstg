import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import EtudiantService from '../services/etudiant.service';

const EtudiantDetail = () => {
    const { id } = useParams(); // Get the dynamic parameter from the URL
    const [etudiant, setEtudiant] = useState(null);

    useEffect(() => {
        const fetchEtudiant = async () => {
            try {
                const response = await EtudiantService.getEtudiantById(id);
                console.log('Response:', response);

                setEtudiant(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchEtudiant();
    }, [id]);

    return (
        <div className="container">
            {etudiant && (
                <div>
                    <h2>Détails de l'étudiant</h2>
                    <p>Nom: {etudiant.nom}</p>
                    <p>Email: {etudiant.email}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default EtudiantDetail;
