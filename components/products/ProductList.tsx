import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import ProductCard from './ProductCard';

interface Props {
  products: IProduct[]
}

export const ProductList: FC<Props> = ({ products }) => (
  <Grid container spacing={4}>
    {
      products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))
    }
  </Grid>
);

export default ProductList;
