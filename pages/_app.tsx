import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
    }}
  >
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  </SWRConfig>

);

export default MyApp;
