import { CartState } from '.';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] Load cart', payload: ICartProduct[] }
  | { type: '[Cart] Update cart', payload: ICartProduct[] }

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
    default:
      return state;
  }
};

export default cartReducer;
