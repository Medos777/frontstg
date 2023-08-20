import React, { useState, useEffect, useRef } from 'react';
import ClasseService from '../services/ClasseService';
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

const ListEtudiant = () => {
    const [classes, setClasses] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const tableRef = useRef(null);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await ClasseService.getAll();
            setClasses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (classeId) => {
        console.log('Deleting classe with id', classeId);
        try {
            await ClasseService.deleteClasse(classeId);
            fetchClasses();
            if (classeId) {
                console.log(`Deleting classe with id ${classeId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleExpandRow = (rowIndex) => {
        if (expandedRow === rowIndex) {
            setExpandedRow(null);
        } else {
            setExpandedRow(rowIndex);
            if (tableRef.current) {
                tableRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    };

    return (
        <div className="container">
            <h2>Liste des classes</h2>
            <Paper>
                <TableContainer ref={tableRef}>
                    <Button variant="text"  color="success" endIcon={<AddIcon />} component={Link} to="/addclasses" >
                        Ajout
                    </Button>
                    <Table>
                        <TableHead>

                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>Nom</TableCell>
                                <TableCell>Etudiants</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classes &&
                                classes.map((classe, id) => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{classe.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleExpandRow(id)}
                                            >
                                                {expandedRow === id ? 'Hide Etudiants' : 'Show Etudiants'}
                                            </Button>

                                            {expandedRow === id && (
                                                <List component="ol">
                                                    {classe.etudiants.map((etudiant, index) => (
                                                        <ListItem  key={index}>{etudiant}</ListItem >
                                                    ))}
                                                </List>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={2}>
                                                <Button variant="text"   color="error"startIcon={<DeleteIcon />} onClick={() => handleDelete(classe._id)}>
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
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ListEtudiant;