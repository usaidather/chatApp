import { StyleSheet, View } from 'react-native';
import type { ViewProps, ViewStyle } from 'react-native';

import { spacing } from '../../theme';
import type { SpacingKey } from '../../theme';

type StackAlign = NonNullable<ViewStyle['alignItems']>;
type StackJustify = NonNullable<ViewStyle['justifyContent']>;

export interface StackProps extends Omit<ViewProps, 'style'> {
  direction?: 'row' | 'column';
  gap?: SpacingKey;
  align?: StackAlign;
  justify?: StackJustify;
  flex?: number;
  wrap?: boolean;
  padding?: SpacingKey;
  paddingHorizontal?: SpacingKey;
  paddingVertical?: SpacingKey;
  margin?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
  style?: ViewStyle | ViewStyle[];
}

export function Stack({
  direction = 'column',
  gap,
  align,
  justify,
  flex,
  wrap = false,
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  style,
  children,
  ...viewProps
}: StackProps) {
  return (
    <View
      {...viewProps}
      style={[
        styles.base,
        {
          flex,
          flexDirection: direction,
          ...(wrap ? styles.wrap : styles.noWrap),
          alignItems: align,
          justifyContent: justify,
          gap: gap ? spacing[gap] : undefined,
          padding: padding ? spacing[padding] : undefined,
          paddingHorizontal: paddingHorizontal
            ? spacing[paddingHorizontal]
            : undefined,
          paddingVertical: paddingVertical
            ? spacing[paddingVertical]
            : undefined,
          margin: margin ? spacing[margin] : undefined,
          marginHorizontal: marginHorizontal
            ? spacing[marginHorizontal]
            : undefined,
          marginVertical: marginVertical ? spacing[marginVertical] : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {},
  wrap: { flexWrap: 'wrap' },
  noWrap: { flexWrap: 'nowrap' },
});
