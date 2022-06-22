import React from 'react';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

const HomePage: NextPage = () => (
  <ShopLayout title="Teslo Shop" pageDescription="Find Teslo's better products here">
    <Typography variant="h1" component="h1">Shop</Typography>
    <Typography
      variant="h2"
      sx={{
        marginBottom: 2,
      }}
    >
      All products
    </Typography>
  </ShopLayout>
);

export default HomePage;
