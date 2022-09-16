import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { UIProvider, CartProvider, AuthProvider } from '../context';
import { lightTheme } from '../themes';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
    }}
  >
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  </SWRConfig>

);

export default MyApp;
