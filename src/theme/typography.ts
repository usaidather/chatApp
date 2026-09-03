import type { TextStyle } from 'react-native';

export const typography = {
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyMedium: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  subtitle: { fontSize: 18, lineHeight: 26, fontWeight: '600' },
  title: { fontSize: 22, lineHeight: 30, fontWeight: '600' },
  heading: { fontSize: 28, lineHeight: 36, fontWeight: '700' },
} satisfies Record<
  string,
  Pick<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight'>
>;

export type TypographyVariant = keyof typeof typography;
