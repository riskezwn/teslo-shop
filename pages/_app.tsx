import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import '../styles/globals.css';
import { UIProvider } from '../context';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
    }}
  >
    <UIProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  </SWRConfig>

);

export default MyApp;
