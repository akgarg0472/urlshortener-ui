import React from "react";
import InputField from "../../../components/inputfield/InputField";

interface SignupPage1Props {
  onFirstNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage1 = (props: SignupPage1Props) => {
  return (
    <React.Fragment>
      <InputField
        className="signup__input__field"
        style={{
          marginTop: 0,
        }}
        placeholder="First Name"
        title="First Name"
        type={InputFieldType.TEXT}
        id="signup__first__name"
        onChange={props.onFirstNameChange}
        text={props.firstName}
        key="signup__first__name"
        onKeyDown={props.onKeyDown}
      />

      <InputField
        className="signup__input__field"
        placeholder="Last Name"
        title="Last Name"
        style={{
          marginTop: 0,
        }}
        type={InputFieldType.TEXT}
        id="signup__last__name"
        onChange={props.onLastNameChange}
        text={props.lastName}
        key="signup__last__name"
        isRequired={true}
        onKeyDown={props.onKeyDown}
      />

      <InputField
        className="signup__input__field__full"
        placeholder="Email"
        title="Email"
        type={InputFieldType.TEXT}
        id="signup__email"
        onChange={props.onEmailChange}
        text={props.email}
        key="signup__email"
        isRequired={true}
        onKeyDown={props.onKeyDown}
      />

      <InputField
        className="signup__input__field"
        placeholder="Password"
        title="Password"
        type={InputFieldType.PASSWORD}
        id="signup__password"
        onChange={props.onPasswordChange}
        text={props.password}
        key="signup__password"
        isRequired={true}
        onKeyDown={props.onKeyDown}
      />

      <InputField
        className="signup__input__field"
        placeholder="Confirm Password"
        title="Confirm Password"
        type={InputFieldType.PASSWORD}
        id="signup__confirm_password"
        onChange={props.onConfirmPasswordChange}
        text={props.confirmPassword}
        key="signup__confirm_password"
        isRequired={true}
        onKeyDown={props.onKeyDown}
      />
    </React.Fragment>
  );
};

export default SignupPage1;
