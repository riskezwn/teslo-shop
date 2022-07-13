import React from 'react';
import NextLink from 'next/link';
import {
  Typography, Grid, Card, CardContent, Divider, Box, Link, Chip,
} from '@mui/material';
import { CreditCardOffOutlined, CreditCardOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';

const OrderPage = () => (
  <ShopLayout title="Order - 34566453" pageDescription="Your order summary">
    <Typography variant="h1" component="h1" marginBottom={5}>Order ABC1345</Typography>

    <Chip
      sx={{ mb: 2 }}
      variant="outlined"
      label="Order outstanding"
      color="error"
      icon={<CreditCardOffOutlined />}
    />
    <Chip
      sx={{ mb: 2 }}
      variant="outlined"
      label="Order paid"
      color="success"
      icon={<CreditCardOutlined />}
    />

    <Grid container>
      <Grid item xs={12} sm={7}>
        <CartList />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card className="summary-card">
          <CardContent>
            <Typography variant="h2">Summary</Typography>
            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Shipping address</Typography>
              <NextLink href="/checkout/address" passHref>
                <Link href="/checkout/address" underline="always">Edit</Link>
              </NextLink>
            </Box>
            <Typography>Enrique García</Typography>
            <Typography>Calle Carracuellar 26</Typography>
            <Typography>Iscar, Valladolid, 47420</Typography>
            <Typography>Spain</Typography>
            <Typography>644378612</Typography>

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="end">
              <NextLink href="/cart" passHref>
                <Link href="/cart" underline="always">Edit</Link>
              </NextLink>
            </Box>
            <OrderSummary />

            <Box sx={{ mt: 3 }}>
              <h1>Pay</h1>
              {/* TODO */}
              <Chip
                sx={{ mb: 2 }}
                variant="outlined"
                label="Order paid"
                color="success"
                icon={<CreditCardOutlined />}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </ShopLayout>
);

export default OrderPage;
