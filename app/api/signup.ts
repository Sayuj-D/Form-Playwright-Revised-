// app/api/auth/signup.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userAlreadyExists = existingUsers.some(
      (user) => user.email === email
    );

    if (userAlreadyExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = { username, email, password };
    existingUsers.push(newUser);

    // Save new user to localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
