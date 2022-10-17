import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  Typography, Grid, Card, CardContent, Divider, Chip,
} from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditCardOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { AdminLayout } from '../../../components/layouts';
import countries from '../../../utils/countries';
import { IOrder } from '../../../interfaces';
import { CartList, OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const {
    _id, isPaid, orderSummary, shippingAddress, orderItems,
  } = order;

  const countryName = countries.find((c) => c.code === shippingAddress.country);

  return (
    <AdminLayout title="Order summary" subtitle={`Order ${_id}`} icon={<ShoppingBagOutlined />}>
      {
        isPaid ? (
          <Chip
            sx={{ mb: 2 }}
            variant="outlined"
            label="Order paid"
            color="success"
            icon={<CreditCardOutlined />}
          />
        ) : (
          <Chip
            sx={{ mb: 2 }}
            variant="outlined"
            label="Order outstanding"
            color="error"
            icon={<CreditCardOffOutlined />}
          />
        )
      }
      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>
                {shippingAddress.firstName}
                {' '}
                {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}
                ,
                {' '}
                {shippingAddress.addressAditional || ''}
              </Typography>
              <Typography>
                {shippingAddress.city}
                ,
                {' '}
                {shippingAddress.zipCode}
              </Typography>
              <Typography>{countryName?.name}</Typography>
              <Typography>{shippingAddress.phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary summary={orderSummary} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query;
  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/admin/orders',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
