import Modal from "../components/modal/Modal";
import { ModalIcon } from "../components/modal/Modal.enums";
import { validateEmail, validatePassword } from "./validationutils";

const validateLoginPage = (email: string, password: string): boolean => {
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

  return true;
};

const validateForgotPasswordPage = (email: string): boolean => {
  if (!validateEmail(email)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid email",
    });
    return false;
  }

  return true;
};

const validateResetPasswordPage = (
  password: string,
  confirmPassword: string
): boolean => {
  return validatePasswordAndConfirmPassword(password, confirmPassword);
};

const validatePasswordAndConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
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

export {
  validateForgotPasswordPage,
  validateLoginPage,
  validateResetPasswordPage,
  validatePasswordAndConfirmPassword,
};
