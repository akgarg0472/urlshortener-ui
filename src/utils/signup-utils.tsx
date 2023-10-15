import Swal from "sweetalert2";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "./validation-utils";

const validateSignupPage1 = (
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): boolean => {
  if (!validateString(lastName)) {
    Swal.fire({
      icon: "error",
      title: "Last name is required",
      customClass: "modal",
    });
    return false;
  }

  if (!validateEmail(email)) {
    Swal.fire({
      icon: "error",
      title: "Please provide valid email",
      customClass: "modal",
    });
    return false;
  }

  if (!validatePassword(password)) {
    Swal.fire({
      icon: "error",
      title: "Please provide valid Password",
      customClass: "modal",
    });
    return false;
  }

  if (!validatePassword(confirmPassword)) {
    Swal.fire({
      icon: "error",
      title: "Please provide valid Confirm Password",
      customClass: "modal",
    });
    return false;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match",
      customClass: "modal",
    });
    return false;
  }

  return true;
};

const validateSignupPage2 = (
  phoneNumber: string,
  city: string,
  zipcode: string,
  country: string
): boolean => {
  return false;
};

export { validateSignupPage1, validateSignupPage2 };
