import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import connectDB from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import { upload } from '@/app/lib/multerConfig'; // make sure this is configured correctly

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: 'Method Not Allowed' });
  },
});

handler.use(upload.array('images')); // handle multiple files with name "images"

handler.post(async (req: any, res: any) => {
  try {
    await connectDB();

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const images: string[] = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const filename = `${Date.now()}-${i}-${file.originalname}`;
      const filepath = path.join(uploadsDir, filename);

      await fs.writeFile(filepath, file.buffer);
      images.push(`/uploads/${filename}`);
    }

    const { name, description, price, category, userRole, moq, specifications } = req.body;

    if (!name || !description || !price || !category || !userRole || !moq) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const parsedSpecs = specifications ? JSON.parse(specifications) : {};

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      userRole,
      moq: Number(moq),
      images,
      specifications: parsedSpecs,
    });

    res.status(201).json({ message: 'Product added', product });
  } catch (err: any) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ message: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false, // Required for multer to work
  },
};

export default handler;
