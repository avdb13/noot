import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getUser = () => axios.get(`${baseUrl}/user`)
