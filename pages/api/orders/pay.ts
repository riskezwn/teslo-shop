import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IPaypal } from '../../../interfaces';
import { Order } from '../../../models';

type Data = {
  message: string
}

const getPaypalBearerToken = async ():Promise<string|null> => {
  const PAYPAL_PUBLIC = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const { PAYPAL_SECRET } = process.env;
  const base64Token = Buffer.from(`${PAYPAL_PUBLIC}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        Authorization: `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw new Error(err.response?.data as string);
    } else {
      throw new Error(error as string);
    }
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO: validar sesión usuario
  // TODO: validar mongoId

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(200).json({ message: 'Paypal unauthorized' });
  }

  const { transactionId = '', orderId = '' } = req.body;

  const { data } = await axios.get<IPaypal.PaypalCheckoutResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${paypalBearerToken}`,
    },
  });

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Order unrecognized' });
  }

  await db.connect();
  const order = await Order.findById(orderId);

  if (data.status !== 'COMPLETED') {
    await db.disconnect();
    return res.status(400).json({ message: 'Order unrecognized' });
  }

  if (order?.orderSummary.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res.status(400).json({ message: 'Error in the amounts when making the payment' });
  }

  order.transactionId = transactionId;
  order.isPaid = true;
  await order.save();

  await db.disconnect();

  return res.status(200).json({ message: 'Order paid' });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
