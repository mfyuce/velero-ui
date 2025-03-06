import React from 'react';
import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { openModal } from '@mantine/modals';

import { IconEdit } from '@tabler/icons-react';
import { EditBslForm } from '@/components/Features/Velero/BackupLocations/Forms/EditBslForm';

interface EditBslActionProps {
  record: any;
  setReload: any;
  buttonType?: 'actionIcon' | 'button';
}

export default function EditBslAction({
  record,
  setReload,
  buttonType = 'actionIcon',
}: EditBslActionProps) {
  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal({
      title: 'Edit Backup Storage Location',
      size: '60rem',
      children: <EditBslForm record={record} setReload={setReload} />,
      padding: 'md',
      radius: 'md',
      centered: true,
    });
  };

  return buttonType === 'actionIcon' ? (
    <Tooltip label="Edit">
      <ActionIcon size="sm" variant="subtle" onClick={handleOpenModal}>
        <IconEdit color="green" />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Button h={38} leftSection={<IconEdit />} onClick={handleOpenModal}>
      Edit
    </Button>
  );
}
