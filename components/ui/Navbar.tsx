/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography,
} from '@mui/material';
import {
  ClearOutlined, SearchOutlined, ShoppingCartOutlined,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { CartContext, UIContext } from '../../context';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const { orderSummary } = useContext(CartContext);

  const { numberOfItems } = orderSummary;

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

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

        <Box
          sx={{
            display: isSearchVisible
              ? 'none'
              : {
                xs: 'none',
                sm: 'block',
              },
          }}
          className="fadeIn"
        >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kids" passHref>
            <Link>
              <Button color={asPath === '/category/kids' ? 'primary' : 'info'}>
                Kids
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        {/* Wide screen */}
        <Box
          sx={{
            display: {
              xs: 'none', sm: 'flex',
            },
          }}
        >
          {
          isSearchVisible
            ? (
              <Input
                className="fadeIn"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
                type="text"
                placeholder="Search..."
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                      aria-label="toggle password visibility"
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
              )}
              />
            )
            : (
              <IconButton
                className="fadeIn"
                onClick={() => setIsSearchVisible(true)}
              >
                <SearchOutlined />
              </IconButton>
            )
        }
        </Box>

        {/* Small screen */}
        <IconButton
          sx={{
            display: {
              xs: 'flex', sm: 'none',
            },
          }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart">
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <IconButton onClick={toggleSideMenu}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
