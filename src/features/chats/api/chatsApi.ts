import { apiClient } from '../../../api/client';
import { endpoints } from '../../../api/endpoints';
import type { PaginatedResult } from '../../../types/api';
import type { User } from '../../../types/user';

type UnknownRecord = Record<string, unknown>;

export const USERS_PAGE_SIZE = 20;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const stringValue = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

const normalizeAddress = (value: unknown) => {
  if (!isRecord(value)) return undefined;
  return {
    street: stringValue(value.street),
    city: stringValue(value.city),
    zipcode: stringValue(value.zipcode),
  };
};

const normalizeUser = (value: unknown, index: number): User | null => {
  if (!isRecord(value)) return null;

  const id = value.id;
  if (typeof id !== 'string' && typeof id !== 'number') return null;

  const nestedName = isRecord(value.name) ? value.name : undefined;
  const name =
    stringValue(value.name) ||
    stringValue(nestedName?.first) ||
    stringValue(nestedName?.full) ||
    `Contact ${index + 1}`;

  return {
    id,
    name,
    email: stringValue(value.email),
    username: stringValue(value.username),
    phone: stringValue(value.phone),
    website: stringValue(value.website),
    avatar: stringValue(value.avatar) || stringValue(value.avatarUrl),
    company: stringValue(value.company),
    address: normalizeAddress(value.address),
  };
};

export async function fetchUsers(
  offset = 0,
  limit = USERS_PAGE_SIZE,
): Promise<PaginatedResult<User>> {
  const response = await apiClient.get<unknown>(endpoints.users, {
    params: { limit, offset },
  });
  const payload = response.data;
  const rawItems = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.data)
    ? payload.data
    : isRecord(payload) && Array.isArray(payload.results)
    ? payload.results
    : [];
  const items = rawItems
    .map((item, index) => normalizeUser(item, index))
    .filter((item): item is User => item !== null);
  const total =
    isRecord(payload) && typeof payload.total === 'number'
      ? payload.total
      : undefined;
  const responseLimit =
    isRecord(payload) && typeof payload.limit === 'number'
      ? payload.limit
      : limit;
  const responseOffset =
    isRecord(payload) && typeof payload.offset === 'number'
      ? payload.offset
      : offset;
  const hasNextPage =
    total !== undefined
      ? responseOffset + responseLimit < total
      : items.length === responseLimit;
  const nextPage = hasNextPage ? responseOffset + responseLimit : undefined;

  return {
    items,
    meta: {
      total,
      limit: responseLimit,
      offset: responseOffset,
      nextPage,
      hasNextPage,
    },
  };
}
