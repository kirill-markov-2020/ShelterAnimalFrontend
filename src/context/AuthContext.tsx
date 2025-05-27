import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../api/client';

interface AuthContextType {
  isAuthenticated: boolean;
  userLogin: string | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLogin, setUserLogin] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const login = localStorage.getItem('userLogin');
    if (token && login) {
      setIsAuthenticated(true);
      setUserLogin(login);
    }
  }, []);

  const login = async (login: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { login, password });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userLogin', login);
      setIsAuthenticated(true);
      setUserLogin(login);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userLogin');
    setIsAuthenticated(false);
    setUserLogin(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};