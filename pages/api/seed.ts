import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { Product, User } from '../../models';

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { products, users } = seedDatabase.initialData;
  await db.connect();

  // Users
  await User.deleteMany();
  await User.insertMany(users);

  // Products
  await Product.deleteMany();
  await Product.insertMany(products);

  await db.disconnect();
  return res.status(201).json({ message: 'ok' });
}
