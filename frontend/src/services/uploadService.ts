// frontend/src/services/uploadService.ts
import api from './api';

// Interface for uploaded image
export interface UploadedImage {
  url: string;
  publicId: string;
  originalName?: string;
}

/**
 * Upload a single image to Cloudinary
 */
export const uploadImage = async (image: File): Promise<UploadedImage> => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await api.post<UploadedImage>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw handleApiError(error);
  }
};

/**
 * Upload multiple images to Cloudinary (max 5)
 */
export const uploadMultipleImages = async (images: File[]): Promise<UploadedImage[]> => {
  try {
    const formData = new FormData();
    
    // Add each image to the formData
    images.forEach(image => {
      formData.append('images', image);
    });

    const response = await api.post<UploadedImage[]>('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw handleApiError(error);
  }
};

/**
 * Delete an image from Cloudinary
 */
export const deleteUploadedImage = async (publicId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/upload/image/${publicId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
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
  uploadImage,
  uploadMultipleImages,
  deleteUploadedImage
};