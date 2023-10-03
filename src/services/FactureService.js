
import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
const getAll = () => {
    return httpClient.get(('/factures'));
}
const getFactures =  etudiantId => {
    return httpClient.get(`/factures/${etudiantId}`);
}
const create = ( facturesData) => {
    return httpClient.post(`/factures`, facturesData);
}
const deleteFactures =  facturesId =>{
    return httpClient.delete(`/factures/${facturesId}`);
}
export  default {getAll,create,deleteFactures}

