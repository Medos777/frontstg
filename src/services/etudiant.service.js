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
export  default {getAll,create,deleteEtudiant}

