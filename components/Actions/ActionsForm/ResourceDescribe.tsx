'use client';

import { useEffect } from 'react';

import { Button, Group } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';

import { useApiGet } from '@/hooks/useApiGet';
import { Describe } from '@/components/Describe/Describe';

interface ResourceDescribeProps {
  resourceType: string;
  resourceName: string;
}

export function ResourceDescribe({ resourceType, resourceName }: ResourceDescribeProps) {
  const { data, getData, error, fetching } = useApiGet();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`%cuseEffect 230 has been called`, `color: green; font-weight: bold;`)
    getData({url:`/v1/${resourceType}/describe`, param:`resource_name=${resourceName}`});
  }, [resourceName]);

  return (
    <>
      <Describe items={data !== undefined ? data.payload : []} fetching={fetching} error={error} />
      <Group justify="flex-end">
        <Button onClick={() => closeAllModals()}>Close</Button>
      </Group>
    </>
  );
}
