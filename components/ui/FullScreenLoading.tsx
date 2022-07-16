import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const FullScreenLoading = () => (
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
    <CircularProgress thickness={3} />
  </Box>
);

export default FullScreenLoading;
