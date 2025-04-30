// app/api/auth/login.ts
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const secretKey = "mysecretkey1234";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // const userData = JSON.parse(localStorage.getItem("users") || "[]");
    // const userInDB = userData.find((user) => user.email === email);

    // if (!userInDB) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    if (email !== "test@gmail.com") {
      return NextResponse.json({ error: "Incorrect email" }, { status: 401 });
    }

    if (password !== "123") {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign({ username: "hello", email: email }, secretKey, {
      expiresIn: "15s",
    });
    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Login failed" },
      { status: 500 }
    );
  }
}
