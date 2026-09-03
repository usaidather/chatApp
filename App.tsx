/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  AppButton,
  AppImage,
  AppText,
  PageLayout,
  Stack,
} from './src/components';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <PageLayout horizontalPadding="md" verticalPadding="md">
      <Stack gap="lg">
        <AppText variant="heading">Messages</AppText>

        <Stack direction="row" align="center" gap="md">
          <AppImage
            source={{ uri: 'https://i.pravatar.cc/96?img=12' }}
            width={48}
            height={48}
            borderRadius={24}
            accessible
            accessibilityLabel="John Doe profile picture"
          />

          <Stack flex={1} gap="xs">
            <AppText variant="bodyMedium">John Doe</AppText>
            <AppText
              variant="bodySmall"
              color="textSecondary"
              numberOfLines={1}
            >
              Hey, how are you doing?
            </AppText>
          </Stack>
        </Stack>

        <AppButton title="Continue" fullWidth onPress={() => {}} />
      </Stack>
    </PageLayout>
  );
}

export default App;
