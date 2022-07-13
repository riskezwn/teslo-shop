import React from 'react';
import NextLink from 'next/link';
import {
  Chip, Grid, Link, Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows information about whether the order has been paid',
    width: 200,
    renderCell: (params: GridValueGetterParams) => (
      params.row.paid
        ? <Chip color="success" label="Paid" variant="outlined" />
        : <Chip color="error" label="Not paid" variant="outlined" />
    ),
  },
  {
    field: 'order',
    headerName: 'See order',
    description: 'Shows information about whether the order has been paid',
    width: 200,
    renderCell: (params: GridValueGetterParams) => (
      <NextLink href={`/order/${params.row.id}`} passHref>
        <Link href={`/order/${params.row.id}`} underline="always">Details</Link>
      </NextLink>
    ),
    sortable: false,
  },
];

const rows = [
  { id: 1234, paid: true, fullName: 'Enrique García' },
  { id: 1454, paid: false, fullName: 'Fernando López' },
  { id: 4556, paid: false, fullName: 'María García' },
  { id: 3432, paid: false, fullName: 'Raúl González' },
  { id: 7678, paid: true, fullName: 'Guillermo García' },
  { id: 8877, paid: true, fullName: 'Leo Messi' },
  { id: 4445, paid: true, fullName: 'Tristán Marco' },
  { id: 2455, paid: true, fullName: 'Luna López' },
];

const OrderHistoryPage = () => (
  <ShopLayout title="Order history" pageDescription="Customer order history">
    <Typography variant="h1" component="h1" marginBottom={5}>Order history</Typography>
    <Grid container>
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
  </ShopLayout>
);

export default OrderHistoryPage;
