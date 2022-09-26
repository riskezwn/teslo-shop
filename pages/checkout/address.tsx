/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Button, Grid, MenuItem, TextField, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts';
import countries from '../../utils/countries';
import { IShippingAddress } from '../../interfaces';
import { CartContext } from '../../context';

const getAddressFromCookies = ():IShippingAddress => ({
  firstName: Cookies.get('firstName') || '',
  lastName: Cookies.get('lastName') || '',
  address: Cookies.get('address') || '',
  addressAditional: Cookies.get('addressAditional') || '',
  zipCode: Cookies.get('zipCode') || '',
  city: Cookies.get('city') || '',
  country: Cookies.get('country') || '',
  phone: Cookies.get('phone') || '',
});

const AddressPage = () => {
  const router = useRouter();
  const [hidrated, setHidrated] = useState(false);

  const { updateAddress } = useContext(CartContext);

  useEffect(() => {
    setHidrated(true);
  }, []);

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<IShippingAddress>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmit = (data: IShippingAddress) => {
    updateAddress(data);
    router.push('/checkout/summary');
  };

  return (
    <>
      <Box />
      {
      (hidrated) && (
      <ShopLayout title="Address" pageDescription="Confirm your address">
        <Typography variant="h1" component="h1" marginBottom={5}>Address</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                {
              ...register('firstName', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must contain at least 2 characters',
                },
              })
            }
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Subname"
                variant="filled"
                fullWidth
                {
              ...register('lastName', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Subname must contain at least 2 characters',
                },
              })
            }
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="filled"
                fullWidth
                {
              ...register('address', {
                required: 'Address is required',
              })
            }
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address 2"
                variant="filled"
                fullWidth
                {
              ...register('addressAditional')
            }
                error={!!errors.addressAditional}
                helperText={errors.addressAditional?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ZIP Code"
                variant="filled"
                fullWidth
                {
              ...register('zipCode', {
                required: 'ZIP is required',
                minLength: {
                  value: 5,
                  message: 'ZIP must contain at least 5 characters',
                },
              })
            }
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="filled"
                fullWidth
                {
              ...register('city', {
                required: 'City is required',
                minLength: {
                  value: 2,
                  message: 'City must contain at least 2 characters',
                },
              })
            }
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                key={`slider-${Cookies.get('country') || 'ES'}`}
                variant="filled"
                select
                label="Country"
                fullWidth
                defaultValue={Cookies.get('country') || 'ES'}
                {
                ...register('country', {
                  required: 'Country is required',
                })
              }
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {
                countries.map((country) => (
                  <MenuItem
                    key={country.code}
                    value={country.code}
                  >
                    {country.name}
                  </MenuItem>
                ))
              }
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="filled"
                type="tel"
                fullWidth
                {
              ...register('phone', {
                required: 'Phone is required',
                minLength: {
                  value: 9,
                  message: 'Name must contain at least 9 characters',
                },
              })
            }
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 5,
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button type="submit" color="secondary" className="circular-btn" size="large">
              Checkout order
            </Button>
          </Box>
        </form>
      </ShopLayout>
      )
    }

    </>

  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = '' } = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
