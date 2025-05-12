"use client";
import React, { useState, useTransition } from "react";
import { checkHere } from "@/components/utils/check";
import toastdisplay from "@/components/utils/toastdisplay";
import { ToastContainer } from "react-toastify";

import { inputNames } from "@/components/utils/form_inputnames";
import { inputRefs } from "@/components/utils/form_inputnames";

type InputKeys = (typeof inputNames)[number];

const Form = () => {
  const [errors, setErrors] = useState<checkHere>({});
  const [pending, startTransition] = useTransition();

  const resetError = (field: keyof checkHere) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getValue = (key: InputKeys) => inputRefs.current[key]?.value || "";
  const getChecked = (key: InputKeys) =>
    inputRefs.current[key]?.checked || false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = getValue("name").trim();
    const email = getValue("email");
    const password = getValue("password");
    const date = getValue("date");
    const country = getValue("country");
    const aboutMe = getValue("aboutMe");
    const hobbies = ["coding", "design", "writing", "testing"].filter(
      getChecked
    );
    const genders = ["male", "female", "others"].filter(getChecked);

    const validEmails = [
      "sayujdhungana@gmail.com",
      "rumsan@gmail.com",
      "sayujrumsan@gmail.com",
    ];
    const today = new Date();
    const hundredYearsAgo = new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate()
    );

    const newErrors: checkHere = {};

    if (!name) newErrors.name = "Name is required.";
    else if (name.length < 3 || name.length > 60)
      newErrors.name = "Character Length Mismatch";

    if (!email) newErrors.email = "Email is Required.";
    else if (!validEmails.includes(email))
      newErrors.email = "Please Use Valid Email.";

    if (!password) newErrors.password = "Password is Required.";
    else if (password.length < 8 || password.length > 25) {
      newErrors.password = "Password should be between 8 to 25 characters.";
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9\s]/.test(password)
    ) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character.";
    }

    if (!date) newErrors.date = "Date is Required.";
    else if (new Date(date) < hundredYearsAgo || new Date(date) > today) {
      newErrors.date = "Invalid Date.";
    }

    if (!genders.length) newErrors.gender = "Please select a gender.";
    if (!country) newErrors.country = "Please select a country.";
    if (!hobbies.length) newErrors.coding = "Select at least one hobby.";

    if (!aboutMe) newErrors.aboutMe = "Please fill this field.";
    else if (aboutMe.length < 10 || aboutMe.length > 50) {
      newErrors.aboutMe = "Characters should be between 10 and 50.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    startTransition(async () => {
      toastdisplay.formSubmitting();
      await new Promise((res) => setTimeout(res, 3000));
      toastdisplay.formSubmitted();

      // Reset all fields
      inputNames.forEach((key) => {
        const ref = inputRefs.current[key];
        if (ref?.type === "checkbox" || ref?.type === "radio")
          ref.checked = false;
        else if (ref) ref.value = key === "country" ? "Nepal" : "";
      });
      setErrors({});
    });
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

        <input
          placeholder="Full Name"
          ref={(el) => (inputRefs.current.name = el)}
          onChange={() => resetError("name")}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.name && <p className="text-red-600">{errors.name}</p>}

        <input
          placeholder="Email"
          ref={(el) => (inputRefs.current.email = el)}
          onChange={() => resetError("email")}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.email && <p className="text-red-600">{errors.email}</p>}

        <input
          placeholder="Password"
          type="password"
          ref={(el) => (inputRefs.current.password = el)}
          onChange={() => resetError("password")}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.password && <p className="text-red-600">{errors.password}</p>}

        <input
          type="date"
          ref={(el) => (inputRefs.current.date = el)}
          onChange={() => resetError("date")}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.date && <p className="text-red-600">{errors.date}</p>}

        <div className="space-y-2">
          <label className="block font-medium">Gender</label>
          {["male", "female", "others"].map((gender) => (
            <label key={gender} className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value={gender}
                ref={(el) => (inputRefs.current[gender as InputKeys] = el)}
                onChange={() => resetError("gender")}
              />
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </label>
          ))}
          {errors.gender && <p className="text-red-600">{errors.gender}</p>}
        </div>

        <select
          ref={(el) => (inputRefs.current.country = el)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="Nepal">Nepal</option>
          <option value="India">India</option>
          <option value="China">China</option>
          <option value="Korea">Korea</option>
        </select>
        {errors.country && <p className="text-red-600">{errors.country}</p>}

        <div className="space-y-2">
          <label className="block font-medium">Hobbies</label>
          {["coding", "design", "writing", "testing"].map((hobby) => (
            <label key={hobby} className="flex items-center gap-2">
              <input
                type="checkbox"
                ref={(el) => (inputRefs.current[hobby as InputKeys] = el)}
                onChange={() => resetError("coding")}
              />
              {hobby.charAt(0).toUpperCase() + hobby.slice(1)}
            </label>
          ))}
          {errors.coding && <p className="text-red-600">{errors.coding}</p>}
        </div>

        <textarea
          placeholder="Tell us about yourself"
          ref={(el) => (inputRefs.current.aboutMe = el)}
          onChange={() => resetError("aboutMe")}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.aboutMe && <p className="text-red-600">{errors.aboutMe}</p>}

        <div className="flex items-center justify-center gap-2">
          {pending && (
            <img
              className="w-8 h-8"
              src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif"
              alt="Loading"
            />
          )}
          <button
            type="submit"
            disabled={pending}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
