// frontend/src/services/authService.ts
import axios from 'axios';

const API_URL = '/api/auth';

// User interface
export interface User {
  id?: string;
  name?: string;
  email: string;
  role?: string;
  token?: string;
}

// Login credentials interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register data interface
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
    interface LoginResponse {
      token: string;
      id?: string;
      name?: string;
      email: string;
      role?: string;
    }

    const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials);
    
    const data: LoginResponse = response.data;
    if (data.token) {
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data as User;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (userData: RegisterData): Promise<User> => {
  try {
    interface RegisterResponse {
      token: string;
      id?: string;
      name?: string;
      email: string;
      role?: string;
    }

    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, userData);

    const data: RegisterResponse = response.data; // Explicitly type response.data
    if (data.token) {
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(data));
    }

    return data as User;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = (): void => {
  // If possible, also call the API to invalidate the token on the server side
  try {
    const user = getCurrentUser();
    if (user && user.token) {
      axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Get auth header
export const getAuthHeader = (): { Authorization: string } | Record<string, never> => {
  const user = getCurrentUser();
  
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  getAuthHeader
};