import { StyleSheet, TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';

import { AppButton, Stack } from '../../../components';
import { colors, spacing } from '../../../theme';

interface MessageInputProps extends Pick<TextInputProps, 'onFocus' | 'onBlur'> {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function MessageInput({
  value,
  onChangeText,
  onSend,
  disabled = false,
  loading = false,
  ...inputProps
}: MessageInputProps) {
  const canSend = value.trim().length > 0 && !disabled && !loading;
  return (
    <Stack
      direction="row"
      align="flex-end"
      gap="sm"
      padding="sm"
      style={styles.container}
    >
      <TextInput
        {...inputProps}
        value={value}
        onChangeText={onChangeText}
        placeholder="Write a message..."
        placeholderTextColor={colors.textSecondary}
        multiline
        maxLength={1000}
        editable={!disabled && !loading}
        style={styles.input}
        accessibilityLabel="Message"
      />
      <AppButton
        title="Send"
        size="small"
        onPressIn={onSend}
        disabled={!canSend}
        loading={loading}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    maxHeight: 110,
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
  },
});
