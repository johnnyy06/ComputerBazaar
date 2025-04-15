// frontend/src/services/adminService.ts
import api from './api';

// Types
export interface UserData {
  id?: string;
  name?: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  userCount: number;
  productCount: number;
  orderCount: number;
  totalRevenue: number;
  lowStockCount: number;
  recentOrders: Array<{
    _id: string;
    user: {
      name: string;
      email: string;
    };
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
  }>;
  topProducts: Array<{
    _id: string;
    name: string;
    price: number;
    rating: number;
    numReviews: number;
    stock: number;
  }>;
}

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await api.get<UserData[]>('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw handleApiError(error);
  }
};

/**
 * Delete a user (admin only)
 */
export const deleteUser = async (userId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw handleApiError(error);
  }
};

/**
 * Get admin dashboard statistics
 */
// Fetch admin dashboard statistics
export const getAdminStats = async (): Promise<DashboardStats> => {
  try {
    const response = await api.get<DashboardStats>('/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    // Return default data if API call fails - to avoid breaking the dashboard
    return {
      userCount: 0,
      productCount: 0,
      orderCount: 0,
      totalRevenue: 0,
      lowStockCount: 0,
      recentOrders: [],
      topProducts: []
    };
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
  getAllUsers,
  deleteUser,
  getAdminStats
};