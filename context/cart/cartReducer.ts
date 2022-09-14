/* eslint-disable max-len */
import { CartState } from '.';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] Load cart', payload: ICartProduct[] }
  | { type: '[Cart] Update cart', payload: ICartProduct[] }
  | { type: '[Cart] Update product cart quantity', payload: ICartProduct }
  | { type: '[Cart] Remove product cart', payload: ICartProduct }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[Cart] Load cart':
      return {
        ...state,
        cart: action.payload,
      };
    case '[Cart] Update cart':
      return {
        ...state,
        cart: [...action.payload],
      };
    case '[Cart] Update product cart quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };
    case '[Cart] Remove product cart':
      return {
        ...state,
        cart: state.cart.filter((product) => !(product._id === action.payload._id && product.size === action.payload.size)),

      };
    default:
      return state;
  }
};

export default cartReducer;
