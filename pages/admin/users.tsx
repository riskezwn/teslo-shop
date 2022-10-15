import React from 'react';
import { PeopleOutlined } from '@mui/icons-material';
import useSWR from 'swr';
import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';
import { UsersGrid } from '../../components/admin';
import { FullScreenLoading } from '../../components/ui';

const UsersPage = () => {
  const { data: users, error, mutate } = useSWR<IUser[]>('/api/admin/users');

  return (
    <AdminLayout title="Users" subtitle="User maintenance" icon={<PeopleOutlined />}>
      {
          (!users && !error) ? (
            <FullScreenLoading />
          ) : (
            <UsersGrid users={users!} mutate={mutate} />
          )
        }
    </AdminLayout>
  );
};

export default UsersPage;
