import { ActivityIndicator, StyleSheet } from 'react-native';

import { AppText } from './AppText';
import { Stack } from './Stack';
import { colors, spacing } from '../theme';

export function LoadingView({ message = 'Loading...' }: { message?: string }) {
  return (
    <Stack flex={1} align="center" justify="center" gap="sm" padding="lg">
      <ActivityIndicator color={colors.primary} />
      <AppText color="textSecondary">{message}</AppText>
    </Stack>
  );
}

export const loadingStyles = StyleSheet.create({
  footer: { paddingVertical: spacing.md },
});
