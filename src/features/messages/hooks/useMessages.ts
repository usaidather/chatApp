import { useQuery } from '@tanstack/react-query';

import { fetchMessages } from '../api/messagesApi';

export function useMessages(userId: number | string) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchMessages(userId),
  });
}
