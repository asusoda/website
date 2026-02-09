import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { storefrontAPI, Order, APIError } from '../lib/api';

export const useUserOrders = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!isSignedIn || !user?.emailAddresses?.[0]?.emailAddress) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication token not available');
      }

      const email = user.emailAddresses[0].emailAddress;
      const data = await storefrontAPI.getOrders(email, token);
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isSignedIn, user, getToken]);

  return { orders, loading, error, refetch: fetchOrders };
};
