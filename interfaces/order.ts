import {
  IUser, ISize, IShippingAddress, IOrderSummary, IGender,
} from '.';

export interface IOrderItem {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: IGender;
}

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;
  orderSummary: IOrderSummary;
  isPaid: boolean;
  paidAt?: string;
  transactionId?: string;
  createdAt?: string;
}
