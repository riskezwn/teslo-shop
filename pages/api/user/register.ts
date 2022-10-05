import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { validations } from '../../../utils';

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

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must contain 6 characters or more',
    });
  }
  if (name.length < 2) {
    return res.status(400).json({
      message: 'Name must contain 2 characters or more',
    });
  }
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'Email is not valid',
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: 'Email is already registered',
    });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }

  await db.disconnect();
  const { role } = newUser;
  // const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token: '',
    user: {
      email, role, name,
    },
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);
    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}
