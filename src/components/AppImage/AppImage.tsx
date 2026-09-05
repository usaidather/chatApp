import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import type { ImageProps, ImageStyle } from 'react-native';

import { scaleHeight, scaleWidth } from '../../theme';

export interface AppImageProps extends Omit<ImageProps, 'style'> {
  width: number;
  height: number;
  borderRadius?: number;
  style?: ImageStyle | ImageStyle[];
}

export function AppImage({
  width,
  height,
  borderRadius,
  style,
  ...imageProps
}: AppImageProps) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const resolvedWidth = scaleWidth(width, windowWidth);
  const resolvedHeight = scaleWidth(width, windowWidth);
  const resolvedBorderRadius =
    borderRadius !== undefined && width === height
      ? Math.min(resolvedWidth, resolvedHeight) / 2
      : borderRadius;

  return (
    <Image
      {...imageProps}
      style={[
        styles.base,
        {
          width: resolvedWidth,
          height: resolvedHeight,
          borderRadius: resolvedBorderRadius,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
