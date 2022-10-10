import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string
}

const getPaypalBearerToken = async (): Promise<string|null> => {
  const PAYPAL_PUBLIC = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const { PAYPAL_SECRET } = process.env;
  const base64Token = Buffer.from(`${PAYPAL_PUBLIC}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        Authorization: `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw new Error(err.response?.data as string);
    } else {
      throw new Error(error as string);
    }
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(200).json({ message: 'Paypal unauthorized' });
  }
  return res.status(200).json({ message: paypalBearerToken });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
