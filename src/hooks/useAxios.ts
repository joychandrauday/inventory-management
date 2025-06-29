// src/hooks/useAxios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://inventory-backend-2spe.onrender.com', // replace with your API base URL
    withCredentials: true,
});

const useAxios = () => axiosInstance;

export default useAxios;
