import { AppButton } from './AppButton';
import { AppText } from './AppText';
import { Stack } from './Stack';

export function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <Stack flex={1} align="center" justify="center" gap="md" padding="lg">
      <AppText variant="subtitle" align="center">
        Something went wrong
      </AppText>
      <AppText color="textSecondary" align="center">
        {message}
      </AppText>
      <AppButton title="Try again" variant="outline" onPress={onRetry} />
    </Stack>
  );
}
