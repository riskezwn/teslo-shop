import React from 'react';
import NextLink from 'next/link';
import {
  Box, Typography, Link,
} from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';

const EmptyPage = () => (
  <ShopLayout title="Empty cart" pageDescription="There are no items in your cart">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{
        flexDirection: {
          xs: 'column', sm: 'row',
        },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexDirection="row" alignItems="center">
          <RemoveShoppingCartOutlined sx={{
            fontSize: 100,
          }}
          />
          <Typography marginLeft={2}>Your cart is empty</Typography>
        </Box>
        <NextLink href="/" passHref>
          <Link underline="always" href="/" typography="h6" marginTop={4}>Return home</Link>
        </NextLink>
      </Box>
    </Box>
  </ShopLayout>
);

export default EmptyPage;
