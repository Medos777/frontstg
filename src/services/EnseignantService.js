import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
import axios from "axios";
const getAll = () => {
    return httpClient.get(('/enseignants'));
}
const create = (enseignantData) => {
    return httpClient.post(`/enseignants`, enseignantData);
}
const deleteEseignant =  enseignantId =>{
    return httpClient.delete(`/enseignants/${enseignantId}`);
}
export  default {getAll,create,deleteEseignant}

