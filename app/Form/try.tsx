import React, { useRef, useCallback, useState } from "react";
function MyForm() {
  const inputRefs = useRef({});
  const [formValues, setFormValues] = useState({});
  const registerInput = useCallback((inputElement) => {
    if (inputElement) {
      inputRefs.current[inputElement.name] = inputElement;
    } else {
      // Clean up if the element is unmounted
      delete inputRefs.current[inputElement.name];
    }
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    // You can access the DOM element directly if needed:
    // console.log(inputRefs.current[name]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Values:", formValues);
    // Access individual input values using formValues
    console.log("Name:", formValues.name);
    console.log("Email:", formValues.email);
    // You can also access the DOM elements directly if absolutely necessary:
    // console.log('Name Input Element:', inputRefs.current.name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={registerInput}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={registerInput}
          onChange={handleInputChange}
        />
      </div>
      {/* More input fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
export default MyForm;
