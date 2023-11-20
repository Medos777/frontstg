import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import FactureService from "../services/FactureService";
import FactureDetail from './FactureDetail.jsx';
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

const GetFactureByEtudiant = () => {
    const navigate = useNavigate();

    const [factures, setFactures] = useState([]);
    const [selectedFacture, setSelectedFacture] = useState(null);
    var etudiantId = localStorage.getItem('userId');
    console.log(localStorage.getItem('userId'));
    if (!etudiantId) {
        etudiantId = localStorage.getItem('userId');
        console.log(etudiantId);
    }

    const fetchFactures = async () => {
const role = localStorage.getItem("role");

        try {
            if (role ==="admin"){
                const response = await FactureService.getAll();
                setFactures(response.data);
                console.log(response.data);
            }else{
            const response = await FactureService.getAll();

            const filteredFactures = response.data.filter(facture => facture.etudiant === etudiantId);
            setFactures(filteredFactures);
            }
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
        sessionStorage.setItem("Facture", stringifiedObject);
        navigate("/DetailFactures");
    };

    return (
        <div>
            <h2>Les Factures pour</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {factures.map((facture) => (
                            <TableRow key={facture._id}>
                                <TableCell>{facture.date}</TableCell>
                                <TableCell>{facture.total}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleClickOnFacture(facture)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GetFactureByEtudiant;
