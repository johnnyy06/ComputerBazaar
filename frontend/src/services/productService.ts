// frontend/src/services/productService.ts
import api from './api';
import { UploadedImage } from './uploadService';

// Product data interface
export interface ProductData {
  _id?: string;
  name: string;
  price: number;
  oldPrice?: number; // Prețul vechi pentru afișarea discountului
  discount?: number; // Procentul de discount
  isNew?: boolean;   // Marker pentru produse noi
  description: string;
  // Updated to handle both legacy string URLs and new Cloudinary image objects
  images: (string | UploadedImage)[];
  brand: string;
  category: string;
  stock: number;
  rating?: number;
  numReviews?: number;
  specifications?: Map<string, string> | {[key: string]: string};
  createdAt?: string;
  updatedAt?: string;
}

// Product list response interface
export interface ProductListResponse {
  products: ProductData[];
  page: number;
  pages: number;
  totalProducts: number;
}

/**
 * Get all products with pagination, optional search keyword, and category filter
 */
export const getProducts = async (
  page = 1,
  keyword = '',
  category = ''
): Promise<ProductListResponse> => {
  try {
    const response = await api.get<ProductListResponse>('/products', {
      params: { pageNumber: page, keyword, category },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw handleApiError(error);
  }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (productId: string): Promise<ProductData> => {
  try {
    const response = await api.get<ProductData>(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw handleApiError(error);
  }
};

/**
 * Create a new product (admin only)
 */
export const createProduct = async (productData: Partial<ProductData>): Promise<ProductData> => {
  try {
    const response = await api.post<ProductData>('/admin/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw handleApiError(error);
  }
};

/**
 * Update an existing product (admin only)
 */
export const updateProduct = async (
  productId: string,
  productData: Partial<ProductData>
): Promise<ProductData> => {
  try {
    const response = await api.put<ProductData>(`/admin/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw handleApiError(error);
  }
};

/**
 * Delete a product (admin only)
 */
export const deleteProduct = async (productId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/admin/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw handleApiError(error);
  }
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (
  category: string,
  page = 1
): Promise<ProductListResponse> => {
  return getProducts(page, '', category);
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

export const getProductCountByCategory = async (): Promise<{[key: string]: number}> => {
  try {
    const response = await api.get<{[key: string]: number}>('/products/category-counts');
    return response.data;
  } catch (error) {
    console.error('Error fetching product counts by category:', error);
    return {};
  }
};

export const getRecommendedProducts = async (): Promise<ProductData[]> => {
  try {
    const response = await api.get<ProductData[]>('/products/recommended');
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    throw handleApiError(error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductCountByCategory,
  getRecommendedProducts
};