import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
const getAll = () => {
    return httpClient.get(('/classes'));
}
const create = ( classetData) => {
    return httpClient.post(`/classes`, classetData);
}
const deleteClasse =  classeId =>{
    return httpClient.delete(`/classes/${classeId}`);
}
export  default {getAll,create,deleteClasse}

