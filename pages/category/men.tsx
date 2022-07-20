import React from 'react';
import type { NextPage } from 'next';
import {
  Typography,
} from '@mui/material';
import { ProductList } from '../../components/products';
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout title="Men - Teslo Shop" pageDescription="Find Teslo's better products here for men">
      <Typography variant="h1" component="h1">Shop</Typography>
      <Typography
        variant="h2"
        sx={{
          marginBottom: 2,
        }}
      >
        Men
      </Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  );
};

export default MenPage;
