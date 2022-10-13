/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import NextLink from 'next/link';
import {
  AppBar, Box, IconButton, Link, Toolbar, Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { UIContext } from '../../context';

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="baseline" justifyContent="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{
              marginLeft: 0.5,
            }}
            >
              Shop
            </Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <IconButton onClick={toggleSideMenu}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
