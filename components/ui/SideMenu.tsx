import React, { useContext, useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext, UIContext } from '../../context';

const AdminOptions = () => (
  <>
    <ListSubheader>Admin Panel</ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <CategoryOutlined />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ConfirmationNumberOutlined />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AdminPanelSettings />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </>
);

export const SideMenu = () => {
  const router = useRouter();
  const { isLogged, user, logoutUser } = useContext(AuthContext);
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

  const [searchTerm, setSearchTerm] = useState('');

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const onLogout = () => {
    logoutUser();
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Search..."
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchTerm}
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              )}
            />
          </ListItem>

          <ListItemButton
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/men')}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary="Man" />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/women')}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary="Woman" />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/kids')}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary="Kids" />
          </ListItemButton>

          {
            isLogged
              ? (
                <>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircleOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon>
                      <ConfirmationNumberOutlined />
                    </ListItemIcon>
                    <ListItemText primary="My orders" />
                  </ListItemButton>

                  <ListItemButton
                    onClick={onLogout}
                  >
                    <ListItemIcon>
                      <LoginOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                  </ListItemButton>
                </>
              )
              : (
                <ListItemButton
                  onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                >
                  <ListItemIcon>
                    <VpnKeyOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Log in" />
                </ListItemButton>
              )
          }
          {
            user?.role === 'admin' && (
              <>
                <Divider />
                <AdminOptions />
              </>
            )
          }
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
