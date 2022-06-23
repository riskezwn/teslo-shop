import React from 'react';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

const Page404 = () => (
  <ShopLayout title="Page not found" pageDescription="Nothing to show here">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{
        flexDirection: {
          xs: 'column', sm: 'row',
        },
      }}
    >
      <Typography variant="h1" component="h1" fontSize={70} fontWeight={150}>404 |</Typography>
      <Typography variant="h6" marginLeft={2}>Not found</Typography>
    </Box>
  </ShopLayout>
);

export default Page404;
