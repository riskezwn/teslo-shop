import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { Product } from '../../models';

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { products } = seedDatabase.initialData;

  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(products);
  await db.disconnect();

  return res.status(201).json({ message: 'ok' });
}
