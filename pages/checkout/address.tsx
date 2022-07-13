import React from 'react';
import {
  Box,
  Button,
  FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const AddressPage = () => (
  <ShopLayout title="Address" pageDescription="Confirm your address">
    <Typography variant="h1" component="h1" marginBottom={5}>Address</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField label="Name" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Subname" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Address" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Address 2 (optional)" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="CP" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="City" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl variant="filled" fullWidth>
          <InputLabel>Country</InputLabel>
          <Select label="Country" value={1}>
            <MenuItem value={1}>Spain</MenuItem>
            <MenuItem value={2}>France</MenuItem>
            <MenuItem value={3}>Portugal</MenuItem>
            <MenuItem value={4}>Italy</MenuItem>
            <MenuItem value={5}>Andorra</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Phone" variant="filled" fullWidth />
      </Grid>
    </Grid>
    <Box
      sx={{
        mt: 5,
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button color="secondary" className="circular-btn" size="large">
        Checkout order
      </Button>
    </Box>
  </ShopLayout>
);

export default AddressPage;
