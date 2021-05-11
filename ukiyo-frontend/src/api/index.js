import axios from 'axios';

const API = 'http://localhost:5000';

export const signUp = (userData) => axios.post(`${API}/user`, userData);
export const signIn = (userData) => axios.post(`${API}/user/signIn`, userData);
export const getUser = (id) => axios.get(`${API}/user/${id}`);
