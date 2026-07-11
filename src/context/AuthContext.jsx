import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token'));
  const [isLoading, setIsLoading] = useState(true);

  // Restore the session automatically on application mount if a token exists
  useEffect(() => {
    const restoreSession = async () => {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.success) {
            setUser(res.data);
          }
        } catch (error) {
          // If the profile fails to load (e.g. invalid token), the API interceptor will clear the token
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, [token]);

  /**
   * Logs a user in, caches their token, and sets their state.
   */
  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      localStorage.setItem('crm-token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  /**
   * Registers a new user, caches their token, and sets their state.
   */
  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    if (res.success) {
      localStorage.setItem('crm-token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  /**
   * Logs out the user completely.
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext cleanly
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
