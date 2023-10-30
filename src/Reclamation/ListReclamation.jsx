import React, { useState, useEffect } from 'react';
import ReclamationService from '../services/ReclamationService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ListReclamation = () => {
    const [reclamations, setReclamations] = useState([]);

    useEffect(() => {
        const fetchReclamations = async () => {
            const response = await ReclamationService.getAll();
            setReclamations(response.data);
        };

        fetchReclamations();
    }, []);

    return (
        <div>
            <h2>List of Reclamations</h2>
            <TableContainer>
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
