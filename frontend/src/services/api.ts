import axios from 'axios';
import { getAuthHeader } from './authService';

// Create axios instance with defaults
const api = axios.create({
  baseURL: '/api', // This makes the requests relative to the current domain
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Add auth header if available
    const authHeader = getAuthHeader();
    if (authHeader.Authorization) {
      // Make sure headers object exists
      config.headers = config.headers || {};
      config.headers.Authorization = authHeader.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Products
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// More API functions can be added here

export default api;