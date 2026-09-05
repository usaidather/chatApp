import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMessage } from '../api/messagesApi';
import type { Message } from '../../../types/message';

export function useSendMessage(userId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) =>
      createMessage({ title: 'Message', body, userId }),
    onMutate: async body => {
      await queryClient.cancelQueries({ queryKey: ['posts', userId] });
      const queryKey = ['posts', userId] as const;
      const previousMessages = queryClient.getQueryData<Message[]>(queryKey);
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        body,
        userId,
        status: 'sending',
        outgoing: true,
      };
      queryClient.setQueryData<Message[]>(queryKey, [
        ...(previousMessages ?? []),
        optimisticMessage,
      ]);
      return { previousMessages };
    },
    onError: (_error, _body, context) => {
      queryClient.setQueryData(['posts', userId], context?.previousMessages);
    },
    onSuccess: (message, _body) => {
      queryClient.setQueryData<Message[]>(['posts', userId], current => {
        const messages = current ?? [];
        const withoutOptimistic = messages.filter(
          item => !String(item.id).startsWith('temp-'),
        );
        return [...withoutOptimistic, { ...message, outgoing: true }];
      });
    },
  });
}
