import React from 'react';
import type { NextPage } from 'next';
import {
  Typography,
} from '@mui/material';
import { ProductList } from '../components/products';
import { ShopLayout } from '../components/layouts';
import initialData from '../database/products';

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

    <ProductList products={initialData.products as any} />
  </ShopLayout>
);

export default HomePage;
