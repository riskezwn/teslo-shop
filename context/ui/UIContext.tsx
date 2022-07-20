import { createContext } from 'react';

export interface ContextProps {
  isMenuOpen: boolean;
  // Methods
  toggleSideMenu: () => void
}

export const UIContext = createContext({} as ContextProps);
