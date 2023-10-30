import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
import axios from "axios";
const getAll = () => {
    return httpClient.get(('/reclamations'));
}
const create = (reclamationData) => {
    return httpClient.post(`/reclamations`, reclamationData);
}
const deleteReclamation =  reclamationsId =>{
    return httpClient.delete(`/reclamations/${reclamationsId}`);
}
const getRelamation =  Id => {
    return httpClient.get(`/reclamations/${Id}`);
}
export  default {getAll,create,deleteReclamation,getRelamation}

