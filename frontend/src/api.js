import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchPetitions = () => API.get('/petitions');
export const createPetition = (newPetition) => API.post('/petitions', newPetition);
export const signPetition = (id) => API.post(`/petitions/${id}/sign`);
export const deletePetition = (id) => API.delete(`/petitions/${id}`); 
export const updatePetition = (id, updatedData) => API.put(`/petitions/${id}`, updatedData); // Added update API call

export default API;