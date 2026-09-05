import { AppText } from './AppText';
import { Stack } from './Stack';

export function EmptyView({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Stack flex={1} align="center" justify="center" gap="sm" padding="lg">
      <AppText variant="subtitle" align="center">
        {title}
      </AppText>
      {description ? (
        <AppText color="textSecondary" align="center">
          {description}
        </AppText>
      ) : null}
    </Stack>
  );
}
