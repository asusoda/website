import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { pointsAPI, APIError, ERROR_MESSAGES } from '../lib/api';

interface UserPointsData {
  total_points: number;
  points_breakdown: Array<{
    id: number;
    points: number;
    event: string;
    timestamp: string;
  }>;
}

export const useUserPoints = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [userPoints, setUserPoints] = useState<UserPointsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoints = async () => {
    if (!isSignedIn || !user?.emailAddresses?.[0]?.emailAddress) {
      setLoading(false);
      setUserPoints(null);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication token not available');
      }

      const email = user.emailAddresses[0].emailAddress;
      const data = await pointsAPI.getUserPoints(email, token);
      setUserPoints(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch points:', err);
      
      if (err instanceof APIError && err.status === 404) {
        setError(ERROR_MESSAGES.NO_POINTS_RECORD);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load points balance');
      }
      setUserPoints(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [isSignedIn, user, getToken]);

  return { userPoints, loading, error, refetch: fetchPoints };
};
