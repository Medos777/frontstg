import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
const getAll = () => {
    return httpClient.get(('/matieres'));
}
const create = ( matieresData) => {
    return httpClient.post(`/matieres`, matieresData);
}
const deleteMatieres =  matieresId =>{
    return httpClient.delete(`/matieres/${matieresId}`);
}
export  default {getAll,create,deleteMatieres}

