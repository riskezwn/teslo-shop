import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
