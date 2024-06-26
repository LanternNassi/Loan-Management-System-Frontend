
import axios from 'axios';


export const Custom_Axios = (token) => axios.create({
    // baseURL: 'https://localhost:7223/api',
    baseURL: 'https://loan-backend-hskw.onrender.com/api',
    timeout: 10000,
    headers : {
        Authorization : "Bearer " + token 
    }
});


