import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  Typography, Grid, Card, CardContent, Divider, Box, Chip, CircularProgress,
} from '@mui/material';
import { CreditCardOffOutlined, CreditCardOutlined } from '@mui/icons-material';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { authOptions } from '../api/auth/[...nextauth]';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import countries from '../../utils/countries';
import { tesloApi } from '../../api_base';

export type OrderResponseBody = {
  id: string;
  status:
      | 'COMPLETED'
      | 'SAVED'
      | 'APPROVED'
      | 'VOIDED'
      | 'COMPLETED'
      | 'PAYER_ACTION_REQUIRED';
};

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter();
  const {
    _id, isPaid, orderSummary, shippingAddress, orderItems,
  } = order;
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const countryName = countries.find((c) => c.code === shippingAddress.country);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      throw new Error('Order not paid in Paypal');
    }
    setIsPaying(true);

    try {
      const { data } = await tesloApi.post('/orders/pay', {
        transactionId: details.id,
        orderId: _id,
      });

      if (data) router.reload();
    } catch (error) {
      setIsPaying(false);
      throw new Error(error as string);
    }
  };

  return (
    <ShopLayout title={`Order - ${_id}`} pageDescription="Your order summary">
      <Typography variant="h1" component="h1" marginBottom={5}>
        Order
        {' '}
        {_id}
      </Typography>
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
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="center"
                  className="fadeIn"
                  sx={{
                    display: isPaying ? 'flex' : 'none',
                  }}
                >
                  <CircularProgress />
                </Box>
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
                    <Box>
                      {
                      !isPaying && (
                        <PayPalButtons
                          createOrder={(data, actions) => actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.orderSummary.total.toString(),
                                },
                              },
                            ],
                          })}
                          onApprove={(data, actions) => {
                            if (actions.order) {
                              return actions.order.capture().then(
                                (details) => onOrderCompleted(details),
                              );
                            }
                            throw new Error('Error trying to make the payment');
                          }}

                        />
                      )
                     }
                    </Box>
                  )
                }
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id = '' } = query;
  const session: any = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/order/history',
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/order/history',
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
