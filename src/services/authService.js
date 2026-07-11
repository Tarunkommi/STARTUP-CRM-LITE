import api from './api';

export const authService = {
  /**
   * Registers a new user
   */
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },
  
  /**
   * Logs in an existing user
   */
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  /**
   * Logs out the user (stateless, just clears token locally)
   */
  logout: () => {
    localStorage.removeItem('crm-token');
  },
  
  /**
   * Fetches the currently authenticated user's profile
   */
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },
  
  /**
   * Updates the user's profile
   */
  updateProfile: async (data) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  }
};
