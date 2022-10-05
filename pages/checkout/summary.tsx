import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Alert, Chip,
} from '@mui/material';
import Cookies from 'js-cookie';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';
import countries from '../../utils/countries';

const SummaryPage = () => {
  const { shippingAddress, createOrder } = useContext(CartContext);
  const router = useRouter();

  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, []);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if (hasError && message) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/order/${message}`);
  };

  if (!shippingAddress) {
    return (
      <ShopLayout title="Order summary" pageDescription="Your order summary">
        <Typography variant="h1" component="h1" marginBottom={5}>Order summary</Typography>
        <Alert severity="error">
          You have not completed your address.
          {' '}
          <NextLink href="/checkout/address" passHref>
            <Link href="/checkout/address" underline="always">Return</Link>
          </NextLink>
        </Alert>
      </ShopLayout>
    );
  }

  const {
    firstName, lastName, address, addressAditional, city, zipCode, phone, country,
  } = shippingAddress;

  const countryName = countries.find((c) => c.code === country);

  return (
    <ShopLayout title="Order summary" pageDescription="Your order summary">
      <Typography variant="h1" component="h1" marginBottom={5}>Order summary</Typography>

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
              <Typography>
                {firstName}
                {' '}
                {lastName}
              </Typography>
              <Typography>
                {address}
                ,
                {' '}
                {addressAditional || ''}
              </Typography>
              <Typography>
                {city}
                ,
                {' '}
                {zipCode}
              </Typography>
              <Typography>{countryName?.name}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link href="/cart" underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column" gap={2}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirm order
                </Button>
                {
                  errorMessage && (
                    <Chip
                      color="error"
                      label={errorMessage}
                    />
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

export default SummaryPage;
