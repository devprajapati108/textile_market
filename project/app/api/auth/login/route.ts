// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/app/lib/mongodb';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET! || 'secret',
      { expiresIn: '1d' }
    );
    console.log(token);

    return NextResponse.json(
      { message: 'Login successful', token, role: user.role },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/app/lib/mongodb';
// import User from '@/app/models/User';
// import { signToken } from '@/app/lib/auth';

// export async function POST(request: Request) {
//   try {
//     await connectDB();

//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { message: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { message: 'Invalid email or password' },
//         { status: 400 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { message: 'Invalid email or password' },
//         { status: 400 }
//       );
//     }

//     const token = signToken(user.email, user._id.toString(), user.role);
//     console.log(token, "this is token");

//     return NextResponse.json(
//       { message: 'Login successful', token, role: user.role },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/app/lib/mongodb';
// import User from '@/app/models/User';
// import jwt from 'jsonwebtoken';

// export async function POST(request: Request) {
//   try {
//     await connectDB();

//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { message: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { message: 'Invalid email or password' },
//         { status: 400 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { message: 'Invalid email or password' },
//         { status: 400 }
//       );
//     }

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET! || 'secret',
//       { expiresIn: '1h' }
//     );
// console.log(token,"this is token");
//     return NextResponse.json(
//       { message: 'Login successful', token, role: user.role },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
