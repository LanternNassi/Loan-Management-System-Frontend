
import axios from 'axios';
import { BACKEND_URL } from '../config';


export const Custom_Axios = (token) => axios.create({
    // baseURL: 'https://localhost:7223/api',
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers : {
        Authorization : "Bearer " + token 
    }
});


