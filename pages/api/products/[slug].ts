import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
  | { message: string }
  | IProduct

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.images = product.images.map((image) => (image.includes('http') ? image : `${process.env.APP_URL}/products/${image}`));

  return res.status(200).json(product);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
