"use client";
import React, { useRef } from "react";
import { Inputrefs } from "./utils/Inputrefs";

const Form = () => {
  // use of the useRef:

  const inputRefs = { name_ref: useRef(null), email_ref: useRef(null) };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button is clicked");

    console.log(inputRefs["name_ref"]?.current?.value);

    const formFields = [
      inputRefs.current.fullname,
      inputRefs.current.email,
      inputRefs.current.password,
      inputRefs.current.dateOfbirth,
      inputRefs.current.aboutme,
    ];

    for (const i of formFields) {
      if (i) {
        i.setCustomValidity("");
        if (!i.value) {
          i.setCustomValidity("This is required!");
          i.reportValidity();
          console.log(i.value, "here");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Register
        </h2>

        {/* fullname */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            ref={inputRefs["name_ref"]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
