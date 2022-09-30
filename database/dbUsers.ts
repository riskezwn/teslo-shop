import bcrypt from 'bcryptjs';
import { db } from '.';
import { User } from '../models';

export const checkUserEmailPassword = async (email:string, password: string) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) return null;
  if (user && user.password) {
    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }
  }

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLocaleLowerCase(),
    role,
    name,
  };
};

export const check = () => {};
