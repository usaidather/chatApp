import {
  AppButton,
  AppImage,
  AppText,
  ErrorView,
  LoadingView,
  PageLayout,
  Stack,
} from '../../../components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ChatsStackParamList } from '../../../navigation/types';
import { useChats } from '../../chats/hooks/useChats';
import { useProfile } from '../hooks/useProfile';
import { useBlockedUsersStore } from '../../../store/blockedUsersStore';

type Props = NativeStackScreenProps<ChatsStackParamList, 'Profile'>;

export function ProfileScreen({ route }: Props) {
  const users = useChats();
  const profile = useProfile(route.params.userId);
  const blocked = useBlockedUsersStore(state =>
    state.blockedUserIds.includes(route.params.userId),
  );
  const toggleBlocked = useBlockedUsersStore(state => state.toggleBlocked);
  if (users.isLoading || profile.isLoading)
    return (
      <PageLayout>
        <LoadingView message="Loading profile..." />
      </PageLayout>
    );
  if (users.isError || profile.isError)
    return (
      <PageLayout>
        <ErrorView
          message="Unable to load profile. Please try again."
          onRetry={() => {
            users.refetch();
            profile.refetch();
          }}
        />
      </PageLayout>
    );
  if (!profile.data)
    return (
      <PageLayout>
        <Stack flex={1} align="center" justify="center">
          <AppText>No profile available.</AppText>
        </Stack>
      </PageLayout>
    );

  const user = profile.data;
  return (
    <PageLayout verticalPadding="md">
      <Stack align="center" gap="md">
        <AppImage
          source={user.avatar ? { uri: user.avatar } : undefined}
          width={96}
          height={96}
          borderRadius={48}
          accessible
          accessibilityLabel={`${user.name} profile picture`}
        />
        <AppText variant="heading" align="center">
          {user.name}
        </AppText>
        {user.email ? (
          <AppText color="textSecondary">{user.email}</AppText>
        ) : null}
        {user.phone ? (
          <AppText color="textSecondary">{user.phone}</AppText>
        ) : null}
        {user.username ? (
          <AppText color="textSecondary">@{user.username}</AppText>
        ) : null}
        <AppButton
          title={blocked ? 'Unblock user' : 'Block user'}
          variant="outline"
          onPress={() => toggleBlocked(route.params.userId)}
        />
      </Stack>
    </PageLayout>
  );
}
