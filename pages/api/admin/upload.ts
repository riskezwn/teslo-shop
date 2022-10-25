import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = { message: string; }

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: formidable.File): Promise<string> => {
  const { secure_url: secureUrl } = await cloudinary.uploader.upload(file.filepath);
  return secureUrl;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => new Promise((res, rej) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return rej(err);
    }

    const filePath = await saveFile(files.file as formidable.File);
    return res(filePath);
  });
});

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageUrl = await parseFiles(req);

  return res.status(200).json({ message: imageUrl });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}
