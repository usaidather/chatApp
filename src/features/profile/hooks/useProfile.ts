import { useQuery } from '@tanstack/react-query';

import { fetchProfile } from '../api/profileApi';

export function useProfile(userId: number | string | undefined) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId as number | string),
    enabled: userId !== undefined,
  });
}
