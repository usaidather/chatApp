import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  AppButton,
  AppText,
  EmptyView,
  ErrorView,
  LoadingView,
  PageLayout,
  Stack,
} from '../../../components';
import { colors } from '../../../theme';
import type { ChatsStackParamList } from '../../../navigation/types';
import { useBlockedUsersStore } from '../../../store/blockedUsersStore';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { useMessages } from '../hooks/useMessages';
import { useSendMessage } from '../hooks/useSendMessage';

type Props = NativeStackScreenProps<ChatsStackParamList, 'Chat'>;

export function ChatScreen({ route }: Props) {
  const { userId, userName } = route.params;
  const [draft, setDraft] = useState('');
  const messages = useMessages(userId);
  const sendMessage = useSendMessage(userId);
  const blocked = useBlockedUsersStore(state =>
    state.blockedUserIds.includes(userId),
  );
  const toggleBlocked = useBlockedUsersStore(state => state.toggleBlocked);
  const items = messages.data ?? [];

  const send = () => {
    const body = draft.trim();
    if (!body || blocked || sendMessage.isPending) return;
    setDraft('');
    sendMessage.mutate(body, { onError: () => setDraft(body) });
  };

  if (messages.isLoading)
    return (
      <PageLayout>
        <LoadingView message={`Loading ${userName}'s messages...`} />
      </PageLayout>
    );
  if (messages.isError)
    return (
      <PageLayout>
        <ErrorView
          message="Unable to load messages. Please try again."
          onRetry={() => {
            messages.refetch();
          }}
        />
      </PageLayout>
    );

  return (
    <PageLayout horizontalPadding="none" keyboardAvoiding>
      <Stack flex={1}>
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              outgoing={
                item.outgoing === true ||
                item.status === 'sending' ||
                item.status === 'failed'
              }
            />
          )}
          ListEmptyComponent={
            <EmptyView
              title="No messages yet"
              description="Start the conversation below."
            />
          }
          contentContainerStyle={items.length === 0 ? styles.empty : undefined}
          style={styles.list}
        />
        {blocked ? (
          <Stack padding="md" gap="sm" style={styles.blocked}>
            <AppText color="error" align="center">
              You have blocked this user.
            </AppText>
            <AppButton
              title="Unblock user"
              variant="outline"
              onPress={() => toggleBlocked(userId)}
            />
          </Stack>
        ) : (
          <MessageInput
            value={draft}
            onChangeText={setDraft}
            onSend={send}
            loading={sendMessage.isPending}
          />
        )}
      </Stack>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  empty: { flexGrow: 1 },
  blocked: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.surface,
  },
});
