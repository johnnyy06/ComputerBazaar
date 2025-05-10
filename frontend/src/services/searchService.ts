// frontend/src/services/searchService.ts
import api from './api';
import { ProductData } from './productService';

export interface SearchResult extends ProductData {
  score?: number; // Pentru relevanta rezultatului
}

export interface SearchResponse {
  products: SearchResult[];
  suggestions: string[];
  totalCount: number;
  page: number;
  pages: number;
}

/**
 * Search products by keyword
 */
export const searchProducts = async (
  keyword: string,
  page = 1,
  category?: string,
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest'
): Promise<SearchResponse> => {
  try {
    const params: Record<string, string | number> = {
      keyword,
      pageNumber: page,
      sortBy: sortBy || 'relevance'
    };

    if (category) {
      params.category = category;
    }

    const response = await api.get<SearchResponse>('/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw handleApiError(error);
  }
};

/**
 * Get search suggestions for autocomplete
 */
export const getSearchSuggestions = async (keyword: string): Promise<string[]> => {
  try {
    if (!keyword || keyword.length < 2) {
      return [];
    }

    const response = await api.get<{ suggestions: string[] }>('/search/suggestions', {
      params: { q: keyword }
    });
    
    return response.data.suggestions;
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [];
  }
};

/**
 * Get popular search terms
 */
export const getPopularSearches = async (): Promise<string[]> => {
  try {
    const response = await api.get<{ searches: string[] }>('/search/popular');
    return response.data.searches;
  } catch (error) {
    console.error('Error getting popular searches:', error);
    return [];
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
    const apiError = error as ApiError;
    if (apiError.response?.data?.message) {
      return new Error(apiError.response.data.message);
    }
    return error;
  }
  return new Error('An unknown error occurred');
};

export default {
  searchProducts,
  getSearchSuggestions,
  getPopularSearches
};