import React, { useContext, useEffect } from 'react';
import {
  Typography, Grid, Card, CardContent, Divider, Box, Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';

const CartPage = () => {
  const router = useRouter();
  const { isLoaded, orderSummary } = useContext(CartContext);
  const { numberOfItems } = orderSummary;

  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace('cart/empty');
    }
  }, [isLoaded, numberOfItems, router]);

  return (
    <>
      <Box />
      {
      isLoaded && numberOfItems > 0 && (
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
      )
    }

    </>

  );
};

export default CartPage;
