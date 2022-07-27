/* eslint-disable no-underscore-dangle */
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

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart) {
      return dispatch({
        type: '[Cart] Update cart',
        payload: [...state.cart, product],
      });
    }

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size,
    );
    if (!productInCartButDifferentSize) {
      return dispatch({
        type: '[Cart] Update cart',
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // eslint-disable-next-line no-param-reassign
      p.quantity += product.quantity;

      return p;
    });

    return dispatch({
      type: '[Cart] Update cart',
      payload: updatedProducts,
    });
  };

  const cartProviderValue = useMemo(() => (
    { ...state, addProductToCart }), [state, addProductToCart]);

  return (
    <CartContext.Provider value={cartProviderValue}>
      {children}
    </CartContext.Provider>
  );
};
