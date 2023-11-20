import React, { useState, useEffect } from 'react';
import ReclamationService from '../services/ReclamationService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

const ListReclamation = () => {
    const [reclamations, setReclamations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReclamations = async () => {
            const role=localStorage.getItem("role");
            const userId = localStorage.getItem("userId");
            if (role === "admin")
            {
                const response = await ReclamationService.getAll();
                setReclamations(response.data);
            }
            else {

                const response = await ReclamationService.getAll();


                const filteredReclamations = response.data.filter(reclamation => reclamation.admin === userId);
                setReclamations(filteredReclamations);

            }
        };

        fetchReclamations();
    }, []);

    return (
        <div>
            <h2>List of Reclamations</h2>



            <TableContainer>
                <Stack direction="row" spacing={2} >
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigate('/addreclamations')}>
                        Ajouter une reclamation
                    </Button>
                </Stack>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Reclamation Text</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reclamations.map((reclamation) => (
                            <TableRow key={reclamation._id}>
                                <TableCell>{reclamation.admin}</TableCell>
                                <TableCell>{reclamation.ReclamationDate}</TableCell>
                                <TableCell>{reclamation.ReclamationText}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListReclamation;
