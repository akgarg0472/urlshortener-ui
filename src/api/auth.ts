import axios, { AxiosError } from "axios";
import {
  LoginApiResponse,
  LogoutApiResponse,
  SignupApiResponse,
} from "./apiModals";
import {
  LOGIN_API_URL_V1,
  LOGOUT_API_URL_V1,
  SIGNUP_API_URL_V1,
} from "../utils/constants";

const doSignup = async (props: {
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
}): Promise<SignupApiResponse> => {
  const url = process.env.REACT_APP_BACKEND_BASE_URL + SIGNUP_API_URL_V1;

  const requestBody = {
    first_name: props.firstName,
    last_name: props.lastName,
    email: props.email,
    password: props.password,
    confirm_password: props.confirmPassword,
    phone_number: props.phoneNumber,
    city: props.city,
    zipcode: props.zipcode,
    country: props.country,
    business_details: props.businessDetails,
  };

  try {
    const signupApiResponse = await axios.post(url, requestBody);

    return {
      httpCode: signupApiResponse.status,
      message: signupApiResponse.data.message,
      success: signupApiResponse.status == 201,
    };
  } catch (err: any) {
    if (err.response && err.response.data) {
      const response = err.response.data;

      if (err.response.status === 409) {
        return {
          success: false,
          // message: "",
          errors: response.message || response.error_message,
          httpCode: response.error_code || response.status_code,
        };
      }

      let errors = "Signup request failed";

      if (err.response.status === 400) {
        errors = `Params ${Object.keys(response.errors).join(
          ", "
        )} are missing`;
      }

      return {
        success: false,
        message: response.message || response.error_message,
        httpCode: response.error_code || response.status_code,
        errors,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Signup Failed",
    };
  }
};

const doLogin = async (
  email: string,
  password: string
): Promise<LoginApiResponse> => {
  const url = process.env.REACT_APP_BACKEND_BASE_URL + LOGIN_API_URL_V1;

  const requestBody = {
    email,
    password,
  };

  try {
    const loginApiResponse = await axios.post(url, requestBody);

    return {
      httpCode: 200,
      message: "Login Successful",
      success: true,
      token: loginApiResponse.data.auth_token,
      userId: loginApiResponse.data.user_id,
    };
  } catch (err: any) {
    if (err.response && err.response.data) {
      const response = err.response.data;

      return {
        success: false,
        message: response.message || response.error_message,
        httpCode: response.error_code || response.status_code,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Login Failed",
    };
  }
};

const doLogout = async (
  authToken: string,
  userId: string
): Promise<LogoutApiResponse> => {
  const url = process.env.REACT_APP_BACKEND_BASE_URL + LOGOUT_API_URL_V1;

  const requestBody = {
    auth_token: authToken,
    user_id: userId,
  };

  try {
    const logoutApiResponse = await axios.post(url, requestBody);

    return {
      httpCode: 200,
      message: "Logout Successful",
      success: logoutApiResponse.data.message === "Logout successful",
    };
  } catch (err: any) {
    if (err.response && err.response.data) {
      const response = err.response.data;

      return {
        success: false,
        message: response.message || response.error_message,
        httpCode: response.error_code || response.status_code,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Logout Failed",
    };
  }
};

export { doSignup, doLogin, doLogout };
