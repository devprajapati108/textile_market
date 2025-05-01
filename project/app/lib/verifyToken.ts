import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(token: string): {
  valid: boolean;
  decoded: null | (JwtPayload & { userId: string; email: string; role: string });
} {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET! || "secret");

    if (typeof decoded === "string") {
      return { valid: false, decoded: null };
    }

    return {
      valid: true,
      decoded: decoded as JwtPayload & {
        userId: string;
        email: string;
        role: string;
      },
    };
  } catch (error) {
    return { valid: false, decoded: null };
  }
}


// import jwt from "jsonwebtoken";

// export function verifyToken(token: string) {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET! || "secret");
//     return { valid: true, decoded };
//   } catch (error) {
//     return { valid: false, decoded: null };
//   }
// }


// // import { NextRequest, NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";

// // export async function GET(req: NextRequest) {
// //   const authHeader = req.headers.get("authorization");

// //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //   }

// //   const token = authHeader.split(" ")[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET! || "secret");
// //     return NextResponse.json({ message: "Token is valid", user: decoded }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ message: "Invalid token" }, { status: 403 });
// //   }
// // }
