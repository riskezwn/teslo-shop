import { createContext } from 'react';
import { IUser } from '../../interfaces';

export interface ContextProps {
  isLogged: boolean;
  user?: IUser;
}

export const AuthContext = createContext({} as ContextProps);
