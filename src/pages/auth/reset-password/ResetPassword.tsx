import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ResetPasswordApiResponse } from "../../../api/apiModals";
import RegularButton from "../../../components/button/RegularButton";
import InputField from "../../../components/inputfield/InputField";
import { InputFieldType } from "../../../components/inputfield/InputField.enums";
import Loader from "../../../components/loader/Loader";
import { LoaderSpeed } from "../../../components/loader/Loader.enums";
import Modal from "../../../components/modal/Modal";
import { ModalIcon } from "../../../components/modal/Modal.enums";
import useAuth from "../../../hooks/useAuth";
import { validateResetPasswordPage } from "../../../utils/authutils";
import { doResetPassword } from "../../../api/auth";

import "../Auth.css";
import { validateEmail, validateString } from "../../../utils/validationutils";
import { LOGIN_URL } from "../../../constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();

  const [resetPasswordObject, setResetPasswordObject] =
    useState<ResetPasswordRequestProps>({
      password: "",
      confirmPassword: "",
      email: "",
      token: "",
    });

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/dashboard", {
        replace: true,
      });
    }

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    setResetPasswordObject((prev) => {
      return {
        ...prev,
        email: email!,
        token: token!,
      };
    });

    document.title = "Reset Password";
  }, []);

  const handleResetPasswordButtonClick = async () => {
    if (
      !validateString(resetPasswordObject.token) ||
      !validateEmail(resetPasswordObject.email)
    ) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: "Invalid Reset Password Params",
      });
      return;
    }

    if (
      validateResetPasswordPage(
        resetPasswordObject.password,
        resetPasswordObject.confirmPassword
      )
    ) {
      Loader.showLoader({
        speed: LoaderSpeed.MEDIUM,
      });

      const resetPasswordApiResponse: ResetPasswordApiResponse =
        await doResetPassword(resetPasswordObject);

      Loader.hideLoader();

      if (!resetPasswordApiResponse.success) {
        Modal.showModal({
          icon: ModalIcon.ERROR,
          title: `Error ${resetPasswordApiResponse.httpCode}`,
          message: resetPasswordApiResponse.message,
        });

        return;
      }

      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        message: resetPasswordApiResponse.message,
        onClose: () => {
          navigate(LOGIN_URL, { replace: true });
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div className="reset__password__page">
        <div className="reset__password__form__container">
          <div className="reset__password__heading">
            Please enter new Passwords to continue
          </div>

          <form className="reset__password__form">
            <InputField
              className="reset__password__input__field__full"
              placeholder="Password"
              title="Password"
              type={InputFieldType.PASSWORD}
              id="reset__password__password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setResetPasswordObject((prev) => {
                  return {
                    ...prev,
                    password: e.target.value,
                  };
                });
              }}
              text={resetPasswordObject.password}
              key="reset__password__password"
              isRequired={true}
              onKeyDown={() => {
                //
              }}
            />

            <InputField
              className="reset__password__input__field__full"
              placeholder="Confirm Password"
              title="Confirm Password"
              type={InputFieldType.PASSWORD}
              id="reset__password__confirmPassword"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setResetPasswordObject((prev) => {
                  return {
                    ...prev,
                    confirmPassword: e.target.value,
                  };
                });
              }}
              text={resetPasswordObject.confirmPassword}
              key="reset__password__confirmPassword"
              isRequired={true}
              onKeyDown={() => {
                //
              }}
            />

            <div className="reset__password__form__btns__container">
              <RegularButton
                content="Change Password"
                className="reset__password__reset__btn"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  handleResetPasswordButtonClick();
                }}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
