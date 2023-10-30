import React, { useState } from 'react';
import reclamationService from '../services/ReclamationService';
import jwt_decode from "jwt-decode";

import { Button, TextField } from '@mui/material';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const AddReclamation = () => {
    const [reclamationData, setReclamationData] = useState({
        admin: 'userId' ,  // Set your default admin
        ReclamationText: ' ', // Set your default text
        date: new Date().toISOString() // Set the current date as default
    });

    const handleSubmit = async (e) => {
        const token= localStorage.getItem('token');
        console.log(token);
        const decodedToken = jwt_decode(token);
        const userId =decodedToken.userId;

        console.log('Decoded Token:', decodedToken);
        e.preventDefault();
        try {
            reclamationData.admin=userId;
            await reclamationService.create(reclamationData);
            console.log('Decoded Token:', decodedToken);

            // Redirect or show a success message here if needed
        } catch (error) {
            console.error('Error creating reclamation:', error);
            // Handle error state or show an error message
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 16, margin: 16 }}>
            <Typography variant="h2" sx={{ marginBottom: 8 }}>Add New Reclamation</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="ReclamationText"
                    label="Reclamation Text"
                    multiline
                    rows={4}
                    value={reclamationData.ReclamationText}
                    placeholder={'text'}
                    onChange={(e) => setReclamationData({ ...reclamationData, ReclamationText: e.target.value })}
                    sx={{ width: '100%' }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', marginTop: 16 }}>Submit</Button>
            </form>
        </Paper>
    );
};

export default AddReclamation;