import React, { FC } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  capitalize, Grid, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { KeyedMutator } from 'swr/dist/types';
import { IUser, IUserRole } from '../../interfaces';
import { tesloApi } from '../../api_base';

interface Props {
  users: IUser[];
  mutate: KeyedMutator<IUser[]>;
}

export const UsersGrid: FC<Props> = ({ users, mutate }) => {
  const onRoleUpdate = async (userId: string, newRole: IUserRole) => {
    try {
      await tesloApi.put('/admin/users', { userId, role: newRole });
      await mutate(users!.map((user) => (user._id === userId ? { ...user, role: newRole } : user)));
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      valueFormatter: ({ value }: GridValueFormatterParams) => capitalize(value),
      renderCell: ({ row }: GridValueGetterParams) => (
        <Select
          value={row.role}
          label="Role"
          onChange={
            ({ target }: SelectChangeEvent) => onRoleUpdate(row.id, target.value as IUserRole)
          }
          sx={{ width: '100%' }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="client">Client</MenuItem>
        </Select>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <Grid container className="fadeIn">
      <Grid
        item
        xs={12}
        sx={{
          height: 650,
          width: '100%',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>
    </Grid>
  );
};

export default UsersGrid;
