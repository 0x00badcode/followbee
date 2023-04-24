import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = token;
    console.log('token', token);

  }
  return config;
});

export default api;
