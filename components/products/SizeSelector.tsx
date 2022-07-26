import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import { ISize } from '../../interfaces';

interface Props {
  selectedSize?: ISize
  sizes: ISize[]
  // eslint-disable-next-line no-unused-vars
  onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => (

  <Box>
    {
      sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))
    }
  </Box>
);

export default SizeSelector;
