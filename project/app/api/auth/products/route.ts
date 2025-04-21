import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/app/lib/mongodb';
import Product from '@/app/models/Product';

export async function POST(request: Request) {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await connectDB(); // Ensure DB connection
    console.log("✅ Database Connected!");

    // Parse JSON
    const body = await request.json();
    console.log("📥 Received Data:", body);

    const { name, description, price, category, userRole, images, specifications, moq } = body;

    // ✅ Validate required fields (excluding userId)
    if (!name || !description || !price || !category || !userRole || !moq) {
      console.log("❌ Missing required fields");
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // ✅ Create and save product (No userId)
    const product = await Product.create({
      name,
      description,
      price,
      category,
      userRole,
      images: images || [],
      specifications: specifications || {},
      moq,
    });

    console.log("✅ Product created:", product);

    return NextResponse.json({ message: "Product added successfully", product }, { status: 201 });
  } catch (error) {
    console.error("❌ Error inserting product:", error);
    return NextResponse.json({ message: "Internal server error",error: error instanceof Error ? error.message : String(error)}, { status: 500 });
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
