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

  return (
    <Image
      {...imageProps}
      style={[
        styles.base,
        {
          width: scaleWidth(width, windowWidth),
          height: scaleHeight(height, windowHeight),
          borderRadius,
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
