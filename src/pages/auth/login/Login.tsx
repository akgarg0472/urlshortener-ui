import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../../components/button/LinkButton";
import RegularButton from "../../../components/button/RegularButton";
import InputField, {
  InputFieldType,
} from "../../../components/inputfield/InputField";
import Loader, { LoaderSpeed } from "../../../components/loader/Loader";
import { validateLoginPage } from "../../../utils/authutils";
import "../Auth.css";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const navigation = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginButtonClick = () => {
    if (validateLoginPage(email, password)) {
      Loader.showLoader({
        speed: LoaderSpeed.MEDIUM,
      });

      const timeout = setTimeout(() => {
        Loader.hideLoader();
        navigation("/dashboard", {
          replace: true,
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  };

  return (
    <React.Fragment>
      <div className="login__page">
        <div className="login__form__container">
          <div className="login__form__heading">Welcome Back</div>
          <div className="login__heading">Login to URLShortener🔗</div>

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
                text="Login"
                className="login__login__btn"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  handleLoginButtonClick();
                }}
                loadable={true}
                type="submit"
              />
            </div>
          </form>

          <div className="login__links__container">
            <LinkButton
              text="Forgot Password?"
              onClickLink="/forgot-password"
              className="forgot__password__link"
            />
            <br />

            <div className="signup__link__container">
              <span className="heading">Doesn't have account? </span>
              <LinkButton
                text="Signup"
                onClickLink="/signup"
                className="signup__link"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
