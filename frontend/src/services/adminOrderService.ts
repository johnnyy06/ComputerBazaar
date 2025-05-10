// frontend/src/services/adminOrderService.ts
import api from './api';

// Order data interfaces
export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface OrderItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images?: string[] | { url: string }[];
  };
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  _id: string;
  user: OrderUser;
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderListResponse {
  orders: OrderData[];
  page: number;
  pages: number;
  total: number;
}

export interface OrderStats {
  totalOrders: number;
  paidOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyStats: Array<{
    _id: {
      month: number;
      year: number;
    };
    count: number;
    revenue: number;
  }>;
}

/**
 * Get all orders (admin only)
 */
export const getAllOrders = async (
  page = 1,
  keyword = ''
): Promise<OrderListResponse> => {
  try {
    const response = await api.get<OrderListResponse>('/admin/orders', {
      params: { pageNumber: page, keyword },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw handleApiError(error);
  }
};

/**
 * Get order by ID (admin only)
 */
export const getOrderById = async (orderId: string): Promise<OrderData> => {
  try {
    const response = await api.get<OrderData>(`/admin/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw handleApiError(error);
  }
};

/**
 * Update order status (admin only)
 */
export const updateOrderStatus = async (
  orderId: string,
  status: { isPaid?: boolean; isDelivered?: boolean }
): Promise<OrderData> => {
  try {
    const response = await api.put<OrderData>(`/admin/orders/${orderId}/status`, status);
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw handleApiError(error);
  }
};

/**
 * Delete order (admin only)
 */
export const deleteOrder = async (orderId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/admin/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw handleApiError(error);
  }
};

/**
 * Get order statistics (admin only)
 */
export const getOrderStats = async (): Promise<OrderStats> => {
  try {
    const response = await api.get<OrderStats>('/admin/orders/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching order stats:', error);
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
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
};