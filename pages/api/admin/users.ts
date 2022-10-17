import { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';

type Data =
  | IUser[]
  | { message: string }

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'User ID does not exists' });
  }
  const validRoles = ['client', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Role not allowed' });
  }

  await db.connect();
  const user = await User.findById(userId);

  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: 'User not found' });
  }

  user.role = role;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'User updated' });
};

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();

  return res.status(200).json(users);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'PUT':
      return updateUser(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
