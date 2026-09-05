import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  EmptyView,
  ErrorView,
  LoadingView,
  PageLayout,
  AppText,
} from '../../../components';
import { colors, spacing } from '../../../theme';
import type { User } from '../../../types/user';
import type { ChatsStackParamList } from '../../../navigation/types';
import { useBlockedUsersStore } from '../../../store/blockedUsersStore';
import { useChats } from '../hooks/useChats';
import { ChatListItem } from '../components/ChatListItem';

type Props = NativeStackScreenProps<ChatsStackParamList, 'Chats'>;

export function ChatsScreen({ navigation }: Props) {
  const chats = useChats();
  const blockedUserIds = useBlockedUsersStore(state => state.blockedUserIds);
  const users = chats.data?.pages.flatMap(page => page.items) ?? [];
  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <ChatListItem
        user={item}
        blocked={blockedUserIds.includes(item.id)}
        onProfilePress={() =>
          navigation.navigate('Profile', { userId: item.id })
        }
        onPress={() =>
          navigation.navigate('Chat', {
            userId: item.id,
            userName: item.name,
            avatar: item.avatar,
          })
        }
      />
    ),
    [blockedUserIds, navigation],
  );

  if (chats.isLoading)
    return (
      <PageLayout horizontalPadding="none">
        <LoadingView message="Loading contacts..." />
      </PageLayout>
    );
  if (chats.isError && users.length === 0)
    return (
      <PageLayout>
        <ErrorView
          message="Unable to load contacts. Please try again."
          onRetry={() => chats.refetch()}
        />
      </PageLayout>
    );

  return (
    <PageLayout horizontalPadding="sm" verticalPadding="none">
      <FlatList
        data={users}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <AppText variant="heading" style={styles.title}>
              Chats
            </AppText>
            {chats.isError ? (
              <AppText color="textSecondary" style={styles.cachedNotice}>
                Showing your last cached contacts. Pull to retry when online.
              </AppText>
            ) : null}
          </>
        }
        ListEmptyComponent={
          <EmptyView
            title="No contacts yet"
            description="There are no contacts to show."
          />
        }
        ListFooterComponent={
          chats.isFetchingNextPage ? (
            <ActivityIndicator color={colors.primary} style={styles.footer} />
          ) : undefined
        }
        onEndReached={() => {
          if (!chats.isError && chats.hasNextPage && !chats.isFetchingNextPage)
            chats.fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={chats.isRefetching}
            onRefresh={() => {
              chats.refetch();
            }}
            tintColor={colors.primary}
          />
        }
        style={styles.list}
      />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  title: { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  cachedNotice: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  footer: { paddingVertical: spacing.md },
});
