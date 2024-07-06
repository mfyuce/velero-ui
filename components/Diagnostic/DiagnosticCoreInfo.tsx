import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Group,
  List,
  Modal,
  Text,
  ThemeIcon,
  rem,
} from '@mantine/core';

import { IconCheck, IconCircleCheck, IconExternalLink } from '@tabler/icons-react';

import { DiagnosticLink } from './DiagnosticLink';

import { DiagnosticItem } from './DIagnosticItem';

import { useDisclosure } from '@mantine/hooks';

import { useDiagnosticCore } from '@/hooks/useDiagnosticCore';

export const DiagnosticCoreInfo = () => {
  const { uiURL, apiURL, apiArch, origins, k8sHealth, stateManager } = useDiagnosticCore();

  const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <>
      <Box>
        <Button onClick={open} variant="default" size="compact-xs">
          <Text size="sm" mr={5}>
            Core
          </Text>
          {stateManager.allTrue && !stateManager.hasWarnings && (
            <>
              <Group gap={0}>
                <IconCheck color="green" />{' '}
                <Text size="sm" c="green">
                  All Check Passed
                </Text>
              </Group>
            </>
          )}
          {stateManager.allTrue && stateManager.hasWarnings && (
            <>
              <Group gap={0}>
                <IconCheck color="orange" />{' '}
                <Text c="orange" size="sm">
                  Check warning
                </Text>
              </Group>
            </>
          )}
          {!stateManager.allTrue && (
            <>
              <Group gap={0}>
                <IconCheck color="red" size={20} />
                <Text c="red" size="sm">
                  Error
                </Text>
              </Group>
            </>
          )}
        </Button>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Core diagnostic"
        centered
        size="auto"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}

        <Box>
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="dimmed" size={24} radius="xl">
                <IconCircleCheck color="green" style={{ width: rem(24), height: rem(24) }} />
              </ThemeIcon>
            }
          >
            {/* UI URL*/}
            <DiagnosticItem
              label="Get UI URL"
              value={uiURL !== undefined ? uiURL : ''}
              ok={stateManager.getVariable('getUiURL')}
            />

            {/* API URL */}
            <DiagnosticItem
              label="Get API URL"
              value={apiURL !== undefined ? apiURL : ''}
              ok={stateManager.getVariable('getApiURL')}
              actionIcon={
                <ActionIcon
                  component="a"
                  href={apiURL}
                  size="sm"
                  aria-label="Open in a new tab"
                  target="_blank"
                >
                  <IconExternalLink size={20} />
                </ActionIcon>
              }
            />

            {/* API reachable */}
            <DiagnosticItem
              label="Check API reachable"
              value=""
              ok={stateManager.getVariable('checkApiReacheable')}
              actionIcon={<DiagnosticLink ApiURL={apiURL} />}
            />

            {/* API arch */}
            <DiagnosticItem
              label="Get API architecture"
              value={`${apiArch?.payload.arch} ${apiArch?.payload.platform || ''}`}
              ok={stateManager.getVariable('getArchitecture')}
            />

            {/* Origins */}
            <DiagnosticItem
              label="Get Origins"
              value={origins ? origins?.join(', ') : ''}
              ok={stateManager.getVariable('getOrigins')}
            />

            {/* Validate Origins */}
            <DiagnosticItem
              label="Validate Origins"
              value=""
              ok={stateManager.getVariable('validateOrigins')}
              warning={origins.length > 0 && origins.includes('*')}
              message={
                origins.length > 0 && origins.includes('*') ? 'Warning: ORIGINS contains "*"' : ''
              }
              message2={
                origins.length == 0 || (origins.length > 0 && !origins.includes(uiURL))
                  ? `Error: Origins must contain ${uiURL}`
                  : ''
              }
              message3={
                !origins.includes('*') && origins.length > 0 && !origins.includes(uiURL)
                  ? "If you have problems you can try to use '*'"
                  : ''
              }
            />

            {/* Cluster Online */}
            <DiagnosticItem
              label="Get cluster data"
              value=""
              ok={stateManager.getVariable('getClusterHealth')}
              message={`Online: ${k8sHealth?.payload?.cluster_online ? 'true' : 'false'}`}
              message2={`Nodes: ${k8sHealth?.payload?.nodes?.total}`}
              message3={`Nodes not ready: ${k8sHealth?.payload?.nodes?.in_error}`}
            />
          </List>
        </Box>
      </Modal>
    </>
  );
};
