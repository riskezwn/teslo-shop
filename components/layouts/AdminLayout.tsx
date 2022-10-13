import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';

interface Props {
  children: ReactNode
  title: string
  subtitle: string
  icon?: ReactNode
}

export const AdminLayout: FC<Props> = ({
  children, title, subtitle, icon,
}) => (
  <>
    <Head>
      <title>
        Dashboard - Teslo Shop
      </title>
    </Head>
    <nav>
      <AdminNavbar />
    </nav>
    <SideMenu />
    <main style={{
      margin: '80px auto',
      maxWidth: '1440px',
      padding: '0 30px',
    }}
    >
      <Box display="flex" flexDirection="column" mb={1}>
        <Typography variant="h1" component="h1" display="flex" justifyContent="start" alignItems="center">
          {icon}
          {' '}
          {title}
        </Typography>
        <Typography variant="h2" component="h2">{subtitle}</Typography>
      </Box>
      <Box className="fadeIn">
        {children}
      </Box>
    </main>
  </>

);

export default AdminLayout;
