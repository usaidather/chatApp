import { apiClient } from '../../../api/client';
import { endpoints } from '../../../api/endpoints';
import type { CreatePostPayload, Message } from '../../../types/message';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const stringValue = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

const normalizeMessage = (value: unknown): Message | null => {
  if (!isRecord(value)) return null;
  const id = value.id;
  const body =
    stringValue(value.body) ||
    stringValue(value.content) ||
    stringValue(value.text);
  if ((typeof id !== 'string' && typeof id !== 'number') || !body) return null;

  return {
    id,
    title: stringValue(value.title),
    body,
    userId:
      typeof value.userId === 'string' || typeof value.userId === 'number'
        ? value.userId
        : undefined,
    senderId:
      typeof value.senderId === 'string' || typeof value.senderId === 'number'
        ? value.senderId
        : undefined,
    recipientId:
      typeof value.recipientId === 'string' ||
      typeof value.recipientId === 'number'
        ? value.recipientId
        : undefined,
    createdAt: stringValue(value.createdAt) || stringValue(value.created_at),
    status: 'sent',
  };
};

export async function fetchMessages(
  userId: number | string,
): Promise<Message[]> {
  const response = await apiClient.get<unknown>(endpoints.posts, {
    params: { userId },
  });
  const payload = response.data;
  const rawItems = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.data)
    ? payload.data
    : isRecord(payload) && Array.isArray(payload.posts)
    ? payload.posts
    : isRecord(payload) && Array.isArray(payload.results)
    ? payload.results
    : [];
  return rawItems
    .map(item => normalizeMessage(item))
    .filter((item): item is Message => item !== null);
}

export async function createMessage(
  payload: CreatePostPayload,
): Promise<Message> {
  const response = await apiClient.post<unknown>(endpoints.posts, payload);
  const message = normalizeMessage(response.data);
  if (!message) throw new Error('The server returned an invalid message.');
  return message;
}
