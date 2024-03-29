import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { UIProvider, CartProvider, AuthProvider } from '../context';
import { lightTheme } from '../themes';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => (
  <SessionProvider session={pageProps.session}>
    <PayPalScriptProvider options={{
      'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
      currency: 'EUR',
      'disable-funding': 'sofort',
    }}
    >
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
    </PayPalScriptProvider>
  </SessionProvider>
);

export default MyApp;
