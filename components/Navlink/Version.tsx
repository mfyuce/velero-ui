import { useEffect } from 'react';

import { Alert, Code, Group, Stack, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { useApiGet } from '@/hooks/useApiGet';
import { useAgentStatus } from '@/contexts/AgentStatusContext';

export const Version = () => {
  const { data, getData, error, fetching } = useApiGet();
  const agentValues = useAgentStatus();
  useEffect(() => {
    if (agentValues.isAgentAvailable) {
      if (process.env.NODE_ENV === 'development')
        console.log(`%cuseEffect 630 has been called`, `color: green; font-weight: bold;`);
      getData({ url: '/v1/setup/version' });
    }
  }, [agentValues.isAgentAvailable]);

  if (data === undefined) return <></>;

  return (
    <>
      <Stack p={10} visibleFrom="sm">
        <Group justify="space-between" gap={0}>
          <Text fw={400} size="sm">
            Velero Client:
          </Text>
          <Code fw={700}>{data.payload?.client?.version}</Code>
        </Group>
        <Group justify="space-between" gap={0}>
          <Text fw={400} size="sm">
            Velero Server:
          </Text>
          <Code fw={700}>{data.payload?.server?.version}</Code>
        </Group>
        {data.payload.warning && (
          <Group>
            <Alert
              variant="outline"
              color="yellow"
              title="Warning"
              icon={<IconAlertTriangle />}
              p={5}
            >
              <Text fw={500} size="xs">
                {data.payload.warning}
              </Text>
            </Alert>
          </Group>
        )}
      </Stack>
    </>
  );
};
