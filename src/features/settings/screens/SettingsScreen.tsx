import { AppText, PageLayout, Stack } from '../../../components';

export function SettingsScreen() {
  return (
    <PageLayout verticalPadding="md">
      <Stack gap="lg">
        <AppText variant="heading">Usaid Ather</AppText>
        <AppText color="textSecondary">App version: 0.0.1</AppText>
      </Stack>
    </PageLayout>
  );
}
