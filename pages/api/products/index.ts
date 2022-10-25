import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../models';
import { IGender, IProduct } from '../../../interfaces';

type Data =
  | { message: string }
  | IProduct[]

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = 'all' } = req.query;
  let condition = {};

  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender as IGender}`)) {
    condition = { gender };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();

  const updatedProducts = products.map((product) => {
    // eslint-disable-next-line no-param-reassign
    product.images = product.images.map((image) => (image.includes('http') ? image : `${process.env.NEXTAUTH_URL}/products/${image}`));
    return product;
  });

  return res.status(200).json(updatedProducts);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
