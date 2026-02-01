// API configuration and helper functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.thesoda.io';
const ORG_PREFIX = 'soda'; // Hardcoded to SoDA for now

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  message?: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_time: number;
  product?: Product;
}

export interface User {
  id: number;
  name: string;
  email?: string;
  username?: string;
  discord_id?: string;
  asu_id?: string;
  total_points?: number;
}

export interface PointsRecord {
  id: number;
  points: number;
  event: string;
  timestamp: string;
}

// Mock authentication token (replace with real OAuth later)
let authToken: string | null = localStorage.getItem('shop_auth_token');
let mockUser: User | null = JSON.parse(localStorage.getItem('shop_user') || 'null');

export const setAuthToken = (token: string, user: User) => {
  authToken = token;
  mockUser = user;
  localStorage.setItem('shop_auth_token', token);
  localStorage.setItem('shop_user', JSON.stringify(user));
};

export const clearAuthToken = () => {
  authToken = null;
  mockUser = null;
  localStorage.removeItem('shop_auth_token');
  localStorage.removeItem('shop_user');
};

export const getAuthToken = () => authToken;
export const getMockUser = () => mockUser;
export const isAuthenticated = () => !!authToken;

// API helper function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & { authToken?: string } = {}
): Promise<T> {
  const { authToken: requestAuthToken, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge any existing headers
  if (fetchOptions.headers) {
    Object.assign(headers, fetchOptions.headers);
  }

  // Use provided token (from Clerk) or fallback to mock token
  const token = requestAuthToken || authToken;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Storefront API functions
export const storefrontAPI = {
  // Get all products (public)
  getProducts: () =>
    apiRequest<Product[]>(`/api/storefront/${ORG_PREFIX}/products`),

  // Get single product (public)
  getProduct: (id: number) =>
    apiRequest<Product>(`/api/storefront/${ORG_PREFIX}/products/${id}`),

  // Get member store (requires auth)
  getMemberStore: () =>
    apiRequest<{ products: Product[]; user_info: any; organization: any }>(
      `/api/storefront/${ORG_PREFIX}/members/store`
    ),

  // Get user's orders (requires auth)
  getOrders: (authToken?: string) =>
    apiRequest<Order[]>(`/api/storefront/${ORG_PREFIX}/members/orders`, { authToken }),

  // Create order (requires auth)
  createOrder: (
    orderData: {
      total_amount: number;
      items: { product_id: number; quantity: number; price: number }[];
    },
    authToken?: string
  ) =>
    apiRequest<{ message: string; id: number; order: Order }>(
      `/api/storefront/${ORG_PREFIX}/members/orders`,
      {
        method: 'POST',
        body: JSON.stringify(orderData),
        authToken,
      }
    ),
};

// Points API functions
export const pointsAPI = {
  // Get user points by identifier
  getUserPoints: (userIdentifier: string) =>
    apiRequest<{
      user: User;
      organization: any;
      total_points: number;
      points_history: PointsRecord[];
    }>(`/api/points/${ORG_PREFIX}/users/${userIdentifier}/points`),

  // Member login (creates or links account)
  memberLogin: (userData: {
    name: string;
    email?: string;
    username?: string;
    asu_id?: string;
  }) =>
    apiRequest<{ message: string; user: User; organization: any }>(
      `/api/points/${ORG_PREFIX}/member_login`,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    ),
};

// Mock login for development (replace with real OAuth)
export const mockLogin = async (email: string) => {
  // For now, just create a mock token and user
  const mockToken = `mock_token_${Date.now()}`;
  const mockUserData: User = {
    id: Math.floor(Math.random() * 1000),
    name: 'Test User',
    email: email,
    username: email.split('@')[0],
    total_points: 0,
  };
  
  setAuthToken(mockToken, mockUserData);
  return mockUserData;
};
