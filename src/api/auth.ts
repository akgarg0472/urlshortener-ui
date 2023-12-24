import axios, { AxiosError } from "axios";
import {
  ForgotPasswordApiResponse,
  LoginApiResponse,
  LogoutApiResponse,
  ResetPasswordApiResponse,
  SignupApiResponse,
} from "./apiModals";
import {
  FORGOT_PASSWORD_API_URL_V1,
  LOGIN_API_URL_V1,
  LOGOUT_API_URL_V1,
  RESET_PASSWORD_API_URL_V1,
  RESET_PASSWORD_URL,
  SIGNUP_API_URL_V1,
} from "../constants";

const doSignup = async (
  props: SignupApiRequestProps
): Promise<SignupApiResponse> => {
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
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

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
  props: LoginApiRequestProps
): Promise<LoginApiResponse> => {
  const url = process.env.REACT_APP_BACKEND_BASE_URL + LOGIN_API_URL_V1;

  const requestBody = {
    email: props.email,
    password: props.password,
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
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      return errorResponse(err);
    }

    return {
      success: false,
      httpCode: 500,
      message: "Login Failed",
    };
  }
};

const doLogout = async (
  props: LogoutApiRequestProps
): Promise<LogoutApiResponse> => {
  const url = process.env.REACT_APP_BACKEND_BASE_URL + LOGOUT_API_URL_V1;

  const requestBody = {
    auth_token: props.authToken,
    user_id: props.userId,
  };

  try {
    const logoutApiResponse = await axios.post(url, requestBody);

    return {
      httpCode: 200,
      message: "Logout Successful",
      success: logoutApiResponse.data.message === "Logout successful",
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      return errorResponse(err);
    }

    return {
      success: false,
      httpCode: 500,
      message: "Logout Failed",
    };
  }
};

const doForgotPassword = async (
  props: ForgotPasswordRequestProps
): Promise<ForgotPasswordApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + FORGOT_PASSWORD_API_URL_V1;

  const requestBody = {
    email: props.email,
  };

  try {
    const ForgotPasswordApiResponse = await axios.post(url, requestBody);

    return {
      httpCode: 200,
      message: "",
      success: ForgotPasswordApiResponse.data.message,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      return errorResponse(err);
    }

    return {
      success: false,
      httpCode: 500,
      message: "Forgot Password Failed",
    };
  }
};

const doResetPassword = async (
  props: ResetPasswordRequestProps
): Promise<ResetPasswordApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + RESET_PASSWORD_API_URL_V1;

  const requestBody = {
    email: props.email,
    token: props.token,
    password: props.password,
    confirm_password: props.confirmPassword,
  };

  try {
    const resetPasswordApiResponse = await axios.post(url, requestBody);

    return {
      httpCode: resetPasswordApiResponse.status,
      message: resetPasswordApiResponse.data.message,
      success: resetPasswordApiResponse.status == 200,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      return errorResponse(err);
    }

    return {
      success: false,
      httpCode: 500,
      message: "Reset Password Failed",
    };
  }
};

const errorResponse = (err: any) => {
  const response = err.response.data;

  return {
    success: false,
    message: response.message || response.error_message,
    httpCode: response.error_code || response.status_code,
  };
};

const isAxiosNetworkError = (err: Error): boolean => {
  return axios.isAxiosError(err) && err.code === "ERR_NETWORK" && !err.response;
};

const axiosNwErrorResponse = () => {
  return {
    success: false,
    message: "Service temporarily unavailable",
    httpCode: 503,
  };
};

export { doSignup, doLogin, doLogout, doForgotPassword, doResetPassword };
