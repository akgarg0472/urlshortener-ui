import React, { useEffect, useState } from "react";
import LinkButton from "../../../components/button/LinkButton";
import RegularButton from "../../../components/button/RegularButton";
import InputField, {
  InputFieldType,
} from "../../../components/inputfield/InputField";
import Loader, { LoaderSpeed } from "../../../components/loader/Loader";
import { validateForgotPasswordPage } from "../../../utils/authutils";
import "../Auth.css";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const [email, setEmail] = useState<string>("");

  const handleForgotPasswordButtonClick = () => {
    if (validateForgotPasswordPage(email)) {
      Loader.showLoader({
        speed: LoaderSpeed.MEDIUM,
      });

      const timeout = setTimeout(() => {
        Loader.hideLoader();
      }, 1000);
    }
  };

  return (
    <React.Fragment>
      <div className="forgot__password__page">
        <div className="forgot__password__form__container">
          <div className="forgot__password__heading">Forgot Password🔗</div>

          <div className="forgot__password__instruction">
            Enter the email associated with your account and we'll send you a
            link to reset your password
          </div>

          <form className="forgot__password__form">
            <InputField
              className="forgot__password__input__field__full"
              placeholder="Email"
              title="Email"
              type={InputFieldType.EMAIL}
              id="forgot__password__email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              text={email}
              key="forgot__password__email"
              isRequired={true}
              onKeyDown={() => {
                //
              }}
            />

            <div className="forgot__password__form__btns__container">
              <RegularButton
                text="Reset Password"
                className="forgot__password__btn"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  handleForgotPasswordButtonClick();
                }}
                loadable={true}
                type="submit"
              />
            </div>
          </form>

          <div className="login__links__container">
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

export default ForgotPassword;
