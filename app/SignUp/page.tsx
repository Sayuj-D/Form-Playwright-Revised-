"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handelSubmit = (e) => {
    e.preventDefault();

    const newUser = { username, email, password };
    if (!username && !email && !password) {
      toast.warn("Please fill all the fields!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      // Retrieve existing users from localStorage (or an empty array if no users exist)
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Add the new user to the existing users array
      existingUsers.push(newUser);

      // Save the updated users array back to localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      toast.success("SignUp Successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/LogIn");
      }, 1000);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-4">
        <h1 className="text-2xl font-medium">SignUp Form</h1>
        <form
          className="flex flex-col gap-5 bg-slate-100 w-[400px] p-6 rounded-2xl"
          onSubmit={handelSubmit}
        >
          <input
            type="text"
            placeholder="UserName"
            className="border-2 rounded-md p-2 border-slate-300"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 rounded-md p-2 border-slate-300"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-md p-2 border-slate-300"
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

          <Link href={"/LogIn"} className="text-blue-400">
            Already Registered? Login
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
