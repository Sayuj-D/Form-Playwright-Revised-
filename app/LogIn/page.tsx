// app/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import toastdisplay from "@/components/utils/toastdisplay";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enteredEmail || !enteredPassword) {
      toastdisplay.emptyField();
      return;
    }

    const loginDetails = { email: enteredEmail, password: enteredPassword };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const result = await response.json();
      console.log("json", result);
      // console.log(object);
      if (response.ok) {
        localStorage.setItem("authToken", result.token); // Store JWT token
        toastdisplay.loginSuccess();

        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        // toastdisplay.error(result.error || "Login failed.");
        alert("login failed");
      }
    } catch (err) {
      console.log(err);
      // toastdisplay.error("Something went wrong. Please try again.");
      alert("try again");
    }
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
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-slate-400 rounded-md p-2"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
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
