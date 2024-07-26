'use client';

import { useEffect, useState } from 'react';

import { ScrollArea, Space, Stack, Table } from '@mantine/core';

import { useApiGet } from '@/hooks/useApiGet';
import RefreshDatatable from '../Actions/ToolbarActionIcons/RefreshDatatable';
import Toolbar from '../Toolbar';
import { env } from 'next-runtime-env';

import { useServerStatus } from '@/contexts/ServerStatusContext';
import { useAgentStatus } from '@/contexts/AgentStatusContext';

export function Configuration() {
  const serverValues = useServerStatus();
  const agentValues = useAgentStatus();

  const { data: configuration, getData: getConfiguration, fetching } = useApiGet();
  const [reload, setReload] = useState(1);
  const [rowApiConfiguration, setRowApiConfiguration] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`%cuseEffect 490 has been called`, `color: green; font-weight: bold;`)
    if (agentValues.isAgentAvailable) getConfiguration({ url: '/v1/setup/get-config' });
  }, [reload, agentValues.isAgentAvailable]);

  /*useEffect(() => {
    getConfiguration({ url: '/v1/setup/get-config' });
  }, []);*/

  const uiConfiguration = [
    {
      name: 'NEXT_PUBLIC_REFRESH_DATATABLE_AFTER',
      value: env('NEXT_PUBLIC_REFRESH_DATATABLE_AFTER'),
    },
    { name: 'NEXT_PUBLIC_REFRESH_RECENT', value: env('NEXT_PUBLIC_REFRESH_RECENT') },
    { name: 'NEXT_PUBLIC_VELERO_API_URL', value: serverValues.currentServer?.url },
    { name: 'NEXT_PUBLIC_VELERO_API_WS', value: serverValues.currentServer?.ws },
    {
      name: 'NEXT_PUBLIC_FRONT_END_BUILD_VERSION',
      value: env('NEXT_PUBLIC_FRONT_END_BUILD_VERSION'),
    },
    { name: 'NEXT_PUBLIC_FRONT_END_BUILD_DATE', value: env('NEXT_PUBLIC_FRONT_END_BUILD_DATE') },
  ];

  const rowUiConfiguration = uiConfiguration.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`%cuseEffect 500 has been called`, `color: green; font-weight: bold;`)
    if (configuration !== undefined) {
      const rows = Object.keys(configuration?.payload).map((key) => (
        <Table.Tr key={key}>
          <Table.Td>{key}</Table.Td>
          <Table.Td>{configuration?.payload[key]}</Table.Td>
        </Table.Tr>
      ));

      setRowApiConfiguration(rows);
    }
  }, [configuration]);

  return (
    <>
      <ScrollArea p={0} style={{ height: '100%' }} offsetScrollbars>
        <Stack h="100%" gap={0} p={5}>
          <Toolbar title="API Configuration">
            <RefreshDatatable setReload={setReload} reload={reload} />
          </Toolbar>

          <Table striped highlightOnHover verticalSpacing={0}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w="400px">Name</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rowApiConfiguration}</Table.Tbody>
          </Table>

          <Space h={50} />
          <Toolbar title="UI Configuration">
            <></>
          </Toolbar>
          <Table striped highlightOnHover verticalSpacing={0}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w="400px">Name</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rowUiConfiguration}</Table.Tbody>
          </Table>
        </Stack>
      </ScrollArea>
    </>
  );
}
