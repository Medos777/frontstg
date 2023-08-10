import React, { useState, useEffect } from 'react';
import EtudiantService from '../services/etudiant.service';
/*
import { Outlet, Link } from "react-router-dom";
import { ObjectId } from 'mongodb'; // Assuming you're using the MongoDB driver or a similar library
*/

const ListEtudiant = () => {
    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        fetchEtudiants();
    }, []);

    const fetchEtudiants = async () => {
        try {
            const response = await EtudiantService.getAll();
            setEtudiants(response.data);
        } catch (error) {
            console.log(error);
        }

    };
    const handleDelete = async (etudiantId) => {
        console.log('Deleting etudiant with id', etudiantId);
        try {
            await EtudiantService.deleteEtudiant(etudiantId);
            fetchEtudiants();
            if (etudiantId) {

                console.log(`Deleting etudiant with id ${etudiantId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Liste des étudiants</h2>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Tel</th>
                    <th scope="col">Classe</th>
                </tr>
                </thead>
                <tbody>
                {etudiants && etudiants.map((etudiant,id) => (
                    <tr key={id}>{etudiant.id}
                        <td>{id}</td>
                        <td>{etudiant.nom}</td>
                        <td>{etudiant.email}</td>
                        <td>{etudiant.adresse}</td>
                        <td>{etudiant.tel}</td>
                        <td>{etudiant.classe ? etudiant.classe.name : 'Aucune'}</td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-2">Modifier</button>
                            <button onClick={() => handleDelete(etudiant.id)}></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEtudiant;