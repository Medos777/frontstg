import React, { useState, useEffect } from 'react';
import CoursService from '../services/CoursService';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import Accueil from "../Dashbord/Acceuil";
import jwt_decode from "jwt-decode";

const ListCours = () => {
    const [cours, setCours] = useState([]);
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
        console.log(role);
        fetchCours();

    }, []);

    const fetchCours = async () => {
        try {
            const response = await CoursService.getAll();
            setCours(response.data);
        } catch (error) {
            console.log(error);
        }

    };


    const handleDelete = async (coursId) => {
        console.log('Deleting cours with id', coursId);
        try {
            await CoursService.deleteCours(coursId);
            fetchCours();
            if (coursId) {

                console.log(`Deleting cours with id ${coursId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Liste des cours</h2>
            <Paper>
                <Table>
                    <TableHead>
                        {role === "admin" && (

                            <Button variant="text"  color="success" endIcon={<AddIcon />} component={Link} to="/AddCours" >
                            Ajout
                        </Button>
                            )}
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>libelle</TableCell>
                            <TableCell>matiere</TableCell>
                            <TableCell>enseignant</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cours && cours.map((cours, id) => (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>{cours.libelle}</TableCell>
                                <TableCell>{cours.matiere ? cours.matiere.nom : 'Aucune'} </TableCell>
                                <TableCell>{cours.enseignant ? cours.enseignant.nom : 'Aucune'}</TableCell>

                                <TableCell>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="text"   color="error"startIcon={<DeleteIcon />} onClick={() => handleDelete(cours._id)}>
                                            supprimer
                                        </Button>
                                        <Button variant="text"  color="warning" endIcon={<EditIcon />} >
                                            modifier
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default ListCours;