import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import type { TextProps, TextStyle } from 'react-native';

import { colors, scaleFont, typography } from '../../theme';
import type { ColorKey, TypographyVariant } from '../../theme';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorKey;
  align?: TextStyle['textAlign'];
}

export function AppText({
  variant = 'body',
  color = 'textPrimary',
  align,
  style,
  children,
  ...textProps
}: AppTextProps) {
  const { width } = useWindowDimensions();
  const variantStyle = typography[variant];

  return (
    <Text
      {...textProps}
      style={[
        styles.base,
        variantStyle,
        {
          color: colors[color],
          fontSize: scaleFont(variantStyle.fontSize, width),
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
