// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  updateLocalUserData,
  LoginCredentials,
  RegisterData,
} from "../services/authService";

// Define the shape of context value
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserName: (name: string) => void;
  error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for user in localStorage on first render
  useEffect(() => {
    const checkUser = () => {
      const user = getCurrentUser();
      if (user) {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await loginUser(credentials);
      setUser(userData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred during login");
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response: { data?: { message?: string } } };
        setError(
          axiosError.response?.data?.message || "An error occurred during login"
        );
      } else {
        setError("An unknown error occurred during login");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await registerUser(data);
      setUser(userData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred during registration");
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response: { data?: { message?: string } } };
        setError(
          axiosError.response?.data?.message ||
            "An error occurred during registration"
        );
      } else {
        setError("An unknown error occurred during registration");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user name function
  const updateUserName = (name: string) => {
    if (user) {
      // Create a new user object with the updated name
      const updatedUser = { ...user, name };
      
      // Update local state
      setUser(updatedUser);
      
      // Update the user data in localStorage
      updateLocalUserData(updatedUser);
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Value to be provided to consumers of this context
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserName,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;