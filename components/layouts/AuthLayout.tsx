import React, { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  AppBar, Box, Link, Toolbar, Typography,
} from '@mui/material';

interface Props {
  children: ReactNode
  title: string
}

export const AuthLayout: FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <meta name="og:title" content={title} />
      <title>{title}</title>
    </Head>
    <nav>
      <AppBar>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link href="/" display="flex" alignItems="baseline" justifyContent="center">
              <Typography variant="h6">Teslo |</Typography>
              <Typography sx={{
                marginLeft: 0.5,
              }}
              >
                Shop
              </Typography>
            </Link>
          </NextLink>

        </Toolbar>
      </AppBar>
    </nav>
    <main>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        {children}
      </Box>
    </main>
  </>
);

export default AuthLayout;
