import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';
import type { ColorKey, SpacingKey } from '../../theme';

export interface PageLayoutProps extends Omit<ViewProps, 'style'> {
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  horizontalPadding?: SpacingKey | 'none';
  verticalPadding?: SpacingKey | 'none';
  backgroundColor?: ColorKey;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  safeAreaEdges?: SafeAreaViewProps['edges'];
}

export function PageLayout({
  children,
  scrollable = false,
  keyboardAvoiding = false,
  horizontalPadding = 'md',
  verticalPadding = 'none',
  backgroundColor = 'background',
  style,
  contentContainerStyle,
  safeAreaEdges,
  ...viewProps
}: PageLayoutProps) {
  const contentStyle = [
    styles.content,
    horizontalPadding !== 'none' && {
      paddingHorizontal: spacing[horizontalPadding],
    },
    verticalPadding !== 'none' && { paddingVertical: spacing[verticalPadding] },
    contentContainerStyle,
  ];

  const content = scrollable ? (
    <ScrollView contentContainerStyle={contentStyle}>{children}</ScrollView>
  ) : (
    <View style={contentStyle}>{children}</View>
  );

  const body = keyboardAvoiding ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView
      {...viewProps}
      edges={safeAreaEdges}
      style={[
        styles.container,
        { backgroundColor: colors[backgroundColor] },
        style,
      ]}
    >
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1 },
  flex: { flex: 1 },
});
