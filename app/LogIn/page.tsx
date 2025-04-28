"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import toastdisplay from "@/components/utils/toastdisplay";

const Login = () => {
  const [entered_email, setentered_Email] = useState("");
  const [entered_password, setentered_Password] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if either field is empty
    if (!entered_email || !entered_password) {
      toastdisplay.emptyField();
      return;
    }

    // retrive pre-existing data from localstorage.
    const userData = JSON.parse(localStorage.getItem("users")) || [];

    // find is used to search the array and retrive the first data.

    const userInDB = userData.find(
      (userInDB) => userInDB.email === entered_email
    );

    // If no user is found or password doesn't match, show error
    if (!userInDB) {
      toastdisplay.userNotFount();
      return; // Prevent further execution if user is not found
    }

    if (userInDB.password !== entered_password) {
      toastdisplay.incorrectPassword();
      return; // Prevent further execution if password is incorrect
    }

    // If the credentials are correct
    toastdisplay.loginSuccess();

    // Save user session info in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(userInDB));

    // Redirect to Home page after successful login
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
            // value={entered_email}
            onChange={(e) => setentered_Email(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-slate-400 rounded-md p-2"
            // value={entered_password}
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
