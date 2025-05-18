// frontend/src/services/favoriteService.ts
import api from './api';
import { ProductData } from './productService';

/**
 * Add a product to favorites
 */
export const addToFavorites = async (productId: string): Promise<{ message: string, favorites: string[] }> => {
  try {
    const response = await api.post<{ message: string, favorites: string[] }>('/favorites', { productId });
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw handleApiError(error);
  }
};

/**
 * Remove a product from favorites
 */
export const removeFromFavorites = async (productId: string): Promise<{ message: string, favorites: string[] }> => {
  try {
    const response = await api.delete<{ message: string, favorites: string[] }>(`/favorites/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw handleApiError(error);
  }
};

/**
 * Get all user favorites
 */
export const getFavorites = async (): Promise<ProductData[]> => {
  try {
    const response = await api.get<ProductData[]>('/favorites');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw handleApiError(error);
  }
};

/**
 * Check if a product is in favorites
 */
export const checkFavorite = async (productId: string): Promise<boolean> => {
  try {
    const response = await api.get<{ isFavorite: boolean }>(`/favorites/${productId}`);
    return response.data.isFavorite;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false; // Default to false if there's an error
  }
};

// Helper function to handle API errors
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

const handleApiError = (error: unknown): Error => {
  if (error instanceof Error) {
    // Convert to ApiError type if it's from an API call
    const apiError = error as ApiError;
    if (apiError.response?.data?.message) {
      return new Error(apiError.response.data.message);
    }
    return error;
  }
  return new Error('An unknown error occurred');
};

export default {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  checkFavorite
};