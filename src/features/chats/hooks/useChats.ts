import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchUsers } from '../api/chatsApi';

export function useChats() {
  return useInfiniteQuery({
    queryKey: ['users'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchUsers(pageParam),
    getNextPageParam: lastPage =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextPage : undefined,
  });
}
