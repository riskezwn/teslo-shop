import React, { FC, useState } from 'react';
import NextLink from 'next/link';
import {
  Box, Card, CardActionArea, CardMedia, Grid, Typography,
} from '@mui/material';
import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href="/product/slug" passHref prefetch={false}>
          <CardActionArea>
            {
              isHovered
                ? (
                  <CardMedia
                    component="img"
                    image={`products/${product.images[1]}`}
                    alt={product.title}
                    className="fadeIn"
                  />
                )
                : (
                  <CardMedia
                    component="img"
                    image={`products/${product.images[0]}`}
                    className="fadeIn"
                  />
                )
            }
          </CardActionArea>
        </NextLink>
      </Card>
      <Box
        sx={{
          mt: 1,
        }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={400}>
          {product.price}
          €
        </Typography>

      </Box>
    </Grid>
  );
};

export default ProductCard;
