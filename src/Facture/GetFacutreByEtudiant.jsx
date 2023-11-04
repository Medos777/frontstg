import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

const GetAllFactures = () => {
    const [factures, setFactures] = useState([]);

    const fetchFactures = async () => {
        try {
            const response = await axios.get('/api/factures');
            setFactures(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFactures();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {factures.map((facture) => (
                <Card key={facture._id}>
                    <CardHeader title={facture.numero} />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Date: {facture.date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total: {facture.total}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default GetAllFactures;
