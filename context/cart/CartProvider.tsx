import React, {
  FC, ReactNode, useMemo, useReducer,
} from 'react';
import { CartContext, cartReducer } from '.';
import { ICartProduct } from '../../interfaces';

interface Props {
  children: ReactNode
}

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const cartProviderValue = useMemo(() => ({ ...state }), [state]);

  return (
    <CartContext.Provider value={cartProviderValue}>
      {children}
    </CartContext.Provider>
  );
};
