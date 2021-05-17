import axios from 'axios';

const API = 'http://localhost:5000';

// User
export const signUp = (userData) => axios.post(`${API}/user`, userData);
export const signIn = (uid) => axios.post(`${API}/user/signIn`, uid);
export const getUser = (id) => axios.get(`${API}/user/${id}`);
export const updateUser = (id, updatedData) => axios.patch(`${API}/user/${id}`, updatedData);

// Posts
export const getPosts = () => axios.get(`${API}/post`);
export const getPrivatePosts = (uid) => axios.get(`${API}/post/${uid}`);
export const createPost = (uid, post) => axios.post(`${API}/post/${uid}`, post);
export const updatePost = (id, post) => axios.patch(`${API}/post/${id}`, post);
export const deletePost = (id) => axios.delete(`${API}/post/${id}`);