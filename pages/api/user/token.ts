import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';

type Data =
  | { message: string }
  | {
      token: string
      user: {
        role: string,
        email: string,
        name: string
      }
  }

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // const { token = '' } = req.cookies;
  let userId = '';

  try {
    userId = 'gufygfyfy';
  } catch (error) {
    return res.status(200).json({
      message: 'Invalid authorization token',
    });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({
      message: 'user does not exist',
    });
  }

  const {
    email, role, name,
  } = user;

  return res.status(200).json({
    token: '',
    user: {
      email,
      role,
      name,
    },
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}
