import React, { FC } from 'react';
import NextLink from 'next/link';
import {
  Typography, Grid, Link, CardActionArea, CardMedia, Box, Button,
} from '@mui/material';
import initialData from '../../database/products';
import { ItemCounter } from '../ui';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
];

interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => (
  <>
    {
      productsInCart.map((product) => (
        <Grid
          container
          spacing={2}
          alignItems="center"
          key={product.slug}
          sx={{
            mb: 1,
          }}
        >
          <Grid item xs={2}>
            <NextLink href="/product/slug" passHref>
              <Link href="/product/slug">
                <CardActionArea>
                  <CardMedia
                    image={`products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{ product.title }</Typography>
              <Typography variant="body2">
                Size:
                {' '}
                <strong>M</strong>
              </Typography>
              {
                editable
                  ? <ItemCounter />
                  : <Typography variant="h6">x 3</Typography>
              }
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">
              {product.price}
              {' '}
              €
            </Typography>
            {
              editable && (
                <Button variant="text" color="secondary">
                  Remove
                </Button>
              )
            }
          </Grid>
        </Grid>
      ))
    }
  </>
);

export default CartList;
