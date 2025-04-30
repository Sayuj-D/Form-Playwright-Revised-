// app/api/auth/authMiddleware.ts
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const secretKey = "mysecretkey1234";

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch {
    throw new Error("Token is invalid or expired");
  }
}

export async function middleware(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const user = verifyJWT(token);
    // Attach the user information to the request if needed
    request.user = user;
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { error: "Token is invalid or expired" },
      { status: 401 }
    );
  }
}
