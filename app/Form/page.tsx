"use client";
// import { console } from "inspector";
import React, { useRef, useState } from "react";

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

const Form = () => {
  // use of the useRef:

  const [errors, setErrors] = useState<checkHere>({});
  const name_ref = useRef<HTMLInputElement | null>(null);
  const email_ref = useRef<HTMLInputElement | null>(null);
  const password_ref = useRef<HTMLInputElement | null>(null);
  const date_ref = useRef<HTMLInputElement | null>(null);
  const male_ref = useRef<HTMLInputElement | null>(null);
  const female_ref = useRef<HTMLInputElement | null>(null);
  const others_ref = useRef<HTMLInputElement | null>(null);
  // const gender_ref = useRef();
  const country_ref = useRef<HTMLInputElement | null>(null);
  const writing_ref = useRef<HTMLInputElement | null>(null);
  const design_ref = useRef<HTMLInputElement | null>(null);
  const coding_ref = useRef<HTMLInputElement | null>(null);
  const testing_ref = useRef<HTMLInputElement | null>(null);
  const aboutme_ref = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    console.log("i am here", name_ref.current);
    e.preventDefault();
    // let gender = "";
    // collect value from the input fields.
    const name = name_ref.current?.value.trim();
    console.log(name);
    const email = email_ref.current?.value;
    const password = password_ref.current?.value;
    const date = date_ref.current?.value;
    const country = country_ref.current?.value;
    const writing = writing_ref.current?.checked;
    const design = design_ref.current?.checked;
    const testing = testing_ref.current?.checked;
    const coding = coding_ref.current?.checked;
    const aboutMe = aboutme_ref.current?.value;

    // reset all custom validations:
    // name_ref.current?.setCustomValidity("");
    // aboutme_ref.current.setCustomValidity("");
    // male_ref.current.setCustomValidity("");
    // female_ref.current.setCustomValidity("");
    // others_ref.current.setCustomValidity("");

    // valid emails:
    const validEmails = [
      "sayujdhungana@gmail.com",
      "rumsan@gmail.com",
      "sayujrumsan@gmail.com",
    ];

    // valid date:
    const today = new Date();
    const hundredYearsAgo = new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];

    // validation:

    // for name:
    const newErros: checkHere = {};
    if (!name) {
      // const msg = "Name is required.";
      // name_ref.current?.setCustomValidity(msg);
      newErros.name = "Name is required.";
    } else if (name.length < 3 || name.length > 60) {
      newErros.name = "Character Length Mismatch";
    }

    // for email:
    if (!email) {
      newErros.email = "Email is Required.";
    }
    // why -1 ?
    // in JS, if the object is not found it returns -1
    else if (validEmails.indexOf(email) === -1) {
      newErros.email = "Please Use Valid Email.";
    }

    // for password
    if (!password) {
      newErros.password = "Password is Required.";
    } else if (password.length < 8 || password.length > 25) {
      newErros.password = "Password Should be Bewteen 8 to 25 Characters.";
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9\s]/.test(password)
    ) {
      newErros.password = `The Password must contain:  
      - atleast one capital letter
      - one small letter 
      - one number 
      - one special character.`;
    }

    // for date:
    if (!date) {
      newErros.date = "Date is Required.";
    } else if (
      // why Date(date)?
      // why not only date.

      // to convert the date that is string into the object.
      new Date(date) < new Date(hundredYearsAgo) ||
      new Date(date) > today
    ) {
      newErros.date = "Invalid Date.";
    }
    // console.log(date);

    // for gender selection:
    // if (!gender) {
    //   newErros.gender = "Please Select Gender";
    // }
    // console.log(gender.current.checked);

    // for countries:
    if (!country) {
      newErros.country = "Please Select a Country.";
    }

    // for hobbies:
    if (!coding && !testing && !writing && !design) {
      newErros.coding = "Please select at least one option.";
    }

    // for gender:

    if (
      !male_ref.current?.checked &&
      !female_ref.current?.checked &&
      !others_ref.current?.checked
    ) {
      // male_ref.current.setCustomValidity("Please select a gender.");
      newErros.gender = "Please select a gender.";
    }

    // for about me:
    if (!aboutMe) {
      newErros.aboutMe = "Please fill the field.";
    }
    if (aboutMe.length < 10 || aboutMe.length > 50) {
      newErros.aboutMe = "The characters should between 10 and 50.";
    }

    if (Object.keys(newErros).length > 0) {
      setErrors(newErros);
    } else {
      alert("Form Submitted.");
      setErrors({});
      name_ref.current!.value = "";
      email_ref.current!.value = "";
      password_ref.current!.value = "";
      date_ref.current!.value = "";
      male_ref.current!.checked = false;
      female_ref.current!.checked = false;
      others_ref.current!.checked = false;
      country_ref.current!.value = "Nepal";
      writing_ref.current!.checked = false;
      design_ref.current!.checked = false;
      coding_ref.current!.checked = false;
      testing_ref.current!.checked = false;
      aboutme_ref.current!.value = "";
    }
  };
  // report the validity:
  // name_ref.current?.reportValidity();
  // male_ref.current?.reportValidity();
  // female_ref.current?.reportValidity();
  // others_ref.current?.reportValidity();

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
            // name="fullname"
            ref={name_ref}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}

          {/* email */}
          <input
            type="email"
            placeholder="Email"
            // name="email"
            ref={email_ref}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}

          {/* password */}
          <input
            type="password"
            placeholder="Password"
            // name="password"
            ref={password_ref}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}

          {/* Date */}
          <p className="text-blue-600 mb-1 pl-1 text-[14px]">Date of Birth</p>
          <input
            type="date"
            placeholder="Date of Birth"
            // name="dateOfbirth"
            ref={date_ref}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && <p className="text-red-600">{errors.date}</p>}
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
                ref={male_ref}
                // checked={gender === "male"}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                ref={female_ref}
                // checked={gender === "female"}
              />
              Female
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="others"
                ref={others_ref}
                // checked={gender === "others"}
              />
              Others
            </label>
          </div>
          {errors.gender && <p className="text-red-600">{errors.gender}</p>}
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
            // name="countries"
            ref={country_ref}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="Korea">Korea</option>
          </select>
        </div>
        {errors.country && <p className="text-red-600">{errors.country}</p>}

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
                // name="coding"
                ref={coding_ref}
              />
              Coding
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="design"
                // name="design"
                ref={design_ref}
              />
              Design
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="writting"
                // name="writing"
                ref={writing_ref}
              />
              Writing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="testing"
                // name="testing"
                ref={testing_ref}
              />
              Testing
            </label>
          </div>
        </div>
        {errors.coding && <p className="text-red-600">{errors.coding}</p>}

        {/* Tell us about yourself */}
        <div>
          <textarea
            placeholder="Tell us about yourself"
            // name="aboutme"
            ref={aboutme_ref}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errors.aboutMe && <p className="text-red-600">{errors.aboutMe}</p>}

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
