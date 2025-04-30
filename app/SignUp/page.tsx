// app/signup/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import toastdisplay from "@/components/utils/toastdisplay";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toastdisplay.fillAllFields();
      return;
    }

    const newUser = { username, email, password };

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", result.token);
        toastdisplay.signUpSuccessfull();
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        // toastdisplay.error(result.error || "Signup failed.");
        alert("signup failed");
      }
    } catch {
      // toastdisplay.error("Something went wrong. Please try again.");
      alert("try again");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-4">
        <h1 className="text-2xl font-medium">SignUp Form</h1>
        <form
          className="flex flex-col gap-5 bg-slate-100 w-[400px] p-6 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="UserName"
            value={username}
            className="border-2 rounded-md p-2 border-slate-300"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 rounded-md p-2 border-slate-300"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-md p-2 border-slate-300"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 font-medium text-[18px] rounded-md cursor-pointer"
            type="submit"
          >
            Signup
          </button>

          <Link
            href={"/login"}
            className="text-gray-600 text-[14px] text-center"
          >
            Already Registered? <span className="text-blue-600">Login</span>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
