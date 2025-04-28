"use client";
// import { console } from "inspector";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from "react";

type checkHere = {
  name: string;
  email: string;
  password: string;
  date: string;
  country: string;
  coding: string;
  aboutMe: string;
  gender: string;
};

interface FormValues {
  [key: string]: string | undefined;
  name?: string;
  email?: string;
  // Add other form field types here if needed
}

const Form = () => {
  // use of the useRef:
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const registerInput = useCallback((inputElement: HTMLInputElement | null) => {
    if (inputElement) {
      inputRefs.current[inputElement.name] = inputElement;
    } else {
      delete inputRefs.current[inputElement?.name ?? ""];
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    inputRefs?.current[name]?.setCustomValidity("");
    setErrors((prev) => ({
      ...prev,
      name: "",
    }));
  };

  const resetValidity = () => {
    const allRefs = inputRefs?.current;
    Object.keys(allRefs)?.map((d) => {
      allRefs[d]?.setCustomValidity("");
    });
  };

  const handleSubmit = (event: FormEvent) => {
    try {
      event.preventDefault();
      resetValidity();
      const { name, email } = formValues;
      if (name?.length <= 3) {
        inputRefs.current["name"]?.setCustomValidity(
          "Name must be greater than 3 characters"
        );
        setErrors((prev) => ({
          ...prev,
          name: "Name must be greater than 3 characters",
        }));
      }

      const formElement = event.currentTarget as HTMLFormElement;
      const isFormValid = formElement.reportValidity();
      console.log(isFormValid);

      console.log("Form Values:", formValues);
      console.log("Name:", formValues.name);
      console.log("Email:", formValues.email);
    } catch (error) {
      console.log(error);
    } finally {
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
            autoComplete="on"
            placeholder="Full Name"
            name="name"
            required
            maxLength={30}
            minLength={3}
            ref={registerInput}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.name && <p className="text-red-600">{errors.name}</p>}

          {/* email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            ref={registerInput}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors?.email && <p className="text-red-600">{errors.email}</p>}
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
