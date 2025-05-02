import { toast, Bounce } from "react-toastify";

const showToast = (message, type, theme = "colored") => {
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
  userNotFound: () => showToast("User not found", "error"),
  emptyField: () => showToast("Empty field detected!", "warning"),
  incorrectPassword: () => showToast("Incorrect password!", "error"),
  loginSuccess: () => showToast("Login Successful!", "success"),
  fillAllFields: () => showToast("Please fill all the fields!", "warning"),
  signUpSuccessfull: () => showToast("SignUp Successful!", "success"),
  formSubmitting: () => showToast("Form Submitting", "warning"),
  formSubmitted: () => showToast("Form Submitted!", "success"),
};

export default toastdisplay;
