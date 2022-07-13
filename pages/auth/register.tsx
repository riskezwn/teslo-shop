import React from 'react';
import NextLink from 'next/link';
import {
  Box, Button, Grid, Link, TextField, Typography,
} from '@mui/material';
import { AuthLayout } from '../../components/layouts';

export const RegisterPage = () => (
  <AuthLayout title="Register">
    <Box sx={{
      width: 350,
      padding: '10px 20px',
    }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1">Create account</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Password" variant="filled" type="password" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Repeat password" variant="filled" type="password" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" className="circular-btn" size="large" fullWidth>Log in</Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <NextLink href="/auth/login" passHref>
            <Link href="/auth/login" underline="always">Do you already have an account?</Link>
          </NextLink>
        </Grid>
      </Grid>
    </Box>
  </AuthLayout>
);

export default RegisterPage;
