import React, { useEffect, useState } from "react";
import RegularButton from "../../../components/button/RegularButton";
import { doSignup } from "../../../api/auth/auth";
import Loader from "../../../components/loader/Loader";
import Modal from "../../../components/modal/Modal";
import { LoaderSpeed } from "../../../components/loader/Loader.enums";
import { ModalIcon } from "../../../components/modal/Modal.enums";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../../constants";
import InputField from "../../../components/inputfield/InputField";
import { InputFieldType } from "../../../components/inputfield/InputField.enums";
import { SignupApiResponse } from "../../../api/auth/auth.api.response";

import "../Auth.css";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup";
  }, []);

  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignupButtonClick = async () => {
    Loader.showLoader({
      speed: LoaderSpeed.MEDIUM,
    });

    const signupApiResponse: SignupApiResponse = await doSignup({
      name,
      email,
      password,
      confirmPassword,
    });

    Loader.hideLoader();

    if (signupApiResponse.success) {
      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        title: "Congratulations🎉",
        message: signupApiResponse.message,
        onClose() {
          navigate(LOGIN_URL, { replace: true });
        },
      });
    } else {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: signupApiResponse.message,
        message: signupApiResponse.errors,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="signup__page">
        <div className="signup__form__container">
          <div className="signup__heading">Signup 🔗</div>

          <div className="signup__form">
            <React.Fragment>
              <InputField
                className="signup__input__field__full"
                placeholder="Name"
                title="Name"
                style={{
                  marginTop: "4rem",
                }}
                type={InputFieldType.TEXT}
                id="signup__name"
                onChange={(e) => setName(e.target.value)}
                text={name}
                key="signup__name"
                isRequired={true}
              />

              <InputField
                className="signup__input__field__full"
                placeholder="Email"
                title="Email"
                type={InputFieldType.TEXT}
                id="signup__email"
                onChange={(e) => setEmail(e.target.value)}
                text={email}
                key="signup__email"
                isRequired={true}
              />

              <InputField
                className="signup__input__field__full"
                placeholder="Password"
                title="Password"
                type={InputFieldType.PASSWORD}
                id="signup__password"
                onChange={(e) => setPassword(e.target.value)}
                text={password}
                key="signup__password"
                isRequired={true}
              />

              <InputField
                className="signup__input__field__full"
                placeholder="Confirm Password"
                title="Confirm Password"
                type={InputFieldType.PASSWORD}
                id="signup__confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                text={confirmPassword}
                key="signup__confirm_password"
                isRequired={true}
              />
            </React.Fragment>
          </div>

          <div className="signup__form__btns__container">
            <RegularButton
              content="Signup"
              className="signup__signup__btn"
              onClick={handleSignupButtonClick}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
