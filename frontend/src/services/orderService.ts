// frontend/src/services/orderService.ts
import api from './api';

export interface OrderItem {
  product: string; // product ID
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  status: string;
  update_time: string;
  email_address: string;
}

export interface OrderData {
  _id?: string;
  user?: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create new order
 */
export const createOrder = async (orderData: Omit<OrderData, '_id' | 'user'>): Promise<OrderData> => {
  try {
    const response = await api.post<OrderData>('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw handleApiError(error);
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: string): Promise<OrderData> => {
  try {
    const response = await api.get<OrderData>(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw handleApiError(error);
  }
};

/**
 * Update order to paid
 */
export const updateOrderToPaid = async (
  orderId: string,
  paymentResult: PaymentResult
): Promise<OrderData> => {
  try {
    const response = await api.put<OrderData>(`/orders/${orderId}/pay`, paymentResult);
    return response.data;
  } catch (error) {
    console.error('Error updating order payment:', error);
    throw handleApiError(error);
  }
};

/**
 * Get current user's orders
 */
export const getMyOrders = async (): Promise<OrderData[]> => {
  try {
    const response = await api.get<OrderData[]>('/orders/myorders');
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
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
    const apiError = error as ApiError;
    if (apiError.response?.data?.message) {
      return new Error(apiError.response.data.message);
    }
    return error;
  }
  return new Error('An unknown error occurred');
};

export default {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
};