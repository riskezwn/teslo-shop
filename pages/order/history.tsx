import React from 'react';
import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import {
  Chip, Grid, Link, Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { ShopLayout } from '../../components/layouts';
import { authOptions } from '../api/auth/[...nextauth]';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { currency } from '../../utils';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows information about whether the order has been paid',
    width: 200,
    type: 'boolean',
    renderCell: (params: GridValueGetterParams) => (
      params.row.paid
        ? <Chip color="success" label="Paid" variant="outlined" />
        : <Chip color="error" label="Not paid" variant="outlined" />
    ),
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 150,
    type: 'number',
    valueFormatter: ({ value }) => currency.format(Number(value)),
  },
  {
    field: 'order',
    headerName: 'See order',
    description: 'Shows information about whether the order has been paid',
    width: 200,
    renderCell: (params: GridValueGetterParams) => (
      <NextLink href={`/order/${params.row.orderId}`} passHref>
        <Link href={`/order/${params.row.orderId}`} underline="always">Details</Link>
      </NextLink>
    ),
    sortable: false,
  },
];

interface Props {
  orders: IOrder[]
}

const OrderHistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map(({
    isPaid, shippingAddress, _id, orderSummary,
  }, i) => ({
    id: i + 1,
    paid: isPaid,
    total: orderSummary.total,
    fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
    orderId: _id,
  }));

  return (
    <ShopLayout title="Order history" pageDescription="Customer order history">
      <Typography variant="h1" component="h1" marginBottom={5}>Order history</Typography>
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
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: any = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/order/history',
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id.toString());

  return {
    props: {
      orders,
    },
  };
};

export default OrderHistoryPage;
