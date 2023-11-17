import React, {useState, useEffect, useParams} from 'react';
import EtudiantService from '../services/etudiant.service';
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
import {Link, useNavigate} from "react-router-dom";

const ListEtudiant = () => {
    const navigate = useNavigate();
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
        } catch (error) {
            console.log(error);
        }
    };

    const EtudiantClickHandler = ({ etudiantId }) => {
        const navigate = useNavigate();

        const handleClick = () => {
            navigate(`/etudiants/${etudiantId}/update`);
        };

        return <Link to={`/etudiants/${etudiantId}/update`} endIcon={SendIcon}>update</Link>;
    };



    return (
        <div className="container">
            <h2>Liste des étudiants</h2>
            <Paper>
                <Table>
                    <TableHead>


                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Adresse</TableCell>
                            <TableCell>Tel</TableCell>
                            <TableCell>Classe</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {etudiants && etudiants.map((etudiant, id) => (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>{etudiant.nom}</TableCell>
                                <TableCell>{etudiant.email}</TableCell>
                                <TableCell>{etudiant.adresse}</TableCell>
                                <TableCell>{etudiant.tel}</TableCell>
                                <TableCell>{etudiant.classe ? etudiant.classe.name : 'Aucune'}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="text" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(etudiant._id)}>
                                            supprimer
                                        </Button>

                                        <EtudiantClickHandler etudiantId={etudiant._id} />
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

export default ListEtudiant;
