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

interface SignupPage3Props {
  firstName: string;
  lastName: string;
  email: string;
  businessDetails: string;
  phoneNumber: string;
  address: string;
}
