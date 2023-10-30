import React, { useState, useEffect, useRef } from 'react';
import MatieresService from '../services/MatieresService';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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
import { Link } from 'react-router-dom';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Accueil from "../Dashbord/Acceuil";
import jwt_decode from "jwt-decode";

const ListMatieres = () => {
    const [matieres, setMatieres] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const tableRef = useRef(null);
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
        console.log(role);
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await MatieresService.getAll();
            setMatieres(response.data);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="container">
            <h2>Liste des Matieres</h2>
            <Paper>
                <TableContainer ref={tableRef}>
                    {role === "admin" && (

                        <Button variant="text"  color="success" endIcon={<AddIcon />} component={Link} to="/addMatieres" >
                        Ajout
                    </Button>
                        )}
                    <Table>
                        <TableHead>

                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>libelle</TableCell>
                                <TableCell>matiere</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matieres &&
                                matieres.map((matiere, id) => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{matiere.code}</TableCell>
                                        <TableCell>{matiere.nom}</TableCell>


                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ListMatieres;