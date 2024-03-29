import { ISize, IGender } from '.';

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: IGender;
  quantity: number;
}

export interface IOrderSummary {
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  addressAditional?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
}
