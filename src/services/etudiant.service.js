import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
import axios from "axios";
const getAll = () => {
    return httpClient.get(('/etudiants'));
}
const create = (classeId, etudiantData) => {
    return axios.post(`/etudiants/${classeId}`, etudiantData);
}
const deleteEtudiant =  etudiantId =>{
    return axios.delete(`/etudiants/${etudiantId}`);
}
export  default {getAll,create,deleteEtudiant}

