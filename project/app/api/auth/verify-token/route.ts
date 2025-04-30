// /app/api/auth/verify-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/verifyToken";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { valid, decoded } = verifyToken(token);

  if (!valid) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  return NextResponse.json({ message: "Valid", user: decoded });
}
