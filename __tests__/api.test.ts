import { apiClient } from '../src/api/client';
import { fetchUsers } from '../src/features/chats/api/chatsApi';
import {
  createMessage,
  fetchMessages,
} from '../src/features/messages/api/messagesApi';

describe('API normalization', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('normalizes paginated users and calculates the next page', async () => {
    jest.spyOn(apiClient, 'get').mockResolvedValueOnce({
      data: {
        total: 25,
        limit: 20,
        offset: 0,
        results: [
          {
            id: 1,
            name: { first: 'Ada' },
            avatarUrl: 'https://example.com/ada.png',
          },
          { id: 2, name: 'Grace' },
          { name: 'Invalid user' },
        ],
      },
    } as never);

    await expect(fetchUsers()).resolves.toEqual({
      items: [
        {
          id: 1,
          name: 'Ada',
          avatar: 'https://example.com/ada.png',
        },
        { id: 2, name: 'Grace' },
      ],
      meta: {
        total: 25,
        limit: 20,
        offset: 0,
        nextPage: 20,
        hasNextPage: true,
      },
    });
  });

  it('normalizes message bodies from supported API fields', async () => {
    jest.spyOn(apiClient, 'get').mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, content: 'Hello', userId: 7 },
          { id: 2, text: 'World' },
          { id: 3 },
        ],
      },
    } as never);

    await expect(fetchMessages(7)).resolves.toEqual([
      { id: 1, body: 'Hello', userId: 7, status: 'sent' },
      { id: 2, body: 'World', status: 'sent' },
    ]);
  });

  it('rejects invalid create-message responses', async () => {
    jest
      .spyOn(apiClient, 'post')
      .mockResolvedValueOnce({ data: { id: 1 } } as never);

    await expect(
      createMessage({ title: 'Message', body: 'Hello', userId: 7 }),
    ).rejects.toThrow('invalid message');
  });
});
