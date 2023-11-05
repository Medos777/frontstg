import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import FactureService from "../services/FactureService";
import FactureDetail from './FactureDetail.jsx';
import {useNavigate} from "react-router-dom";




const GetFactureByEtudiant = () => {
    const navigate = useNavigate();

    const [factures, setFactures] = useState([]);
     const [selectedFacture, setSelectedFacture] = useState(null);

    var etudiantId = localStorage.getItem('userId');
    console.log(localStorage.getItem('userId'));
    if (!etudiantId) {
        // The etudiantId variable is undefined.
        // Initialize it by calling the localStorage.getItem('userId') function.
        etudiantId = localStorage.getItem('userId');
        console.log(etudiantId);
    }

    const fetchFactures = async () => {
        try {
            const response = await FactureService.getAll();
            console.log(etudiantId);
            const filteredFactures = response.data.filter(facture => facture.etudiant === etudiantId);
            setFactures(filteredFactures);
            console.log(response.data);
            console.log(filteredFactures);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFactures();
    }, []);

     const handleClickOnFacture = (facture) => {
        setSelectedFacture(facture);
         const stringifiedObject = JSON.stringify(facture);
         sessionStorage.setItem("Facture",stringifiedObject);
        navigate("/DetailFactures");
    };
       const FactureSelected = () => {
        const facturesele = selectedFacture;
        return facturesele;
    }

    return (
        <div>
            <h2>All Factures for User ID: {etudiantId}</h2>
            <Table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {factures.map((facture) => (
                    <tr key={facture._id}>
                        <td>{facture.date}</td>
                        <td>{facture.total}</td>
                        <td>
                            <button onClick={() => handleClickOnFacture(facture)}>
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

        </div>
    );
};

export default GetFactureByEtudiant;
