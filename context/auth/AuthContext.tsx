/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { IUser, Response } from '../../interfaces';

export interface ContextProps {
  isLogged: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (email: string, password: string, name: string) => Promise<Response>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
