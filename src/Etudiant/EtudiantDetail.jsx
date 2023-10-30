import React from 'react';
import { useParams } from 'react-router-dom';

const EtudiantDetail = () => {
    const { id } = useParams();

    // Assuming useEtudiantDetail fetches details based on the id
    const etudiant = useEtudiantDetail(id);

    if (!etudiant) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container">
            <h2 aria-label="Détails de l'étudiant">Détails de l'étudiant</h2>
            <ul>
                <li>Nom : {etudiant.nom}</li>
                <li>Email : {etudiant.email}</li>
                <li>Adresse : {etudiant.adresse}</li>
                <li>Tel : {etudiant.tel}</li>
                <li>Classe : {etudiant.classe ? etudiant.classe.name : 'Aucune'}</li>
            </ul>
        </div>
    );
};

export default EtudiantDetail;
