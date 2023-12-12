'use client';

import { useEffect, useState } from 'react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { Center, Group, Stack } from '@mantine/core';

import sortBy from 'lodash/sortBy';

import { IconClick } from '@tabler/icons-react';

import { useApiWithGet } from '@/hooks/useApiWithGet';
import RefreshDatatable from '../Actions/ToolbarActionIcons/RefreshDatatable';
import DetailActionIcon from '../Actions/DatatableActionsIcons/DetailActionIcon';
import Toolbar from '../Toolbar';

const PAGE_SIZES = [5];

export function BackupLocation() {
  const { data, getData, error, fetching } = useApiWithGet();
  const [items, setItems] = useState<Array<any>>([]);
  const [reload, setReload] = useState(1);

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'Number',
    direction: 'asc',
  });

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);

  const [records, setRecords] = useState(items.slice(0, pageSize));

  useEffect(() => {
    getData('/api/v1/backup-location/get');
  }, [reload]);

  useEffect(() => {
    getData('/api/v1/backup-location/get');
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setItems(data.payload.items);
    } else setItems([]);
  }, [data]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const data_sorted = sortBy(items, sortStatus.columnAccessor);

    setRecords(
      sortStatus.direction === 'desc'
        ? data_sorted.reverse().slice(from, to)
        : data_sorted.slice(from, to)
    );
  }, [page, pageSize, sortStatus, data]);

  const renderActions: DataTableColumn<any>['render'] = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <DetailActionIcon name={record.metadata.name} record={record} />
    </Group>
  );

  return (
    <>
      <Stack h="100%" gap={0}>
        <Toolbar title="Backup Location">
          <RefreshDatatable setReload={setReload} reload={reload} />
        </Toolbar>

        <DataTable
          withTableBorder
          borderRadius="sm"
          withColumnBorders
          striped
          highlightOnHover
          records={records}
          //idAccessor="id"
          totalRecords={items.length}
          paginationActiveBackgroundColor="grape"
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          fetching={fetching}
          columns={[
            {
              accessor: 'id',
              title: 'Number',
              sortable: true,
              width: 105,
            },
            {
              accessor: 'metadata.name',
              title: 'Name',
              sortable: true,
            },
            {
              accessor: 'spec.provider',
              title: 'provider',
            },
            { accessor: 'spec.objectStorage.bucket', title: 'Bucket/Prefix', sortable: true },
            { accessor: 'status.phase', title: 'Phase', sortable: true },
            { accessor: 'spec.accessMode', title: 'Access Mode', sortable: true },
            {
              accessor: 'spec.credential.name',
              title: 'Credential',
              sortable: true,
              render: ({ spec }) => (
                <>
                  {spec.credential && spec.credential.name && spec.credential.name}
                  {spec.credential && spec.credential.key && <>: {spec.credential.key}</>}
                </>
              ),
            },
            {
              accessor: 'actions',
              title: (
                <Center>
                  <IconClick size={16} />
                </Center>
              ),
              width: '0%',
              render: renderActions,
            },
          ]}
        />
      </Stack>
    </>
  );
}
