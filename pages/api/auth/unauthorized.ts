import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return res.status(401).json({ message: 'Unauthorized' });
}
