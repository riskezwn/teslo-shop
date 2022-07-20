import React, { FC, useMemo, useState } from 'react';
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => (
    isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`
  ), [isHovered, product.images]);

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
            <CardMedia
              component="img"
              image={productImage}
              alt={product.title}
              className="fadeIn"
              onLoad={() => setIsImageLoaded(true)}
            />
          </CardActionArea>
        </NextLink>
      </Card>
      <Box
        sx={{
          mt: 1,
          display: isImageLoaded ? 'block' : 'none',
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
