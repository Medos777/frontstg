
import React, { useState, useEffect, useParams } from 'react';
import EtudiantService from "../services/etudiant.service";

const useEtudiantDetail = () => {
    const { etudiantId } = useParams();
    const [etudiant, setEtudiant] = useState(null);

    useEffect(() => {
        fetchEtudiant(etudiantId);
    }, [etudiantId]);

    const fetchEtudiant = async (etudiantId) => {
        // Cache the response for 1 minute
        const etudiantFromCache = JSON.parse(localStorage.getItem(`etudiant-${etudiantId}`));
        if (etudiantFromCache && Date.now() - etudiantFromCache.timestamp < 60000) {
            setEtudiant(etudiantFromCache);
            return;
        }

        const response = await EtudiantService.getEtudiantById(etudiantId);
        setEtudiant(response.data);
 
        // Update the cache
        localStorage.setItem(`etudiant-${etudiantId}`, JSON.stringify({ ...response.data, timestamp: Date.now() }));
    };

    return etudiant;
};

export default useEtudiantDetail;
