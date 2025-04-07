// frontend/src/services/categoryService.ts
import api from './api';

// Category data interface
export interface CategoryData {
  _id?: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all categories
 */
export const getCategories = async (): Promise<CategoryData[]> => {
  try {
    const response = await api.get<CategoryData[]>('/categories');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Return a default set of categories if the API fails
    return [
      { _id: '1', name: 'Procesoare' },
      { _id: '2', name: 'Plăci video' },
      { _id: '3', name: 'Plăci de bază' },
      { _id: '4', name: 'Memorii RAM' },
      { _id: '5', name: 'SSD & HDD' },
      { _id: '6', name: 'Surse' },
      { _id: '7', name: 'Periferice' },
      { _id: '8', name: 'Laptopuri' },
      { _id: '9', name: 'Desktop PC' }
    ];
  }
};

/**
 * Create a new category (admin only)
 */
export const createCategory = async (categoryData: Partial<CategoryData>): Promise<CategoryData> => {
  try {
    const response = await api.post<CategoryData>('/admin/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw handleApiError(error);
  }
};

/**
 * Update an existing category (admin only)
 */
export const updateCategory = async (
  categoryId: string,
  categoryData: Partial<CategoryData>
): Promise<CategoryData> => {
  try {
    const response = await api.put<CategoryData>(`/admin/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw handleApiError(error);
  }
};

/**
 * Delete a category (admin only)
 */
export const deleteCategory = async (categoryId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/admin/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw handleApiError(error);
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
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};