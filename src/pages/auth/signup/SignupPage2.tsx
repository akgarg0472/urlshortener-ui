import React from "react";
import DropdownSelector from "../../../components/dropdownselector/DropdownSelector";
import InputField, {
  InputFieldType,
} from "../../../components/inputfield/InputField";
import { signupCountryDropdown } from "../../../utils/dropdownutils";

interface SignupPage2Props {
  onBusinessDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onZipcodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  businessDetails: string;
  phoneNumber: string;
  zipcode: string;
  city: string;
  country: string;
}

const SignupPage2 = (props: SignupPage2Props) => {
  return (
    <React.Fragment>
      <InputField
        className="signup__input__field__full"
        style={{
          marginTop: 0,
        }}
        placeholder="Enter Business Details"
        title="Business Details"
        type={InputFieldType.TEXT}
        id="signup__business__details"
        onChange={props.onBusinessDetailsChange}
        text={props.businessDetails}
        key="signup__business__details"
        onKeyDown={props.onKeyDown}
      />

      <InputField
        className="signup__input__field"
        placeholder="Phone Number"
        title="Enter Phone Number"
        type={InputFieldType.TEXT}
        id="signup__phone__number"
        onChange={props.onPhoneNumberChange}
        text={props.phoneNumber}
        key="signup__phone__number"
        isRequired={true}
        onKeyDown={props.onKeyDown}
      />

      <InputField
        className="signup__input__field"
        placeholder="Enter City"
        title="City"
        type={InputFieldType.TEXT}
        id="signup__city"
        onChange={props.onCityChange}
        text={props.city}
        key="signup__city"
        isRequired={true}
        onKeyDown={props.onKeyDown}
      />

      <InputField
        className="signup__input__field"
        placeholder="Enter Zip/Postal Code"
        title="Zip/Postal Code"
        type={InputFieldType.TEXT}
        id="signup__zipcode"
        onChange={props.onZipcodeChange}
        text={props.zipcode}
        key="signup__zipcode"
        isRequired={true}
        onKeyDown={props.onKeyDown}
      />

      <DropdownSelector
        classes="signup__input__field"
        id="signup__country"
        onChange={props.onCountryChange}
        key="signup__country"
        title="Country"
        value={props.country}
        isRequired={true}
        dropdownValues={signupCountryDropdown}
      />
    </React.Fragment>
  );
};

export default SignupPage2;
