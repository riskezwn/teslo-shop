import React, { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  currentValue: number;
  maxValue: number;
  // eslint-disable-next-line no-unused-vars
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {
  const addOrRemoveValue = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;
      updatedQuantity(currentValue - 1);
    } else {
      if (currentValue === maxValue) return;
      updatedQuantity(currentValue + 1);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={() => addOrRemoveValue(-1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
      <IconButton
        onClick={() => addOrRemoveValue(+1)}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
