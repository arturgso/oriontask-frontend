import axios from 'axios';

const baseurl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: `${baseurl}/api/v1`,
    withCredentials: true,
});

export default api;
