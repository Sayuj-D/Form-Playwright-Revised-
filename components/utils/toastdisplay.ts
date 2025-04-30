import { toast, Bounce } from "react-toastify";

const showToast = (type, message, theme = "light", autoClose = 1000) => {
  toast[type](message, {
    position: "top-right",
    autoClose,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
    transition: Bounce,
  });
};

const toastdisplay = {
  userNotFound: () => showToast("error", "User not found!"),
  emptyField: () => showToast("warning", "Empty field detected!"),
  incorrectPassword: () => showToast("error", "Incorrect password!"),
  loginSuccess: () => showToast("success", "Login Successful!"),
  fillAllFields: () =>
    showToast("warn", "Please fill all the fields!", "colored"),
  signUpSuccessfull: () =>
    showToast("success", "SignUp Successful!", "colored"),
  formSubmitting: () => showToast("warn", "Form Submitting", "colored", 1996),
  formSubmitted: () => showToast("success", "Form Submitted!", "colored", 1996),
};

export default toastdisplay;
