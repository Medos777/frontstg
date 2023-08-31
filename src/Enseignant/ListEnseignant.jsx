import React, { useState, useEffect } from 'react';
import EnseignantService from '../services/EnseignantService';
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

const ListEnseignant = () => {
    const [enseignants, setEnseignans] = useState([]);

    useEffect(() => {
        fetchEnseignants();
    }, []);

    const fetchEnseignants = async () => {
        try {
            const response = await EnseignantService.getAll();
            setEnseignans(response.data);
        } catch (error) {
            console.log(error);
        }

    };


   /* const handleDelete = async (etudiantId) => {
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
    };*/

    return (
        <div className="container">
            <h2>Liste des enseignants</h2>
            <Paper>  <Button variant="text"  color="success" endIcon={<AddIcon />} component={Link} to="/Addenseignants" >
                Ajout
            </Button>
                <Table>

                    <TableHead>

                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Adresse</TableCell>
                            <TableCell>Tel</TableCell>
                            <TableCell>Photo</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {enseignants && enseignants.map((enseignant, id) => (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>{enseignant.nom}</TableCell>
                                <TableCell>{enseignant.email}</TableCell>
                                <TableCell>{enseignant.adresse}</TableCell>
                                <TableCell>{enseignant.tel}</TableCell>
                                <TableCell>
                                    {enseignant.photo && (
                                        <img
                                            src={enseignant.photo}
                                            alt={`${enseignant.nom} - Photo`}
                                            style={{ maxWidth: '100px' }}
                                        />
                                    )}
                            </TableCell>
                                {/*<TableCell>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="text"   color="error"startIcon={<DeleteIcon />} onClick={() => handleDelete(etudiant._id)}>
                                            supprimer
                                        </Button>
                                        <Button variant="text"  color="warning" endIcon={<EditIcon />} >
                                            modifier
                                        </Button>
                                    </Stack>
                                </TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default ListEnseignant;