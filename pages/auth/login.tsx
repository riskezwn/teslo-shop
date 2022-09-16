/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Box, Button, Chip, Grid, Link, TextField, Typography,
} from '@mui/material';
import { Error } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { tesloApi } from '../../api';

type FormData = {
  email: string,
  password: string
}

export const LoginPage = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onLogin = async ({ email, password }: FormData) => {
    setShowError(false);
    setIsButtonDisabled(true);

    try {
      const { data } = await tesloApi.post('/auth/login', { email, password });
      const { token, user } = data;
      setIsButtonDisabled(false);
      console.log({ token, user });
    } catch (error) {
      setShowError(true);
      setIsButtonDisabled(false);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title="Log in">
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{
          width: 350,
          padding: '10px 20px',
        }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Log in</Typography>
              <Chip
                label="Email or password does not match"
                color="error"
                icon={<Error />}
                className="fadeIn"
                sx={{
                  my: 1,
                  width: '100%',
                  display: showError ? 'flex' : 'none',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                type="email"
                fullWidth
                {
                  ...register('email', {
                    required: 'Email is required',
                    validate: validations.isEmail,
                  })
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                {
                  ...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must contain at least 6 characters',
                    },
                  })
                }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={isButtonDisabled}
              >
                Log in
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link href="/auth/register" underline="always">Don&apos;t have an account yet?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
