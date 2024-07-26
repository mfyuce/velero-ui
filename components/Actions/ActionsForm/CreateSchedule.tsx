'use client';

import { useContext, useEffect, useState } from 'react';

import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';

import { useApiGet } from '@/hooks/useApiGet';
import { useApiPost } from '@/hooks/useApiPost';
import CreateBackupScheduleForm from './CreateBackupScheduleForm';
import { useAppState } from '@/contexts/AppStateContext';

interface CreateScheduleProps {
  reload: number;
  setReload: any;
}

export function CreateSchedule({ reload, setReload }: CreateScheduleProps) {
  const appValues = useAppState();
  const { data, getData } = useApiGet();

  const { postData } = useApiPost();

  const [namespaces, setNamespaces] = useState([]);
  const [backupLocation, setBackupLocation] = useState([]);
  const [snapshotLocation, setSnapshotLocation] = useState([]);
  const [resources, setResources] = useState([]);

  const form = useForm({
    initialValues: {
      name: '',
      schedule: '0 * * * *',
      includedNamespaces: [],
      excludedNamespaces: [],
      includedResources: [],
      excludedResources: [],
      backupRetention: '720h0m0s',
      snapshotVolumes: false,
      includeClusterResources: false,
      defaultVolumesToFsBackup: false,
      backupLabel: '',
      selector: '',
      backupLocation: '',
      snapshotLocation: [],
    },

    validate: {
      name: (value) => (value.length === 0 ? 'Invalid name' : null),
    },
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`%cuseEffect 170 has been called`, `color: green; font-weight: bold;`)
    getData({url:'/v1/schedule/create/settings'});
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log(`%cuseEffect 180 has been called`, `color: green; font-weight: bold;`)
    if (data !== undefined) {
      setNamespaces(data.payload.namespaces);
      setBackupLocation(data.payload.backup_location);
      setSnapshotLocation(data.payload.snapshot_location);
      setResources(data.payload.resources);
    }
  }, [data]);

  function createSchedule(values: any) {
    postData('/v1/schedule/create',
      values,
    );
    closeAllModals();
    const interval = setInterval(() => {
      setReload(reload + 1);
      clearInterval(interval);
    }, appValues.refreshDatatableAfter);
  }

  return (
    <CreateBackupScheduleForm
      resource="schedule"
      mode="create"
      form={form}
      namespaces={namespaces}
      backupLocation={backupLocation}
      snapshotLocation={snapshotLocation}
      resources={resources}
      onDone={createSchedule}
    />
  );
}
