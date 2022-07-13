import React from 'react';
import {
  Typography, Grid, Card, CardContent, Divider, Box, Button,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';

const CartPage = () => (
  <ShopLayout title="Cart - 3" pageDescription="Your shopping cart">
    <Typography variant="h1" component="h1" marginBottom={5}>Shopping cart</Typography>

    <Grid container>
      <Grid item xs={12} sm={7}>
        <CartList editable />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card className="summary-card">
          <CardContent>
            <Typography variant="h2">Order</Typography>
            <Divider sx={{ my: 1 }} />
            <OrderSummary />
            <Box sx={{ mt: 3 }}>
              <Button color="secondary" className="circular-btn" fullWidth>
                Checkout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </ShopLayout>
);

export default CartPage;
