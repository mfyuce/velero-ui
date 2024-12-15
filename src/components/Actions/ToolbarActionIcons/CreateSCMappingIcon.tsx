'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { openModal } from '@mantine/modals';

import { IconPlus } from '@tabler/icons-react';

import { SCMappingForm } from '../ActionsForm/SCMappingForm';

interface CreateSCMappingIconProps {
  reload: number;
  setReload: any;
}

export default function CreateSCMappingIcon({
  reload,
  setReload,
}: CreateSCMappingIconProps) {
  return (
    <Tooltip label="Create Storage Class Mapping">
      <ActionIcon
        size={30}
        variant="default"
        onClick={(e) => {
          e.stopPropagation();
          openModal({
            title: 'Create New Storage Class Mapping',
            size: 'lg',
            children: <SCMappingForm mode='create' reload={reload} setReload={setReload} />,
          });
        }}
      >
        <IconPlus style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </Tooltip>
  );
}
