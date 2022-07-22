import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Typography, Box } from '@mui/material';
import { ProductList } from '../../components/products';
import { ShopLayout } from '../../components/layouts';
import { getProductsByTerm } from '../../database/dbProducts';
import { IProduct } from '../../interfaces/products';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => (
  <ShopLayout title="Teslo Shop" pageDescription="Find Teslo's better products here">
    <Typography variant="h1" component="h1">Search</Typography>

    {
      foundProducts
        ? (
          <Typography variant="h2" sx={{ mb: 2 }} textTransform="capitalize">
            {query}
          </Typography>
        )
        : (
          <Box display="flex">
            <Typography variant="h2" sx={{ mb: 2 }}>
              We did not find any product:
            </Typography>
            <Typography variant="h2" sx={{ ml: 1 }} color="secondary" textTransform="capitalize">
              {query}
            </Typography>
          </Box>
        )
    }
    <ProductList products={products} />
  </ShopLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let products = await getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await getProductsByTerm('jacket');
  }

  return {
    props: {
      query,
      products,
      foundProducts,
    },
  };
};

export default SearchPage;
