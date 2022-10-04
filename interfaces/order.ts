import {
  IUser, ISize, IShippingAddress, IOrderSummary,
} from '.';

export interface IOrderItem {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
}

export interface IOrder {
  _id: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;
  orderSummary: IOrderSummary;
  isPaid: boolean;
  paidAt?: string;
}
