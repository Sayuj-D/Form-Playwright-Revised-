import { toast, Bounce } from "react-toastify";

const showToast = (message, type, theme) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
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
  userNotFound: () => showToast("User not found", "error", "light"),
  emptyField: () => showToast("Empty field detected!", "warning", "light"),
  incorrectPassword: () => showToast("Incorrect password!", "error", "light"),
  loginSuccess: () => showToast("Login Successful!", "success", "colored"),
  fillAllFields: () =>
    showToast("Please fill all the fields!", "warning", "light"),
  signUpSuccessfull: () =>
    showToast("SignUp Successful!", "success", "colored"),
  formSubmitting: () => showToast("Form Submitting", "warning", "light"),
  formSubmitted: () => showToast("Form Submitted!", "success", "colored"),
};

export default toastdisplay;
