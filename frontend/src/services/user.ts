import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getUser = () => axios.get(`${baseUrl}/user`);

const login = (credentials: Credentials) =>
  axios.post(`${baseUrl}/auth/login`, credentials, {timeout: 3000});

const userService = { getUser, login };

export default userService;
