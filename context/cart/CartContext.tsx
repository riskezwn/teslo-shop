import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
  cart: ICartProduct[];
  // eslint-disable-next-line no-unused-vars
  addProductToCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);

export default CartContext;
