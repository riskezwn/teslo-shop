import React, {
  FC, ReactNode, useMemo, useReducer,
} from 'react';
import { AuthContext, authReducer } from '.';
import { IUser } from '../../interfaces';

interface Props {
  children: ReactNode
}

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined,
};

export const AuthProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const authProviderValue = useMemo(
    () => ({
      ...state,
    }),
    [state],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
