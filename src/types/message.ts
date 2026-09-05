export interface Message {
  id: number | string;
  title?: string;
  body: string;
  userId?: number | string;
  senderId?: number | string;
  recipientId?: number | string;
  createdAt?: string;
  status?: 'sending' | 'sent' | 'failed';
  outgoing?: boolean;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number | string;
}
