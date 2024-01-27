import Modal from "../components/modal/Modal";
import { ModalIcon } from "../components/modal/Modal.enums";
import { validatePasswordAndConfirmPassword } from "./authutils";

const validateString = (str: string | null | undefined): boolean => {
  if (!str) {
    return false;
  }

  return true;
};

const validateEmail = (email: string | null): boolean => {
  if (!email) {
    return false;
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
};

export const validateUpdateProfileRequest = (
  originalData: ProfileData,
  updateRequest: UpdateProfileRequest
): boolean => {
  return (
    updateRequest.profile_picture !== null ||
    updateRequest.name !== originalData.name ||
    updateRequest.bio !== originalData.bio ||
    updateRequest.phone !== originalData.phone ||
    updateRequest.city !== originalData.city ||
    updateRequest.state !== originalData.state ||
    updateRequest.country !== originalData.country ||
    updateRequest.zipcode !== originalData.zipcode ||
    updateRequest.business_details !== originalData.businessDetails
  );
};

const validChangePasswordReq = (pwdFields: any): boolean => {
  if (!validatePassword(pwdFields.currentPassword)) {
    Modal.showModal({
      icon: ModalIcon.ERROR,
      title: "Error",
      message: "Please provide valid current password",
    });
    return false;
  }

  return validatePasswordAndConfirmPassword(
    pwdFields.newPassword,
    pwdFields.confirmNewPassword
  );
};

export {
  validateEmail,
  validatePassword,
  validateString,
  validChangePasswordReq,
};
