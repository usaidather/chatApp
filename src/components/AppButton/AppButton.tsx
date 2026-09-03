import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { ReactNode } from 'react';

import { AppText } from '../AppText';
import { Stack } from '../Stack';
import { colors, spacing } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

export interface AppButtonProps
  extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...pressableProps
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  const appearance = buttonAppearances[variant];
  const sizeStyle = buttonSizes[size];

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        appearance.base,
        sizeStyle,
        fullWidth && styles.fullWidth,
        isDisabled && appearance.disabled,
        pressed && !isDisabled && appearance.pressed,
        style,
      ]}
    >
      <Stack direction="row" align="center" justify="center" gap="sm">
        {loading ? (
          <ActivityIndicator color={appearance.indicator} />
        ) : (
          leftIcon
        )}
        <AppText
          color={isDisabled ? appearance.disabledText : appearance.text}
          style={[styles.label, textStyle]}
        >
          {title}
        </AppText>
        {!loading && rightIcon}
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  label: {
    textAlign: 'center',
  },
});

const buttonSizes: Record<ButtonSize, ViewStyle> = {
  small: { minHeight: 40, paddingHorizontal: spacing.md },
  medium: { minHeight: 48, paddingHorizontal: spacing.lg },
  large: { minHeight: 56, paddingHorizontal: spacing.xl },
};

const buttonAppearances: Record<
  ButtonVariant,
  {
    base: ViewStyle;
    pressed: ViewStyle;
    disabled: ViewStyle;
    text: 'white' | 'primary' | 'textPrimary' | 'textDisabled';
    disabledText: 'textDisabled';
    indicator: string;
  }
> = {
  primary: {
    base: { backgroundColor: colors.primary, borderColor: colors.primary },
    pressed: {
      backgroundColor: colors.primaryPressed,
      borderColor: colors.primaryPressed,
    },
    disabled: { backgroundColor: colors.divider, borderColor: colors.divider },
    text: 'white',
    disabledText: 'textDisabled',
    indicator: colors.white,
  },
  secondary: {
    base: { backgroundColor: colors.secondary, borderColor: colors.secondary },
    pressed: {
      backgroundColor: colors.secondaryPressed,
      borderColor: colors.secondaryPressed,
    },
    disabled: { backgroundColor: colors.divider, borderColor: colors.divider },
    text: 'primary',
    disabledText: 'textDisabled',
    indicator: colors.primary,
  },
  outline: {
    base: { backgroundColor: colors.transparent, borderColor: colors.border },
    pressed: { backgroundColor: colors.secondary, borderColor: colors.primary },
    disabled: { borderColor: colors.divider },
    text: 'textPrimary',
    disabledText: 'textDisabled',
    indicator: colors.primary,
  },
  ghost: {
    base: {
      backgroundColor: colors.transparent,
      borderColor: colors.transparent,
    },
    pressed: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    },
    disabled: {
      backgroundColor: colors.transparent,
      borderColor: colors.transparent,
    },
    text: 'primary',
    disabledText: 'textDisabled',
    indicator: colors.primary,
  },
};
