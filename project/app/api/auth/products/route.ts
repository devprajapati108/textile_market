import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import mongoose from 'mongoose';
import connectDB from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
// import {nextConnect} from 'next-connect';
// const nextConnect = require('next-connect');
import { upload } from '../../../lib/multerConfig';
// import nextConnect from 'next-connect';
// import { createRouter } from 'next-connect';
// import { NextRequest } from 'next/server';
// import nextConnect from 'next-connect';
// import { createRouter, NextApiRequest, NextApiResponse } from 'next-connect';
import { NextRequest } from 'next/server';
// import { NextApiHandler } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';

// export const dynamic = 'force-dynamic';

export const dynamic = 'force-dynamic'; // optional but good for file uploads

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const images: string[] = [];
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    const files = formData.getAll('images');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {

      // if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${i}-${file.name}`;
        const filepath = path.join(uploadsDir, filename);
        await writeFile(filepath, buffer);
        images.push(`/uploads/${filename}`);
      }
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;
    const userRole = formData.get('userRole') as string;
    const moq = formData.get('moq') as string;
    const specificationsRaw = formData.get('specifications') as string;

    if (!name || !description || !price || !category || !userRole || !moq) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    let specifications = {};
    if (specificationsRaw) {
      try {
        specifications = JSON.parse(specificationsRaw);
      } catch {
        return NextResponse.json({ message: 'Invalid specifications format' }, { status: 400 });
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      userRole,
      moq,
      images,
      specifications,
    });

    return NextResponse.json({ message: 'Product added', product }, { status: 201 });

  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ==============---------------------=================-----------------

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const handler = nextConnect<NextApiRequest, NextApiResponse>({
//   onError(error, req, res) {
//     console.error('Error:', error);
//     res.status(500).json({ message: error.message });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   },
// });

// handler.use(upload.array('images'));
// handler.post(async (req: any, res: any) => {
//   try {
//     await connectDB();

//     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
//     const images: string[] = [];

//     for (let i = 0; i < req.files.length; i++) {
//       const file = req.files[i];
//       const filename = `${Date.now()}-${i}-${file.originalname}`;
//       const filepath = path.join(uploadsDir, filename);
//       await writeFile(filepath, file.buffer);
//       images.push(`/uploads/${filename}`);
//     }

//     const { name, description, price, category, userRole, moq, specifications } = req.body;

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // ✅ Defensive specifications parsing
//     let parsedSpecs = {};
//     if (specifications) {
//       try {
//         if (typeof specifications === 'string') {
//           parsedSpecs = JSON.parse(specifications);
//         } else if (typeof specifications === 'object') {
//           parsedSpecs = specifications;
//         } else {
//           console.warn('Unexpected specifications type:', typeof specifications);
//         }
//       } catch (err) {
//         console.error('❌ Failed to parse specifications:', err);
//         return res.status(400).json({ message: 'Invalid specifications format' });
//       }
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       moq,
//       images,
//       specifications: parsedSpecs,
//     });

//     res.status(201).json({ message: 'Product added', product });
//   } catch (err: any) {
//     console.error('❌ Upload error:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

// export default handler;

// --------------------------------===============-------------------
// export const POST = handler.post;

// handler.post(async (req: any, res: any) => {
//   try {
//     await connectDB();

//     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
//     const images: string[] = [];

//     for (let i = 0; i < req.files.length; i++) {
//       const file = req.files[i];
//       const filename = `${Date.now()}-${i}-${file.originalname}`;
//       const filepath = path.join(uploadsDir, filename);
//       await writeFile(filepath, file.buffer); // ✅ Now no error
//       // await fs.writeFile(filepath, file.buffer);
//       images.push(`/uploads/${filename}`);
//       console.log("image name is--->",images);
//     }

//     const { name, description, price, category, userRole, moq, specifications } = req.body;

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // const parsedSpecs = specifications ? JSON.parse(specifications) : {};
//     let parsedSpecs = {};

//     // ✅ Safe parsing of specifications
//     if (specifications) {
//       try {
//         if (typeof specifications === 'string') {
//           parsedSpecs = JSON.parse(specifications);
//         } else {
//           throw new Error('Invalid format for specifications');
//         }
//       } catch (err) {
//         console.error('❌ Failed to parse specifications:', err);
//         return res.status(400).json({ message: 'Invalid specifications format' });
//       }
//     }
//     console.log("specifications received:", specifications);
// console.log("Type of specifications:", typeof specifications);


//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       moq,
//       images,
//       specifications: parsedSpecs,
//     });

//     res.status(201).json({ message: 'Product added', product });
//   } catch (err: any) {
//     console.error('❌ Upload error:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };



// export const POST = handler.post;
// export default handler;
// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const formData = await req.formData();

//     const images: string[] = [];

//     const files = formData.getAll('images') as File[];

//     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       const filename = `${Date.now()}-${i}.jpg`;
//       const filepath = path.join(uploadsDir, filename);
//       await writeFile(filepath, new Uint8Array(buffer));

//       // await writeFile(filepath, buffer);
//       images.push(`/uploads/${filename}`);
//     }

//     const name = formData.get('name') as string;
//     const description = formData.get('description') as string;
//     const price = Number(formData.get('price'));
//     const category = formData.get('category') as string;
//     const userRole = formData.get('userRole') as string;
//     const moq = Number(formData.get('moq'));
//     const specifications = formData.get('specifications')
//       ? JSON.parse(formData.get('specifications') as string)
//       : {};

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       moq,
//       images,
//       specifications,
//     });

//     return NextResponse.json({ message: 'Product added', product }, { status: 201 });
//   } catch (error: any) {
//     console.error('❌ Upload error:', error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

// export const runtime = 'nodejs';


// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const formData = await req.formData();
//     const name = formData.get('name');
//     const description = formData.get('description');
//     const price = formData.get('price');
//     const category = formData.get('category');
//     const userRole = formData.get('userRole');
//     const moq = formData.get('moq');
//     const specifications = formData.get('specifications');
//     const files = formData.getAll('images');

//     const uploadsDir = path.join(process.cwd(), 'public/uploads');
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }


//     const images: string[] = [];
//     const multerFiles = files as Express.Multer.File[];

//     for (let i = 0; i < multerFiles.length; i++) {
//       const file = multerFiles[i];
//       const filename = `${Date.now()}-${i}.jpg`;
//       const filepath = path.join(uploadsDir, filename);
    
//       fs.writeFileSync(filepath, file.buffer); // ✅ multer provides buffer
    
//       images.push(`/uploads/${filename}`);
//     }
    
//     // for (let i = 0; i < files.length; i++) {
//     //   const file = files[i]; // already has a `buffer` property
//     //   const buffer = file.buffer; // multer provides this
//     //   const filename = `${Date.now()}-${i}.jpg`;
//     //   const filepath = path.join(uploadsDir, filename);
    
//     //   fs.writeFileSync(filepath, file.buffer); // ✅ directly use multer's buffer
    
//     //   images.push(`/uploads/${filename}`);
//     // }
    
// //     for (let i = 0; i < files.length; i++) {
// //       const file = files[i];
// // const buffer = file.buffer; // multer provides this

// //       // const file = files[i] as Blob;
// //       // const arrayBuffer = await file.arrayBuffer();
// //       // const buffer = Buffer.from(arrayBuffer); // Now valid with Node.js runtime

// //       const filename = `${Date.now()}-${i}.jpg`;
// //       const filepath = path.join(uploadsDir, filename);
// //       fs.writeFileSync(filepath, new Uint8Array(buffer));

// //       // fs.writeFileSync(filepath, buffer);
// //       images.push(`/uploads/${filename}`);
// //     }

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       images,
//       specifications: specifications ? JSON.parse(specifications.toString()) : {},
//       moq,
//     });

//     return NextResponse.json({ message: 'Product added successfully', product }, { status: 201 });
//   } catch (error: any) {
//     console.error('❌ Error:', error);
//     return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const formData = await req.formData();
//     const name = formData.get('name');
//     const description = formData.get('description');
//     const price = formData.get('price');
//     const category = formData.get('category');
//     const userRole = formData.get('userRole');
//     const moq = formData.get('moq');
//     const specifications = formData.get('specifications');
//     const files = formData.getAll('images');

//     const uploadsDir = path.join(process.cwd(), 'public/uploads');
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     const images: string[] = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i] as Blob;
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const filePath = `/uploads/${Date.now()}-${i}.jpg`;
//       const fullPath = path.join(uploadsDir, `${Date.now()}-${i}.jpg`);
//       fs.writeFileSync(fullPath, buffer);
//       images.push(filePath);
//     }

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       images,
//       specifications: specifications ? JSON.parse(specifications.toString()) : {},
//       moq,
//     });

//     return NextResponse.json({ message: 'Product added successfully', product }, { status: 201 });
//   } catch (error: any) {
//     console.error('❌ Error:', error);
//     return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
//   }
// }
// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const formData = await req.formData();

//     const name = formData.get('name');
//     const description = formData.get('description');
//     const price = formData.get('price');
//     const category = formData.get('category');
//     const userRole = formData.get('userRole');
//     const moq = formData.get('moq');
//     const specifications = formData.get('specifications');
//     const files = formData.getAll('images');

//     // ⚠️ File uploads are currently Blobs. You must handle them manually.
//     // Example (skipped actual save to disk/cloud):
//     const images = files.map((file: any, i) => `/uploads/temp-${Date.now()}-${i}.jpg`);

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       images,
//       specifications: specifications ? JSON.parse(specifications.toString()) : {},
//       moq,
//     });

//     return NextResponse.json({ message: 'Product added successfully', product }, { status: 201 });
//   } catch (error: any) {
//     console.error('❌ Error:', error);
//     return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
//   }
// }


// Create handler using next-connect to use multer middleware
// const handler: NextApiHandler = nextConnect();
// const handler = nextConnect<NextApiRequest, NextApiResponse>();

// handler.use(upload.array('images')); // field name in formData

// handler.post(async (req: any, res: any) => {
//   try {
//     await connectDB();

//     const { name, description, price, category, userRole, moq, specifications } = req.body;

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const images = req.files.map((file: any) => `/uploads/${file.filename}`);

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       images,
//       specifications: specifications ? JSON.parse(specifications) : {},
//       moq,
//     });

//     return res.status(201).json({ message: 'Product added successfully', product });
//   } catch (error: any) {
//     console.error('❌ Error:', error);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });

// export default handler;

// ------------------------------------------------old-----------==========-
// // Create handler using next-connect to use multer middleware
// const handler = nextConnect();

// handler.use(upload.array('images')); // field name in formData

// handler.post(async (req: any, res: any) => {
//   try {
//     await connectDB();

//     const { name, description, price, category, userRole, moq, specifications } = req.body;

//     if (!name || !description || !price || !category || !userRole || !moq) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const images = req.files.map((file: any) => `/uploads/${file.filename}`);

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       images,
//       specifications: specifications ? JSON.parse(specifications) : {},
//       moq,
//     });

//     return res.status(201).json({ message: 'Product added successfully', product });
//   } catch (error: any) {
//     console.error('❌ Error:', error);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });

// export default handler;


export async function GET() {
  try {
    await connectDB(); // Ensure DB connection

    // Fetch all products
    const products = await Product.find();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



// export async function POST(request: Request) {
//   try {
//     console.log("🔄 Connecting to MongoDB...");
//     await connectDB(); // Ensure DB connection
//     console.log("✅ Database Connected!");

//     // Parse JSON
//     const body = await request.json();
//     console.log("📥 Received Data:", body);

//     const { name, description, price, category, userRole, images, specifications, moq } = body;

//     // ✅ Validate required fields (excluding userId)
//     if (!name || !description || !price || !category || !userRole || !moq) {
//       console.log("❌ Missing required fields");
//       return NextResponse.json({ message: "All fields are required" }, { status: 400 });
//     }

//     // ✅ Create and save product (No userId)
//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userRole,
//       images: images || [],
//       specifications: specifications || {},
//       moq,
//     });

//     console.log("✅ Product created:", product);

//     return NextResponse.json({ message: "Product added successfully", product }, { status: 201 });
//   } catch (error) {
//     console.error("❌ Error inserting product:", error);
//     return NextResponse.json({ message: "Internal server error",error: error instanceof Error ? error.message : String(error)}, { status: 500 });
//   }
// }


// export async function POST(request: Request) {
//   try {
//     console.log("🔄 Connecting to MongoDB...");
//     await connectDB(); // Ensure DB connection
//     console.log("✅ Database Connected!");

//     // Parse JSON
//     const body = await request.json();
//     console.log("📥 Received Data:", body);

//     const { name, description, price, category,  userRole, images, specifications, moq } = body;

//     // ✅ Validate required fields || !userId userId,
//     if (!name || !description || !price || !category  || !userRole || !moq) {
//       console.log("❌ Missing required fields");
//       return NextResponse.json({ message: "All fields are required" }, { status: 400 });
//     }

//     // // ✅ Validate userId
//     // if (!mongoose.Types.ObjectId.isValid(userId)) {
//     //   console.log("❌ Invalid userId:", userId);
//     //   return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
//     // }
//     // const validUserId = new mongoose.Types.ObjectId(userId);
//     // console.log("✅ Valid userId:", validUserId);

//     // ✅ Create and save product
//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category, // userId: validUserId,
//       userRole,
//       images: images || [],
//       specifications: specifications || {},
//       moq,
//     });

//     console.log("✅ Product created:", product);

//     return NextResponse.json({ message: "Product added successfully", product }, { status: 201 });
//   } catch (error) {
//     console.error("❌ Error inserting product:", error);
//     return NextResponse.json({ message: "Internal server error", }, { status: 500 });
//   }
// }//error: error.message 


// export async function POST(request: Request) {
//   try {
//     await connectDB(); // Ensure DB connection

//     const { name, description, price, category, userId, userRole, images, specifications, moq } =
//       await request.json();

//     // ✅ Validate required fields
//     if (!name || !description || !price || !category || !userId || !userRole || !moq) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     // ✅ Convert userId to ObjectId
//     const validUserId = new mongoose.Types.ObjectId(userId);

//    // ✅ Create and save product
//    const product = await Product.create({
//     name,
//     description,
//     price,
//     category,
//     userId: validUserId,// userId, // Already validated
//     userRole,
//     images: images || [],
//     specifications: specifications || {},
//     moq,
//   });

//   return NextResponse.json({ message: "Product added successfully", product }, { status: 201 });


//     // // ✅ Create and save product
//     // const newProduct = new Product({
//     //   name,
//     //   description,
//     //   price,
//     //   category,
//     //   userId: validUserId,
//     //   userRole,
//     //   images: images || [],
//     //   specifications: specifications || {},
//     //   moq,
//     // });

//     // await newProduct.save();

//     // return NextResponse.json({ message: 'Product added successfully', product: newProduct }, { status: 201 });
//   } catch (error) {
//     console.error('Error inserting product:', error);
//     return NextResponse.json({ message: 'Internal server error',error }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import  connectDB  from '@/app/lib/mongodb';
// import Product from '@/app/models/Product';
// import { ObjectId } from "mongodb";


// // Handle GET request (Fetch products)
// export async function GET(request: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     const userId = searchParams.get('userId');

//     if (id) {
//       const product = await Product.findById(id);
//       if (!product) {
        
//         return NextResponse.json({ message: 'Product not found' }, { status: 404 });
//       }
//       return NextResponse.json(product, { status: 200 });
//     }

//     const filter = userId ? { userId } : {};
//     const products = await Product.find(filter);

//     return NextResponse.json(products, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }

// // Handle POST request (Add a new product)
// export async function POST(request: Request) {
//   try {
//     await connectDB();
//     const body = await request.json();

//     const { name, description, price, category, userId, userRole, images, specifications, moq } = body;

//     if (!name || !description || !price || !category || !userId || !userRole || !moq) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const newProduct = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       userId,
//       userRole,
//       images: images || [],
//       specifications: specifications || {},
//       moq,
//     });

//     return NextResponse.json({ message: 'Product added successfully', product: newProduct }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating product:', error);
//     return NextResponse.json({ message: 'Internal Server Error in' }, { status: 500 });
//   }
// }



// // import { NextApiRequest, NextApiResponse } from 'next';
// // import connectDB from '@/app/lib/mongodb';
// // import Product from '@/app/models/Product';

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   await connectDB();

// //   if (req.method === 'GET') {
// //     try {
// //       const { id, userId } = req.query;

// //       if (id) {
// //         const product = await Product.findById(id);
// //         if (!product) return res.status(404).json({ message: 'Product not found' });
// //         return res.status(200).json(product);
// //       }

// //       // Optionally fetch products by userId
// //       const filter = userId ? { userId } : {};
// //       const products = await Product.find(filter);
// //       return res.status(200).json(products);
// //     } catch (error) {
// //       return res.status(500).json({ message: 'Error fetching products', error });
// //     }
// //   }

// //   if (req.method === 'POST') {
// //     try {
// //       const newProduct = await Product.create(req.body);
// //       return res.status(201).json({ message: 'Product added', product: newProduct });
// //     } catch (error) {
// //       return res.status(400).json({ message: 'Error creating product', error });
// //     }
// //   }

// //   return res.status(405).json({ message: 'Method Not Allowed' });
// // }



// // // import { NextRequest, NextResponse } from 'next/server';

// // // const products = [
// // //   {
// // //     id: 1,
// // //     title: 'Essence Mascara Lash Princess',
// // //     description: 'Volumizing and lengthening mascara.',
// // //     category: 'beauty',
// // //     price: 9.99,
// // //     stock: 5,
// // //     thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
// // //   },
// // //   {
// // //     "id": 2,
// // //     "title": "Cotton Blend T-Shirt",
// // //     "description": "A premium cotton blend T-shirt, designed for ultimate comfort and durability. Breathable fabric with a stylish fit for everyday wear.",
// // //     "price": 19.99,
// // //     "stock": 25,
// // //     "category": "textile",
// // //     "thumbnail": "https://assets.ajio.com/medias/sys_master/root/20220822/xQtr/63033535aeb26917618c443e/-288Wx360H-469274639-white-MODEL.jpg"
// // //   }
  
// // // ];

// // // export async function GET(request: NextRequest) {
// // //   const { searchParams } = new URL(request.url);
// // //   const id = searchParams.get('id');

// // //   if (id) {
// // //     const product = products.find((p) => p.id === parseInt(id));
// // //     console.log("id is :-"+id)
// // //     return NextResponse.json(product || {});
// // //   }

// // //   return NextResponse.json({ products });
// // // }
