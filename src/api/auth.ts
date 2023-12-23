import axios, { AxiosError } from "axios";
import { LoginApiResponse, LogoutApiResponse } from "./apiModals";
import { LOGIN_API_URL_V1, LOGOUT_API_URL_V1 } from "../utils/constants";
import { useId } from "react";

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
      message: "Login Failed",
    };
  }
};

export { doLogin, doLogout };
