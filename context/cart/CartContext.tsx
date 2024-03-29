/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import {
  ICartProduct, IOrderSummary, IShippingAddress, Response,
} from '../../interfaces';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  orderSummary: IOrderSummary;
  shippingAddress?: IShippingAddress;
  // Cart
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;
  // Orders
  createOrder: () => Promise<Response>
}

export const CartContext = createContext({} as ContextProps);

export default CartContext;
