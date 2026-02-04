// API configuration and helper functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.thesoda.io';
const ORG_PREFIX = 'soda'; // Hardcoded to SoDA for now

// Custom error class to preserve HTTP status
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Shared error messages
export const ERROR_MESSAGES = {
  NO_POINTS_RECORD: 'No points record found for your account. Please ensure you are using your ASURITE email (e.g., asriv132@asu.edu) and not an email alias. If you continue to experience issues, contact support for assistance.',
};

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
  product_name?: string; // API returns product_name instead of product object
  product?: Product; // Keep for backward compatibility
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



// API helper function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & { authToken?: string } = {}
): Promise<T> {
  const { authToken: requestAuthToken, headers: optionHeaders, ...fetchOptions } = options;
  
  // Start with default headers; caller-provided headers will override these.
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // Merge any existing headers from fetchOptions, supporting all HeadersInit types
  if (optionHeaders) {
    const existingHeaders = new Headers(optionHeaders);
    existingHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  // Use provided token (from Clerk)
  if (requestAuthToken) {
    headers.set('Authorization', `Bearer ${requestAuthToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new APIError(
      error.error || `HTTP ${response.status}`,
      response.status,
      endpoint
    );
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
  getOrders: (userEmail: string, authToken: string) =>
    apiRequest<Order[]>(`/api/storefront/${ORG_PREFIX}/orders/${encodeURIComponent(userEmail)}`, { authToken }),

  // Create order (requires auth) - using Clerk auth
  createOrder: (
    orderData: {
      total_amount: number;
      items: { product_id: number; quantity: number; price: number }[];
    },
    authToken: string
  ) =>
    apiRequest<{ message: string; id: number; points_deducted: number; order: Order }>(
      `/api/storefront/${ORG_PREFIX}/checkout`,
      {
        method: 'POST',
        body: JSON.stringify(orderData),
        authToken,
      }
    ),
};

// Points API functions
export const pointsAPI = {
  // Get user wallet/points by email using Clerk authentication (requires auth)
  getUserPoints: (userEmail: string, authToken: string) =>
    apiRequest<{
      email: string;
      total_points: number;
      points_breakdown: PointsRecord[];
    }>(`/api/storefront/${ORG_PREFIX}/wallet/${encodeURIComponent(userEmail)}`, { 
      method: 'GET',
      authToken 
    }),

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

