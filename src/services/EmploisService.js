import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
const getAll = () => {
    return httpClient.get(('/emplois'));
}
const create = ( emploisData) => {
    return httpClient.post(`/emplois`, emploisData);
}
const deleteEmplois =  emploisId =>{
    return httpClient.delete(`/emplois/${emploisId}`);
}
export  default {getAll,create,deleteEmplois}

