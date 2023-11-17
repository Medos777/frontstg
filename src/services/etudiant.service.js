import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
import axios from "axios";
const getAll = () => {
    return httpClient.get(('/etudiants'));
}
const create = (classeId, etudiantData) => {
    return httpClient.post(`/etudiants/${classeId}`, etudiantData);
}
const deleteEtudiant =  etudiantId =>{
    return httpClient.delete(`/etudiants/${etudiantId}`);
}
const getEtudiantById =(etudiantId) =>{
    return httpClient.get(`/etudiants/${etudiantId}`);
}

const update = async (etudiantId, updatedEtudiant) => {
    try {
        const response = await httpClient.put(`/etudiants/${etudiantId}`, updatedEtudiant);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export  default {getAll,create,deleteEtudiant,getEtudiantById,update}

