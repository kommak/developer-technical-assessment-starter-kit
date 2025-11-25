import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // your NestJS base URL
});

export const getPopularListings = () => api.get('/listings/popular');
export const getFeaturedListings = () => api.get('/listings/featured');
export const getPropertyById = (id) => api.get(`/property/${id}`);
export const getProjectById = (id) => api.get(`/project/${id}`);
export const getLandById = (id) => api.get(`/land/${id}`);
export const createAgentContact = (data, token) => {
  return api.post('/agent-contact', data, {
    headers: {
      Authorization: `Bearer ${token}`, // pass token in header
    },
  });
};
export const login = async (email, password) => {
  return api.post('/auth/login', { email, password }, { withCredentials: true });
};

export const register = async (first_name,last_name, email,password,
) => {
  return api.post('/auth/register', {first_name,last_name, email,password}, { withCredentials: true });
};