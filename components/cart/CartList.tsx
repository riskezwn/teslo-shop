import React, { FC, useContext } from 'react';
import NextLink from 'next/link';
import {
  Typography, Grid, Link, CardActionArea, CardMedia, Box, Button,
} from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';

interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {
      cart.map((product) => (
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
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
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
                <strong>{product.size}</strong>
              </Typography>
              {
                editable
                  ? (
                    <ItemCounter
                      currentValue={product.quantity}
                      maxValue={10}
                      updatedQuantity={() => {}}
                    />
                  )
                  : (
                    <Typography variant="h6">
                      x
                      {' '}
                      {product.quantity}
                    </Typography>
                  )
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
              {product.price * product.quantity}
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
};

export default CartList;
