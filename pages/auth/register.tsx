/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Box, Button, Chip, Grid, Link, TextField, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
  email: string,
  password: string,
  passwordRepeat: string
  name: string,
}

export const RegisterPage = () => {
  const router = useRouter();
  const destination = router.query.p?.toString() || '/';
  const { registerUser } = useContext(AuthContext);

  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onRegister = async ({ email, name, password }: FormData) => {
    setShowError(false);
    setIsButtonDisabled(true);
    const { hasError } = await registerUser(email, password, name);

    if (hasError) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setIsButtonDisabled(false);
      }, 3000);
      return;
    }

    setIsButtonDisabled(false);
    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onRegister)} noValidate>
        <Box sx={{
          width: 350,
          padding: '10px 20px',
        }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Create account</Typography>
              <Chip
                label="Error in user registration"
                color="error"
                icon={<ErrorOutline />}
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
                label="Name"
                variant="filled"
                fullWidth
                {
                  ...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must contain at least 2 characters',
                    },
                  })
                }
                error={!!errors.name}
                helperText={errors.name?.message}
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
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                {
                  ...register('passwordRepeat', {
                    validate: (value: string) => watch('password') === value || 'Passwords do no match',
                  })
                }
                error={!!errors.passwordRepeat}
                helperText={errors.passwordRepeat?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                disabled={isButtonDisabled}
                fullWidth
              >
                Sign up
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={`/auth/login?p=${destination}`} passHref>
                <Link href={`/auth/login?p=${destination}`} underline="always">Do you already have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
