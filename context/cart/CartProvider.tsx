/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, {
  FC, ReactNode, useEffect, useMemo, useReducer, useRef,
} from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import { CartContext, cartReducer } from '.';
import {
  ICartProduct, IOrder, IOrderSummary, IShippingAddress, Response,
} from '../../interfaces';
import { tesloApi } from '../../api_base';

interface Props {
  children: ReactNode
}

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  orderSummary: IOrderSummary
  shippingAddress?: IShippingAddress
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  orderSummary: {
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  shippingAddress: undefined,
};

export const CartProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const productsInCookies = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : [];
      dispatch({
        type: '[Cart] Load cart',
        payload: productsInCookies,
      });
    } catch (error) {
      dispatch({
        type: '[Cart] Load cart',
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (Cookie.get('firstName')) {
      const addressInCookies: IShippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        addressAditional: Cookie.get('addressAditional') || '',
        zipCode: Cookie.get('zipCode') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      };
      dispatch({
        type: '[Cart] Load address from cookies',
        payload: addressInCookies,
      });
    }
  }, []);

  const isCartReloading = useRef(true);

  useEffect(() => {
    if (isCartReloading.current) {
      isCartReloading.current = false;
    } else {
      Cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary: IOrderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };
    dispatch({ type: '[Cart] Update order summary', payload: orderSummary });
  }, [state.cart]);

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] Update product cart quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] Remove product cart', payload: product });
  };

  const updateAddress = (address: IShippingAddress) => {
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('address', address.address);
    Cookie.set('addressAditional', address.addressAditional || '');
    Cookie.set('zipCode', address.zipCode);
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);

    dispatch({ type: '[Cart] Update address', payload: address });
  };

  const createOrder = async ():Promise<Response> => {
    if (!state.shippingAddress) {
      throw new Error('Invalid shipping address');
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      orderSummary: state.orderSummary,
      isPaid: false,
    };

    try {
      const { data } = await tesloApi.post('/orders', body);
      dispatch({ type: '[Cart] Order complete' });

      return {
        hasError: false,
        message: data._id,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error instanceof Error) {
        const err = error as any;
        return {
          hasError: true,
          message: err.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: 'Error creating order',
      };
    }
  };

  const cartProviderValue = useMemo(
    () => ({
      ...state, addProductToCart, updateCartQuantity, removeCartProduct, updateAddress, createOrder,
    }),
    [state, addProductToCart, updateCartQuantity, removeCartProduct, updateAddress, createOrder],
  );

  return (
    <CartContext.Provider value={cartProviderValue}>
      {children}
    </CartContext.Provider>
  );
};
