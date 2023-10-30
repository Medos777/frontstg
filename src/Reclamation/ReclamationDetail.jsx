import React, { useEffect, useState } from 'react';
import reclamationService from '../services/ReclamationService';

const ReclamationDetail = ({ id }) => {
    const [reclamation, setReclamation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReclamation = async () => {
            const reclamation = await reclamationService.getRelamation(id);
            setReclamation(reclamation);
            setLoading(false);
        };

        fetchReclamation();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!reclamation) {
        return <div>Reclamation not found</div>;
    }

    // Set the reclamation ID after the reclamation state variable has been populated
    reclamation.id = "6527de8327b77ae0cc671c16";

    const deleteReclamation = async () => {
        await reclamationService.deleteReclamation(id);
        // Redirect to the reclamations list page
        window.location.href = '/reclamations';
    };

    return (
        <div>
            <h1>Reclamation Details</h1>
            <ul>
                <li>ID: {reclamation.id}</li>
                <li>Admin: {reclamation.admin}</li>
                <li>Reclamation Text: {reclamation.ReclamationText}</li>
                <li>Reclamation Date: {reclamation.ReclamationDate}</li>
            </ul>

            <button type="button" onClick={deleteReclamation}>Delete Reclamation</button>
        </div>
    );
};

export default ReclamationDetail;
