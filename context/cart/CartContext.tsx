/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { ICartProduct, IOrderSummary } from '../../interfaces';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  orderSummary: IOrderSummary;
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);

export default CartContext;
