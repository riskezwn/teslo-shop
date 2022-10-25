import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
  | IProduct[]
  | IProduct
  | { message: string }

const getProducts = async (req: NextApiRequest, res: NextApiResponse<{ message: string; }>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean() as IProduct[];
  await db.disconnect();

  const updatedProducts = products.map((product) => {
    // eslint-disable-next-line no-param-reassign
    product.images = product.images.map((image) => (image.includes('http') ? image : `${process.env.NEXTAUTH_URL}/products/${image}`));
    return product;
  });
  return res.status(200).json(updatedProducts as any);
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: 'At least 2 images are required' });
  }

  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug });
    if (productInDB) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const product = new Product(req.body as IProduct);
    await product.save();

    await db.disconnect;

    return res.status(201).json(product);
  } catch (error: any) {
    await db.disconnect();
    throw new Error(error);
  }
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'Id not valid' });
  }
  if (images.length < 2) {
    return res.status(400).json({ message: 'At least 2 images are required' });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({ message: 'Product does not exists' });
    }

    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId] = image.substring(image.lastIndexOf('/') + 1)
          .split('.');
        await cloudinary.uploader.destroy(fileId);
      }
      return image;
    });

    await product.updateOne(req.body as IProduct);

    await db.disconnect();
    return res.status(201).json(product);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
