/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { IUser } from '../../interfaces';
import { RegisterResponse } from './AuthProvider';

export interface ContextProps {
  isLogged: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (email: string, password: string, name: string) => Promise<RegisterResponse>;
}

export const AuthContext = createContext({} as ContextProps);
