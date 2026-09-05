import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';

import { colors, scaleFont } from '../theme';
import { ChatsScreen } from '../features/chats/screens/ChatsScreen';
import { ChatScreen } from '../features/messages/screens/ChatScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { SettingsScreen } from '../features/settings/screens/SettingsScreen';
import type { ChatsStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const ChatsStack = createNativeStackNavigator<ChatsStackParamList>();

function ChatsNavigator() {
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen name="Chats" component={ChatsScreen} />
      <ChatsStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <ChatHeaderTitle userName={route.params.userName} />
          ),
        })}
      />
      <ChatsStack.Screen name="Profile" component={ProfileScreen} />
    </ChatsStack.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Text
            style={{ color, fontSize: size - 2 }}
            accessibilityLabel={`${route.name} icon`}
          >
            {tabIcons[route.name]}
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function ChatHeaderTitle({ userName }: { userName: string }) {
  const { width } = useWindowDimensions();

  return (
    <Text style={[styles.title, { fontSize: scaleFont(17, width) }]}>
      {userName}
    </Text>
  );
}

const tabIcons: Record<keyof TabParamList, string> = {
  Chats: '☷',
  Settings: '⚙',
};

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
