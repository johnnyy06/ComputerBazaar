// frontend/src/services/userService.ts
import api from './api';

// Interface for the update request payload
interface UserProfileUpdateData {
  name?: string;
  phone?: string;
}

// Interface for the response data
interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

/**
 * Updates user profile information
 */
export const updateUserProfile = async (userData: UserProfileUpdateData): Promise<UserProfileResponse> => {
  try {
    const response = await api.put<UserProfileResponse>('/auth/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export default {
  updateUserProfile
};