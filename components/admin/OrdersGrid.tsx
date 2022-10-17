import React, { FC } from 'react';
import {
  DataGrid,
  GridColDef, GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  Chip, Grid, Link,
} from '@mui/material';
import { IOrder, IUser } from '../../interfaces';
import currency from '../../utils/currency';

interface Props {
  orders: IOrder[];
}

export const OrdersGrid: FC<Props> = ({ orders }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'isPaid',
      headerName: 'Paid',
      renderCell: ({ row }: GridValueGetterParams) => (row.isPaid
        ? (<Chip variant="outlined" label="Paid" color="success" />)
        : (<Chip variant="outlined" label="Not paid" color="error" />)),
    },
    { field: 'numberOfProducts', headerName: 'No. products', align: 'center' },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      align: 'right',
      type: 'number',
      valueFormatter: ({ value }: GridValueFormatterParams) => currency.format(value),
    },
    {
      field: 'createdAt', headerName: 'Created at', width: 250, align: 'right', type: 'dateTime', headerAlign: 'right',
    },
    {
      field: 'check',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Details',
      renderCell: ({ row }: GridValueGetterParams) => (
        <Link href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer" underline="always">See order</Link>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.orderSummary.total,
    isPaid: order.isPaid,
    numberOfProducts: order.orderSummary.numberOfItems,
    createdAt: order.createdAt,
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

export default OrdersGrid;
