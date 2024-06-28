
import axios from 'axios';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

console.log(BACKEND_URL)
export const Custom_Axios = (token) => axios.create({
    // baseURL: 'https://localhost:7223/api',
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers : {
        Authorization : "Bearer " + token 
    }
});


