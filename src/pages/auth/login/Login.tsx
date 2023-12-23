import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApiResponse } from "../../../api/apiModals";
import { doLogin } from "../../../api/auth";
import LinkButton from "../../../components/button/LinkButton";
import RegularButton from "../../../components/button/RegularButton";
import InputField from "../../../components/inputfield/InputField";
import Loader from "../../../components/loader/Loader";
import Modal from "../../../components/modal/Modal";
import useAuth from "../../../hooks/useAuth";
import { validateLoginPage } from "../../../utils/authutils";

import "../Auth.css";

const Login = () => {
  const navigation = useNavigate();
  const { setAuth, getAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    document.title = "Login";

    if (getAuthenticated()) {
      navigation("/dashboard", {
        replace: true,
      });
    }
  }, []);

  const handleLoginButtonClick = async () => {
    if (validateLoginPage(email, password)) {
      Loader.showLoader({
        speed: LoaderSpeed.MEDIUM,
      });

      const loginResponse: LoginApiResponse = await doLogin(email, password);

      Loader.hideLoader();

      if (!loginResponse.success) {
        Modal.showModal({
          icon: ModalIcon.ERROR,
          title: `Error ${loginResponse.httpCode}`,
          message: loginResponse.message,
        });

        return;
      }

      const isAuthCompleted = setAuth(
        loginResponse.token!,
        loginResponse.userId!,
        email,
        loginResponse.name!
      );

      if (isAuthCompleted) {
        navigation("/dashboard", {
          replace: true,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="login__page">
        <div className="login__form__container">
          <div className="login__form__heading">Welcome Back</div>
          <div className="login__heading">Login to continue</div>

          <form className="login__form">
            <InputField
              className="login__input__field__full"
              placeholder="Email"
              title="Email"
              type={InputFieldType.EMAIL}
              id="login__email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              text={email}
              key="login__email"
              isRequired={true}
              onKeyDown={() => {
                //
              }}
            />

            <InputField
              className="login__input__field__full"
              placeholder="Password"
              title="Password"
              type={InputFieldType.PASSWORD}
              id="login__password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              text={password}
              key="login__password"
              isRequired={true}
              onKeyDown={() => {
                //
              }}
            />

            <div className="login__form__btns__container">
              <RegularButton
                content="Login"
                className="login__login__btn"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  handleLoginButtonClick();
                }}
                type="submit"
              />
            </div>
          </form>

          <div className="login__links__container">
            <LinkButton
              text="Forgot Password?"
              onClickLink="/forgot-password"
              className="forgot__password__link"
              referrerPolicy="no-referrer"
            />
            <br />

            <div className="signup__link__container">
              <span className="heading">Doesn't have account? </span>
              <LinkButton
                text="Signup"
                onClickLink="/signup"
                className="signup__link"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
