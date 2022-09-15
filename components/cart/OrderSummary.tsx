import React, { useContext } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import CartContext from '../../context/cart/CartContext';
import { currency } from '../../utils';

export const OrderSummary = () => {
  const { orderSummary } = useContext(CartContext);
  const {
    numberOfItems, subTotal, tax, total,
  } = orderSummary;

  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * 100;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Items</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          IVA (
          {`${taxRate}%`}
          )
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Divider />
      <Grid item xs={6} sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 3 }}>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
