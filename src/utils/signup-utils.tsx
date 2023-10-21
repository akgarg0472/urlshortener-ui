import Modal, { ModalIcon } from "../components/modal/Modal";
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
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide last name",
    });

    return false;
  }

  if (!validateEmail(email)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid email",
    });
    return false;
  }

  if (!validatePassword(password)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid password",
    });
    return false;
  }

  if (!validatePassword(confirmPassword)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid confirm password",
    });
    return false;
  }

  if (password !== confirmPassword) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Passwords doesn't match",
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
  if (!validateString(phoneNumber) || phoneNumber.length < 10) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid phone number",
    });
    return false;
  }

  if (!validateString(city)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid city",
    });
    return false;
  }

  if (!validateString(zipcode)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid zipcode",
    });
    return false;
  }

  if (!validateString(country)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid country",
    });
    return false;
  }

  return true;
};

export { validateSignupPage1, validateSignupPage2 };
