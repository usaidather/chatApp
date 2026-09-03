export const colors = {
  primary: '#2563EB',
  primaryPressed: '#1D4ED8',
  secondary: '#E8F0FE',
  secondaryPressed: '#D8E5FC',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textDisabled: '#94A3B8',
  border: '#CBD5E1',
  divider: '#E2E8F0',
  success: '#15803D',
  warning: '#B45309',
  error: '#B91C1C',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;
