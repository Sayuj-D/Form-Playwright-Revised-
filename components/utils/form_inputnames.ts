import { useRef } from "react";
export const inputNames = [
  "name",
  "email",
  "password",
  "date",
  "country",
  "aboutMe",
  "male",
  "female",
  "others",
  "writing",
  "design",
  "coding",
  "testing",
] as const;

export const inputRefs = useRef<Record<InputKeys, HTMLInputElement | null>>({
  name: null,
  email: null,
  password: null,
  date: null,
  country: null,
  aboutMe: null,
  male: null,
  female: null,
  others: null,
  writing: null,
  design: null,
  coding: null,
  testing: null,
});
