
import axios from 'axios';
import { jwtDecode } from "jwt-decode";



export function isTokenExpired() {

  if (localStorage.getItem('User') == null){
    return true
  }

  var token = JSON.parse(localStorage.getItem('User')).token

  if (!token){
    return true
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.exp) {
    const currentTime = Date.now() / 1000;
    return currentTime > decodedToken.exp;
  }
  return true; // Consider token invalid if no expiration is found
}


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export const Custom_Axios = (token) => axios.create({
    baseURL: BACKEND_URL,
    timeout: 100000,
    headers : {
        Authorization : "Bearer " + token 
    }
});







