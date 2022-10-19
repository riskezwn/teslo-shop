import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
  | IProduct[]
  | { message: string }

const getProducts = async (req: NextApiRequest, res: NextApiResponse<{ message: string; }>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  // TODO: Update images
  return res.status(200).json(products);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return res.status(400).json({ message: 'Bad request' });
    case 'PUT':
      return res.status(400).json({ message: 'Bad request' });
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
