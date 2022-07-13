import React from 'react';
import NextLink from 'next/link';
import {
  Box, Button, Grid, Link, TextField, Typography,
} from '@mui/material';
import { AuthLayout } from '../../components/layouts';

export const LoginPage = () => (
  <AuthLayout title="Log in">
    <Box sx={{
      width: 350,
      padding: '10px 20px',
    }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1">Log in</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Password" variant="filled" type="password" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" className="circular-btn" size="large" fullWidth>Log in</Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <NextLink href="/auth/register" passHref>
            <Link href="/auth/register" underline="always">Don&apos;t have an account yet?</Link>
          </NextLink>
        </Grid>
      </Grid>
    </Box>
  </AuthLayout>
);

export default LoginPage;
