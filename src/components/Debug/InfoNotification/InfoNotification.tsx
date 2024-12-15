'use client';

import { useRef, useEffect, useContext } from 'react';

import {
  CopyButton,
  ActionIcon,
  Tooltip,
  rem,
  Group,
  Text,
  ScrollArea,
  Code,
  Box,
  Pill,
  Stack,
} from '@mantine/core';

import { IconCopy, IconCheck } from '@tabler/icons-react';

import { useAppState } from '@/contexts/AppStateContext';

export default function InfoNotification() {
  //const value = useContext(VeleroAppContexts);
  const appValues = useAppState();
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewport !== null && viewport.current !== null) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
    }
  };

  const commands = appValues.notificationHistory.map((item: any, index: number) => (
    <Stack gap={0} key={index} mb={15}>
      <Group gap={2}>
        <CopyButton value={`${item.statusCode}: ${item.title}: ${item.description}`} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
              <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                {copied ? (
                  <IconCheck style={{ height: rem(14), width: rem(14) }} />
                ) : (
                  <IconCopy style={{ height: rem(14), width: rem(14) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
        <Pill
          radius={0}
          fw={700}
          bg={item.statusCode >= 200 && item.statusCode <= 299 ? 'green' : 'red'}
        >
          {item.statusCode}
        </Pill>
        <Text c="white" size="sm">
          {item.title}
        </Text>
      </Group>

      <Text c="white" size="sm">
        {item.description}
      </Text>
    </Stack>
  ));

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`%cuseEffect 520 has been called`, `color: green; font-weight: bold;`)
    scrollToBottom();
  }, [appValues.apiRequest]);

  return (
    <>
      <Box p={2} h="175px">
        <ScrollArea px={10} h="100%" type="always" viewportRef={viewport} scrollbarSize={8}>
          <Code block color="#010101">
            {commands}
          </Code>
        </ScrollArea>
      </Box>
    </>
  );
}
