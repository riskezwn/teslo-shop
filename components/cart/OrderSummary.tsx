import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';

export const OrderSummary = () => (
  <Grid container>
    <Grid item xs={6}>
      <Typography>Items</Typography>
    </Grid>
    <Grid item xs={6} display="flex" justifyContent="end">
      <Typography>3</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>Subtotal</Typography>
    </Grid>
    <Grid item xs={6} display="flex" justifyContent="end">
      <Typography>105€</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography>IVA</Typography>
    </Grid>
    <Grid item xs={6} display="flex" justifyContent="end">
      <Typography>10€</Typography>
    </Grid>
    <Divider />
    <Grid item xs={6} sx={{ mt: 3 }}>
      <Typography variant="subtitle1">Total</Typography>
    </Grid>
    <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 3 }}>
      <Typography variant="subtitle1">115€</Typography>
    </Grid>
  </Grid>
);

export default OrderSummary;
