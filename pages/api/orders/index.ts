import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';
import { authOptions } from '../auth/[...nextauth]';

type Data =
 | { message: string}
 | IOrder

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderSummary, orderItems } = req.body as IOrder;
  const { total } = orderSummary;

  // Verify session
  const session: any = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Create products array
  const productsIds = orderItems.map((product) => product._id);
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find((prod) => prod.id === current._id)?.price;
      if (!currentPrice) {
        throw new Error('Verify cart');
      }
      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const serverTotal = subTotal * (taxRate + 1);

    if (total !== serverTotal) {
      throw new Error('Total does not match');
    }

    // All OK
    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    db.disconnect();
    return res.status(400).json({ message: error.message || 'Bad request' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
