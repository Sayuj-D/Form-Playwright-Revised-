"use client";
import React, { useRef } from "react";
import { Inputrefs } from "./utils/Inputrefs";

const Form = () => {
  // use of the useRef:

  const inputRefs = useRef<Partial<Inputrefs>>({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button is clicked");

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
            ref={(e) => {
              inputRefs.current["fullname"] = e;
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            ref={(e) => {
              inputRefs.current["email"] = e;
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={(e) => {
              inputRefs.current["password"] = e;
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Date */}
          <input
            type="date"
            placeholder="Date of Birth"
            name="dateOfbirth"
            ref={(e) => {
              inputRefs.current["dateOfbirth"] = e;
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                ref={(e) => {
                  inputRefs.current.genderMale = e;
                }}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                ref={(e) => {
                  inputRefs.current.genderFemale = e;
                }}
              />
              Female
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="others"
                ref={(e) => {
                  inputRefs.current.genderothers = e;
                }}
              />
              Others
            </label>
          </div>
        </div>

        {/* Countries */}
        <div>
          <label
            htmlFor="country"
            className="block text-gray-700 font-medium mb-2"
          >
            Country
          </label>
          <select
            id="country"
            name="countries"
            ref={(e) => {
              inputRefs.current["countries"] = e;
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="Korea">Korea</option>
          </select>
        </div>

        {/* Hobbies */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Hobbies
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="coding"
                name="coding"
                ref={(e) => {
                  inputRefs.current["coding"] = e;
                }}
              />
              Coding
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="design"
                name="design"
                ref={(e) => {
                  inputRefs.current["design"] = e;
                }}
              />
              Design
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="writting"
                name="writing"
                ref={(e) => {
                  inputRefs.current["writing"] = e;
                }}
              />
              Writing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="testing"
                name="testing"
                ref={(e) => {
                  inputRefs.current["testing"] = e;
                }}
              />
              Testing
            </label>
          </div>
        </div>

        {/* Tell us about yourself */}
        <div>
          <textarea
            placeholder="Tell us about yourself"
            name="aboutme"
            ref={(e) => {
              inputRefs.current["aboutme"] = e;
            }}
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
