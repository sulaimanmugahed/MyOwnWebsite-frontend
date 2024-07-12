import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASEURL;


export const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})



