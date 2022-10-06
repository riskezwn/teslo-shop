import React, { FC, useContext } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import CartContext from '../../context/cart/CartContext';
import { currency } from '../../utils';
import { IOrderSummary } from '../../interfaces';

interface Props {
  summary?: IOrderSummary
}

export const OrderSummary: FC<Props> = ({ summary }) => {
  const { orderSummary } = useContext(CartContext);
  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * 100;

  const summaryValues = summary || orderSummary;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Items</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{summaryValues.numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          IVA (
          {`${taxRate}%`}
          )
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>
      <Divider />
      <Grid item xs={6} sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 3 }}>
        <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
