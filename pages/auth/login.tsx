/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { signIn, getProviders } from 'next-auth/react';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import {
  Box, Button, Chip, Divider, Grid, Link, TextField, Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import GoogleLoginButton from '../../components/ui/social/GoogleLoginButton';
import { authOptions } from '../api/auth/[...nextauth]';

type FormData = {
  email: string,
  password: string
}

export const LoginPage = () => {
  const { query } = useRouter();

  const destination = query.p?.toString() || '/';

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    if (query.error) {
      setShowError(true);
    }
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLogin = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn('credentials', {
      email, password,
    });
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
              >
                Log in
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={`/auth/register?p=${destination}`} passHref>
                <Link href={`/auth/register?p=${destination}`} underline="always">Don&apos;t have an account yet?</Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
              <Divider sx={{ width: '100%', mb: 2 }} />
              {
                Object.values(providers).map((provider: any) => {
                  switch (provider.id) {
                    case 'credentials':
                      return (<div key="provider.id" />);
                    case 'google':
                      return (
                        <GoogleLoginButton />
                      );
                    default:
                      return (<div key="provider.id" />);
                  }
                })
              }
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
