import axios from 'axios';
import toast from 'react-hot-toast';

// Create an Axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Request Interceptor: Attach the JWT token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global API errors (401s, Network errors)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle Network Errors (server down, no connection)
    if (!error.response) {
      toast.error('Cannot connect to server. Check your connection.');
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized globally
    if (error.response.status === 401) {
      localStorage.removeItem('crm-token');
      // Only redirect if we are not already on the login/register page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
