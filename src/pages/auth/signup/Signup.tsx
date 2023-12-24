import React, { useEffect, useState } from "react";
import RegularButton from "../../../components/button/RegularButton";
import FormProgressBar from "../../../components/form-progress-bar/FormProgressBar";
import {
  validateSignupPage1,
  validateSignupPage2,
} from "../../../utils/authutils";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";
import { SignupApiResponse } from "../../../api/apiModals";
import { doSignup } from "../../../api/auth";
import Loader from "../../../components/loader/Loader";
import Modal from "../../../components/modal/Modal";

import "../Auth.css";
import { LoaderSpeed } from "../../../components/loader/Loader.enums";
import { ModalIcon } from "../../../components/modal/Modal.enums";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup";
  }, []);

  const SIGNUP_FORM_STEP_TITLES = [
    "Personal Info",
    "Contact Details",
    "Verification",
  ];

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [businessDetails, setBusinessDetails] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleSignupButtonClick = async () => {
    Loader.showLoader({
      speed: LoaderSpeed.MEDIUM,
    });

    const signupApiResponse: SignupApiResponse = await doSignup({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      city,
      zipcode,
      country,
      businessDetails,
    });

    Loader.hideLoader();

    if (signupApiResponse.success) {
      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        title: "Congratulations🎉",
        message:
          "Signup successful. We have sent you a verification email. Please verify your email to continue.",
      });
    } else {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: signupApiResponse.message,
        message: signupApiResponse.errors,
      });
    }
  };

  const handlePreviousButtonClick = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleNextButtonClick = () => {
    if (currentStep === 1) {
      if (validateSignupPage1(lastName, email, password, confirmPassword)) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateSignupPage2(phoneNumber, city, zipcode, country)) {
        setCurrentStep(3);
      }
    }
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleBusinessDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusinessDetails(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <SignupPage1
            onFirstNameChange={handleFirstNameChange}
            onLastNameChange={handleLastNameChange}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              event.preventDefault();
              handleNextButtonClick();
            }}
          />
        );

      case 2:
        return (
          <SignupPage2
            onBusinessDetailsChange={handleBusinessDetailsChange}
            onPhoneNumberChange={handlePhoneNumberChange}
            onCityChange={handleCityChange}
            onZipcodeChange={handleZipcodeChange}
            onCountryChange={handleCountryChange}
            businessDetails={businessDetails}
            phoneNumber={phoneNumber}
            zipcode={zipcode}
            city={city}
            country={country}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              event.preventDefault();
              handleNextButtonClick();
            }}
          />
        );

      case 3:
        return (
          <SignupPage3
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phoneNumber}
            businessDetails={businessDetails}
            address={`${city} - ${zipcode}, ${country}`}
          />
        );

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className="signup__page">
        <div className="signup__form__container">
          <div className="signup__heading">Signup 🔗</div>

          <div className="signup__form">
            <FormProgressBar
              totalSteps={SIGNUP_FORM_STEP_TITLES.length}
              stepTitles={SIGNUP_FORM_STEP_TITLES}
              currentStep={currentStep}
            />
            {renderFormStep(currentStep)}
          </div>

          <div className="signup__form__btns__container">
            {currentStep !== 1 ? (
              <RegularButton
                content="Previous"
                className="signup__prev__btn"
                onClick={handlePreviousButtonClick}
              />
            ) : (
              <RegularButton
                content="Previous"
                className="signup__prev__btn"
                onClick={handlePreviousButtonClick}
                isHidden={true}
              />
            )}

            {currentStep !== SIGNUP_FORM_STEP_TITLES.length ? (
              <RegularButton
                content="Next"
                className="signup__next__btn"
                onClick={handleNextButtonClick}
              />
            ) : null}

            {currentStep === SIGNUP_FORM_STEP_TITLES.length ? (
              <RegularButton
                content="Signup"
                className="signup__signup__btn"
                onClick={handleSignupButtonClick}
              />
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
