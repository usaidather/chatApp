import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppImage, AppText, Stack } from '../../../components';
import { colors, spacing } from '../../../theme';
import type { User } from '../../../types/user';

interface ChatListItemProps {
  user: User;
  blocked: boolean;
  onPress: () => void;
  onProfilePress: () => void;
}

export const ChatListItem = memo(function ChatListItemView({
  user,
  blocked,
  onPress,
  onProfilePress,
}: ChatListItemProps) {
  const subtitle = blocked ? 'Blocked' : user.email || user.username;
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onProfilePress}
        accessibilityRole="button"
        accessibilityLabel={`Open ${user.name}'s profile`}
      >
        <AppImage
          source={user.avatar ? { uri: user.avatar } : undefined}
          width={48}
          height={48}
          borderRadius={24}
          accessible
          accessibilityLabel={`${user.name} profile picture`}
        />
      </Pressable>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Open conversation with ${user.name}`}
        style={({ pressed }) => [styles.details, pressed && styles.pressed]}
      >
        <Stack flex={1} gap="xs">
          <AppText variant="bodyMedium">{user.name}</AppText>
          {subtitle ? (
            <AppText
              color={blocked ? 'error' : 'textSecondary'}
              numberOfLines={1}
            >
              {subtitle}
            </AppText>
          ) : null}
        </Stack>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 72,
  },
  pressed: { backgroundColor: colors.secondary },
});
