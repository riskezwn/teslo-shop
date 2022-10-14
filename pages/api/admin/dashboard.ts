import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { DashboardSummaryResponse } from '../../../interfaces';
import { Order, Product, User } from '../../../models';

type Data =
  | DashboardSummaryResponse
  | {
    message: string;
  }

const getSummaryData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  db.connect();
  const [
    numberOfOrders,
    paidOrders,
    pendingOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    productsLowStock,
  ] = await Promise.all([
    Order.count(),
    Order.count({ isPaid: true }),
    Order.count({ isPaid: false }),
    User.count({ role: 'client' }),
    Product.count(),
    Product.count({ inStock: { $eq: 0 } }),
    Product.count({ inStock: { $lt: 10 } }),
  ]);
  db.disconnect();

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    pendingOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    productsLowStock,
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getSummaryData(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
