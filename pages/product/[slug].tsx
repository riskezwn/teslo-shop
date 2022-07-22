import React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import {
  Box, Button, Grid, Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { IProduct } from '../../interfaces';
import { getAllProductSlugs, getProductBySlug } from '../../database/dbProducts';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => (
  <ShopLayout title={product.title} pageDescription={product.description}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={7}>
        <ProductSlideshow images={product.images} />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Box display="flex" flexDirection="column">
          {/* Titulos */}
          <Typography variant="h1" component="h1">{product.title}</Typography>
          <Typography variant="subtitle1" component="h2">
            {product.price}
            {' '}
            €
          </Typography>
          {/* Cantidad */}
          <Box sx={{
            my: 2,
          }}
          >
            <Typography variant="subtitle2">Quantity</Typography>
            <ItemCounter />
            <SizeSelector sizes={product.sizes} />
          </Box>

          {/* Add to cart */}
          <Button color="secondary" className="circular-btn">Add to cart</Button>
          {/* <Chip label="Out of stock" color="error" variant="outlined" /> */}

          {/* Description */}
          <Box sx={{
            mt: 3,
          }}
          >
            <Typography variant="subtitle2">Description</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ShopLayout>
);

/* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
}; */

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllProductSlugs();
  const slugs = data.map(({ slug }) => slug);

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
