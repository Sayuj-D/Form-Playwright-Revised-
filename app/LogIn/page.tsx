"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import toastdisplay from "@/components/utils/toastdisplay";
import jwtEncode from "jwt-encode"; // <- NEW LIBRARY

const Login = () => {
  const [entered_email, setentered_Email] = useState("");
  const [entered_password, setentered_Password] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!entered_email || !entered_password) {
      toastdisplay.emptyField();
      return;
    }

    const userData = JSON.parse(localStorage.getItem("users") || "[]");

    const userInDB = userData.find(
      (user: { email: string }) => user.email === entered_email
    );

    if (!userInDB) {
      toastdisplay.userNotFount();
      return;
    }

    if (userInDB.password !== entered_password) {
      toastdisplay.incorrectPassword();
      return;
    }

    // ✅ Successful login
    toastdisplay.loginSuccess();

    // ✅ Generate JWT token
    const payload = {
      username: userInDB.username,
      email: userInDB.email,
      time: new Date().getTime(),
    };
    const secret = "your-secret-key"; // You can put any random string here
    const token = jwtEncode(payload, secret);

    // ✅ Save token to localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(userInDB));

    setTimeout(() => {
      router.push("/home");
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-2xl font-medium mb-4">LogIn</p>
        <form
          className="flex flex-col gap-6 bg-slate-100 w-[400px] p-6 rounded-2xl"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-slate-400 rounded-md p-2"
            onChange={(e) => setentered_Email(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-slate-400 rounded-md p-2"
            onChange={(e) => setentered_Password(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 font-medium text-[18px] rounded-md cursor-pointer"
            type="submit"
          >
            Login
          </button>
          <Link
            href="/signup"
            className="text-gray-600 text-[14px] text-center"
          >
            Not Registered?<span className="text-blue-600"> SignUp</span>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
