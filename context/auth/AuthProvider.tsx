/* eslint-disable max-len */
import Cookies from 'js-cookie';
import React, {
  FC, ReactNode, useEffect, useMemo, useReducer,
} from 'react';
import axios, { AxiosError } from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { AuthContext, authReducer } from '.';
import { tesloApi } from '../../api_base';
import { IUser } from '../../interfaces';

interface Props {
  children: ReactNode
}

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
}

export interface RegisterResponse {
  hasError: boolean;
  message?: string;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined,
};

export const AuthProvider:FC<Props> = ({ children }) => {
  const { data: authData, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: '[Auth] Login', payload: authData.user as IUser });
    }
  }, [status, authData]);

  // const checkToken = async () => {
  //   if (!Cookies.get('token')) return false;
  //   try {
  //     const { data } = await tesloApi.get('/auth/token');
  //     const { token, user } = data;
  //     Cookies.set('token', token);

  //     return true;
  //   } catch (error) {
  //     Cookies.remove('token');
  //     return false;
  //   }
  // };
  // useEffect(() => {
  //   checkToken();
  // }, []);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (email: string, password: string, name: string): Promise<RegisterResponse> => {
    try {
      const { data } = await tesloApi.post('/user/register', { email, password, name });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] Login', payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error instanceof Error) {
        const err = error as AxiosError;
        return {
          hasError: true,
          message: err.message,
        };
      }

      return {
        hasError: true,
        message: 'Error when creating the user',
      };
    }
  };

  const logoutUser = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('addressAditional');
    Cookies.remove('zipCode');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');

    signOut();
  };

  const authProviderValue = useMemo(
    () => ({
      ...state, loginUser, registerUser, logoutUser,
    }),
    [state, loginUser, registerUser, logoutUser],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
