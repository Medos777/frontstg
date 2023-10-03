import httpClient from '../http-common';
import data from "bootstrap/js/src/dom/data";
import axios from "axios";

const login = (userData) => {
    const token = localStorage.getItem('token');
    if (token) {
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return httpClient.post(`/login`, userData);
}

export default {login}
