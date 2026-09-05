import { fetchUsers } from '../../chats/api/chatsApi';
import type { User } from '../../../types/user';

export async function fetchProfile(
  userId: number | string,
): Promise<User | null> {
  const result = await fetchUsers();
  return result.items.find(user => String(user.id) === String(userId)) ?? null;
}
