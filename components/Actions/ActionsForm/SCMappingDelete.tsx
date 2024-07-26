'use client';

import { Button, Group, Text } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { useAppState } from '@/contexts/AppStateContext';
import { useApiDelete } from '@/hooks/useApiDelete';

interface SCMappingDeleteProps {
  record: any;
  reload: number;
  setReload: any;
}

export function SCMappingDelete({ record, reload, setReload }: SCMappingDeleteProps) {
  const appValues = useAppState();
  const { deleteData } = useApiDelete();

  function delete_backup() {
    deleteData('/v1/sc/change-storage-classes-config-map/delete', {
      storageClassMapping: {
        oldStorageClass: record['oldStorageClass'],
        newStorageClass: record['newStorageClass'],
      },
    });

    const interval = setInterval(() => {
      setReload(reload + 1);
      clearInterval(interval);
    }, appValues.refreshDatatableAfter);
  }

  return (
    <>
      <Text>
        Confirm delete Storage Mapping {record['oldStorageClass']}:{record['newStorageClass']}?
      </Text>
      <Group mt="md" gap="sm" justify="flex-end">
        <Button
          color="red"
          onClick={() => {
            delete_backup();
            closeAllModals();
          }}
        >
          Delete
        </Button>
        <Button variant="transparent" c="dimmed" onClick={() => closeAllModals()}>
          Close
        </Button>
      </Group>
    </>
  );
}
