// frontend/src/services/reviewService.ts
import api from './api';

export interface Review {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  rating: number;
  numReviews: number;
}

/**
 * Get all reviews for a product
 */
export const getProductReviews = async (productId: string): Promise<ReviewsResponse> => {
  try {
    const response = await api.get<ReviewsResponse>(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw handleApiError(error);
  }
};

/**
 * Add a review to a product
 */
export const addProductReview = async (
  productId: string,
  reviewData: { rating: number; comment?: string }
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      `/products/${productId}/reviews`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw handleApiError(error);
  }
};

/**
 * Delete a review
 */
export const deleteReview = async (
  productId: string,
  reviewId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(
      `/products/${productId}/reviews/${reviewId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
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
  getProductReviews,
  addProductReview,
  deleteReview,
};