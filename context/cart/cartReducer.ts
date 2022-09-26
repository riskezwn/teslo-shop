/* eslint-disable max-len */
import { CartState } from '.';
import { ICartProduct, IOrderSummary, IShippingAddress } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] Load cart', payload: ICartProduct[] }
  | { type: '[Cart] Update cart', payload: ICartProduct[] }
  | { type: '[Cart] Update product cart quantity', payload: ICartProduct }
  | { type: '[Cart] Remove product cart', payload: ICartProduct }
  | { type: '[Cart] Update order summary', payload: IOrderSummary }
  | { type: '[Cart] Load address from cookies', payload: IShippingAddress }
  | { type: '[Cart] Update address', payload: IShippingAddress }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[Cart] Load cart':
      return {
        ...state,
        cart: action.payload,
        isLoaded: true,
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
    case '[Cart] Update order summary':
      return {
        ...state,
        orderSummary: action.payload,
      };
    case '[Cart] Load address from cookies':
    case '[Cart] Update address':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
