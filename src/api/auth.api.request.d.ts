interface SignupApiRequestProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  city: string;
  zipcode: string;
  country: string;
  businessDetails: string;
}

interface LoginApiRequestProps {
  email: string;
  password: string;
}

interface LogoutApiRequestProps {
  authToken: string;
  userId: string;
}

interface ForgotPasswordRequestProps {
  email: string;
}

interface ResetPasswordRequestProps {
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
}
