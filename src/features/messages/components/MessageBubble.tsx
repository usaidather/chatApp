import { StyleSheet } from 'react-native';

import { AppText, Stack } from '../../../components';
import { colors, spacing } from '../../../theme';
import type { Message } from '../../../types/message';

export function MessageBubble({
  message,
  outgoing,
}: {
  message: Message;
  outgoing: boolean;
}) {
  return (
    <Stack
      align={outgoing ? 'flex-end' : 'flex-start'}
      paddingHorizontal="md"
      paddingVertical="xs"
    >
      <Stack
        style={[styles.bubble, outgoing ? styles.outgoing : styles.incoming]}
      >
        <AppText color={outgoing ? 'white' : 'textPrimary'}>
          {message.body}
        </AppText>
        {message.status === 'sending' ? (
          <AppText variant="caption" color="textSecondary">
            Sending...
          </AppText>
        ) : null}
        {message.status === 'failed' ? (
          <AppText variant="caption" color="error">
            Failed to send
          </AppText>
        ) : null}
      </Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  bubble: { maxWidth: '82%', borderRadius: 16, padding: spacing.md },
  outgoing: { backgroundColor: colors.primary },
  incoming: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
  },
});
