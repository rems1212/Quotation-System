import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || "https://quotation-system-0gr2.onrender.com/api/quotations";

const api = axios.create({
  baseURL: API_BASE, // Your backend API URL from environment variable
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchProducts = () => {
  return fetch(`${API_BASE}/api/products`).then(res => res.json());
};


export default api;
