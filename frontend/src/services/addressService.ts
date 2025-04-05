// frontend/src/services/addressService.ts
import api from './api';

// Interface for Address
export interface Address {
  _id?: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Error type for consistent error handling
export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

// Helper function to process errors
const handleApiError = (error: unknown): never => {
  if (error instanceof Error) {
    // Convert to ApiError type if it's from an API call
    const apiError = error as ApiError;
    if (apiError.response?.data?.message) {
      throw new Error(apiError.response.data.message);
    }
  }
  // Rethrow original error or create a new generic one
  throw error instanceof Error ? error : new Error('An unknown error occurred');
};

// Get all addresses for current user
export const getUserAddresses = async (): Promise<Address[]> => {
  try {
    const response = await api.get<Address[]>('/users/addresses');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get address by ID
export const getAddressById = async (id: string): Promise<Address> => {
  try {
    const response = await api.get<Address>(`/users/addresses/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create new address
export const createAddress = async (addressData: Omit<Address, '_id'>): Promise<Address> => {
  try {
    const response = await api.post<Address>('/users/addresses', addressData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update existing address
export const updateAddress = async (id: string, addressData: Partial<Address>): Promise<Address> => {
  try {
    const response = await api.put<Address>(`/users/addresses/${id}`, addressData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete address
export const deleteAddress = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/users/addresses/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Set address as default
export const setAddressAsDefault = async (id: string): Promise<Address> => {
  try {
    const response = await api.put<Address>(`/users/addresses/${id}/default`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default {
  getUserAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setAddressAsDefault
};