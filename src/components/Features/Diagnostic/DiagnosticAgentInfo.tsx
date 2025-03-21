'use client';

import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core';

import { IconCheck, IconPlugConnected, IconRefresh, IconPlugConnectedX } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';

import { useAgentStatus } from '@/contexts/AgentContext';
import { useAppStatus } from '@/contexts/AppContext';

import { useDiagnosticAgent } from '@/hooks/diagnostic/useDiagnosticAgent';

import { DiagnosticAgentInfoData } from './DiagnosticAgentInfoData';

export const DiagnosticAgentInfo = () => {
  const { uiURL, apiURL, apiArch, origins, k8sHealth, stateManager, reload, setReload } =
    useDiagnosticAgent();
  const appValues = useAppStatus();

  const [opened, { open, close }] = useDisclosure(false);

  const agentValues = useAgentStatus();

  return (
    <>
      <Group gap={5}>
        <Text size="sm">Agent:</Text>
        <Text size="sm" fw={700}>
          {agentValues?.currentAgent?.name}
        </Text>

        <Group gap={0}>
          {!agentValues.isAgentAvailable && (
            <>
              <IconPlugConnectedX color="red" size={16} />
              <Text size="sm">Not Connected!</Text>
            </>
          )}
          {agentValues.isAgentAvailable && (
            <>
              <IconPlugConnected color="green" size={16} />
              <Text size="sm">Connected</Text>
            </>
          )}
        </Group>

        <Group gap={0}>
          {stateManager.allTrue && !stateManager.hasWarnings && (
            <>
              <Group gap={0}>
                <IconCheck color="green" size={16} />
                <Text size="sm" c="green">
                  All Check Passed
                </Text>
              </Group>
            </>
          )}
          {stateManager.allTrue && stateManager.hasWarnings && (
            <>
              <Group gap={0}>
                <IconCheck color="orange" size={16} />
                <Text c="orange" size="sm">
                  Check warning
                </Text>
              </Group>
            </>
          )}
          {!stateManager.allTrue && (
            <>
              <Group gap={0}>
                <IconCheck color="red" size={16} />
                <Text c="red" size="sm">
                  Error
                </Text>
              </Group>
            </>
          )}
        </Group>
        {!appValues.isAuthenticated && (
          <Button onClick={open} variant="outline" size="compact-xs">
            Info
          </Button>
        )}
        <ActionIcon
          variant="outline"
          size="compact-xs"
          aria-label="Settings"
          onClick={() => {
            setReload(reload + 1);
          }}
        >
          <IconRefresh size={18} stroke={1.5} />
        </ActionIcon>
      </Group>

      <Modal
        opened={opened}
        onClose={close}
        title="Agent diagnostic"
        centered
        size="auto"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}

        <DiagnosticAgentInfoData
          uiURL={uiURL}
          apiURL={apiURL}
          apiArch={apiArch}
          origins={origins}
          k8sHealth={k8sHealth}
          stateManager={stateManager}
        />
      </Modal>
    </>
  );
};
