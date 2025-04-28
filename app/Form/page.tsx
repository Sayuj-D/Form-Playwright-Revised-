"use client";
// import { console } from "inspector";
import React, { startTransition, useRef, useState, useTransition } from "react";
import { checkHere } from "@/components/utils/check";
import toastdisplay from "@/components/utils/toastdisplay";
import { ToastContainer } from "react-toastify";

const Form = () => {
  // use of the useRef:

  const [errors, setErrors] = useState<checkHere>({});
  const [pending, startTransition] = useTransition();
  const inputref = {
    name_ref: useRef<HTMLInputElement>(null),
    email_ref: useRef<HTMLInputElement>(null),
    password_ref: useRef<HTMLInputElement>(null),
    date_ref: useRef<HTMLInputElement>(null),
    male_ref: useRef<HTMLInputElement>(null),
    female_ref: useRef<HTMLInputElement>(null),
    others_ref: useRef<HTMLInputElement>(null),
    country_ref: useRef<HTMLInputElement>(null),
    writing_ref: useRef<HTMLInputElement>(null),
    design_ref: useRef<HTMLInputElement>(null),
    coding_ref: useRef<HTMLInputElement>(null),
    testing_ref: useRef<HTMLInputElement>(null),
    aboutme_ref: useRef<HTMLInputElement>(null),
  };

  // const name_ref = useRef<HTMLInputElement | null>(null);
  // const email_ref = useRef<HTMLInputElement | null>(null);
  // const password_ref = useRef<HTMLInputElement | null>(null);
  // const date_ref = useRef<HTMLInputElement | null>(null);
  // const male_ref = useRef<HTMLInputElement | null>(null);
  // const female_ref = useRef<HTMLInputElement | null>(null);
  // const others_ref = useRef<HTMLInputElement | null>(null);
  // // const gender_ref = useRef();
  // const country_ref = useRef<HTMLInputElement | null>(null);
  // const writing_ref = useRef<HTMLInputElement | null>(null);
  // const design_ref = useRef<HTMLInputElement | null>(null);
  // const coding_ref = useRef<HTMLInputElement | null>(null);
  // const testing_ref = useRef<HTMLInputElement | null>(null);
  // const aboutme_ref = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // let gender = "";
    // collect value from the input fields.
    const name = inputref["name_ref"].current?.value.trim();
    const email = inputref["email_ref"].current?.value;
    const password = inputref["password_ref"].current?.value;
    const date = inputref["date_ref"].current?.value;
    const country = inputref["country_ref"].current?.value;
    const writing = inputref["writing_ref"].current?.checked;
    const design = inputref["design_ref"].current?.checked;
    const testing = inputref["testing_ref"].current?.checked;
    const coding = inputref["coding_ref"].current?.checked;
    const aboutMe = inputref["aboutme_ref"].current?.value;

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
      !inputref["male_ref"].current?.checked &&
      !inputref["female_ref"].current?.checked &&
      !inputref["others_ref"].current?.checked
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
      // Transition logic here
      startTransition(async () => {
        await new Promise((res) => setTimeout(res, 3000));
      });

      toastdisplay.formSubmitting();
      setTimeout(() => {
        toastdisplay.formSubmitted();
      }, 3000);

      setErrors({});

      inputref["name_ref"].current!.value = "";
      inputref["email_ref"].current!.value = "";
      inputref["password_ref"].current!.value = "";
      inputref["date_ref"].current!.value = "";
      inputref["male_ref"].current!.checked = false;
      inputref["female_ref"].current!.checked = false;
      inputref["others_ref"].current!.checked = false;
      inputref["country_ref"].current!.value = "Nepal";
      inputref["writing_ref"].current!.checked = false;
      inputref["design_ref"].current!.checked = false;
      inputref["coding_ref"].current!.checked = false;
      inputref["testing_ref"].current!.checked = false;
      inputref["aboutme_ref"].current!.value = "";
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
            ref={inputref["name_ref"]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              if (errors.name) {
                setErrors((prevError) => {
                  return { ...prevError, name: "" };
                });
              }
            }}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}

          {/* email */}
          <input
            type="email"
            placeholder="Email"
            // name="email"
            ref={inputref["email_ref"]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              if (errors.email) {
                setErrors((prevError) => {
                  return { ...prevError, email: "" };
                });
              }
            }}
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}

          {/* password */}
          <input
            type="password"
            placeholder="Password"
            // name="password"
            ref={inputref["password_ref"]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={() => {
              if (errors.password) {
                setErrors((prevError) => {
                  return { ...prevError, password: "" };
                });
              }
            }}
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}

          {/* Date */}
          <p className="text-blue-600 mb-1 pl-1 text-[14px]">Date of Birth</p>
          <input
            type="date"
            placeholder="Date of Birth"
            // name="dateOfbirth"
            ref={inputref["date_ref"]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              if (errors.date) {
                setErrors((prevError) => {
                  return { ...prevError, date: "" };
                });
              }
            }}
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
                ref={inputref["male_ref"]}
                // checked={gender === "male"}
                onChange={(e) => {
                  if (errors.gender) {
                    setErrors((prevError) => {
                      return { ...prevError, gender: "" };
                    });
                  }
                }}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                ref={inputref["female_ref"]}
                // checked={gender === "female"}
              />
              Female
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="others"
                ref={inputref["others_ref"]}
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
            ref={inputref["country_ref"]}
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
                ref={inputref["coding_ref"]}
                onChange={(e) => {
                  if (errors.coding) {
                    setErrors((prevError) => {
                      return { ...prevError, coding: "" };
                    });
                  }
                }}
              />
              Coding
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="design"
                // name="design"
                ref={inputref["design_ref"]}
                onChange={(e) => {
                  if (errors.coding) {
                    setErrors((prevError) => {
                      return { ...prevError, coding: "" };
                    });
                  }
                }}
              />
              Design
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="writting"
                // name="writing"
                ref={inputref["writing_ref"]}
                onChange={(e) => {
                  if (errors.coding) {
                    setErrors((prevError) => {
                      return { ...prevError, coding: "" };
                    });
                  }
                }}
              />
              Writing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="testing"
                // name="testing"
                ref={inputref["testing_ref"]}
                onChange={(e) => {
                  if (errors.coding) {
                    setErrors((prevError) => {
                      return { ...prevError, coding: "" };
                    });
                  }
                }}
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
            ref={inputref["aboutme_ref"]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              if (errors.aboutMe) {
                setErrors((prevError) => {
                  return { ...prevError, aboutMe: "" };
                });
              }
            }}
          />
        </div>
        {errors.aboutMe && <p className="text-red-600">{errors.aboutMe}</p>}

        {/* Submit */}
        <div className="flex gap-2 justify-center items-center ">
          <div>
            {pending ? (
              <img
                className="w-8 h-8"
                src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif"
                alt=""
              />
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
            disabled={pending}
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
