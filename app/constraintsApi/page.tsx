"use client";
import React, { useRef } from "react";

const Constraintsform = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validEmails = [
    "sayujrumsan@gmail.com",
    "sayuj@gmail.com",
    "runsan@gmail.com",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset custom messages
    nameRef.current.setCustomValidity("");
    passwordRef.current.setCustomValidity("");
    emailRef.current.setCustomValidity("");

    let isValid = true;

    const name = nameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const email = emailRef.current.value.trim();

    // Name must be "sayujya"
    if (name.toLowerCase() !== "sayujya") {
      nameRef.current.setCustomValidity("Name must be 'sayujya'.");
      isValid = false;
    }

    // Password must be exactly 8 characters
    if (password.length !== 8) {
      passwordRef.current.setCustomValidity(
        "Password must be exactly 8 characters."
      );
      isValid = false;
    }

    // Check for valid email
    if (!validEmails.includes(email)) {
      emailRef.current.setCustomValidity("Email does not match!");
      isValid = false;
    }

    // Show validation messages
    const nameValid = nameRef.current.reportValidity();
    const emailValid = emailRef.current.reportValidity();
    const passwordValid = passwordRef.current.reportValidity();

    if (isValid && nameValid && emailValid && passwordValid) {
      alert("The form is submitted.");
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <div className="bg-blue-50 p-8 rounded-2xl max-w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-[400px]"
        noValidate
      >
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Name"
          required
          className="border-2 rounded-md border-slate-400 py-2 px-2"
        />
        <input
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border-2 rounded-md border-slate-400 py-2 px-2"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border-2 rounded-md border-slate-400 py-2 px-2"
        />
        <button
          type="submit"
          className="bg-amber-200 rounded-md py-2 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Constraintsform;
