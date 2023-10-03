import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
const getAll = () => {
    return httpClient.get(('/cours'));
}
const create = ( coursData) => {
    return httpClient.post(`/cours`, coursData);
}
const deleteCours =  coursId =>{
    return httpClient.delete(`/cours/${coursId}`);
}
export  default {getAll,create,deleteCours}
