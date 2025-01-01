import {
  FORGOT_PASSWORD_API_URL_V1,
  GET_OAUTH_PROVIDERS_URL_V1,
  LOGIN_API_URL_V1,
  LOGOUT_API_URL_V1,
  OAUTH_CALLBACK_URL_V1,
  RESET_PASSWORD_API_URL_V1,
  SIGNUP_API_URL_V1,
} from "../../api.endpoint.constants";
import { getEnv } from "../../utils/envutils";
import {
  axiosNwErrorResponse,
  errorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import { axiosInstance } from "../base";
import {
  ForgotPasswordApiResponse,
  LoginApiResponse,
  LogoutApiResponse,
  OAuthCallbackResponse,
  OAuthProviderResponse,
  ResetPasswordApiResponse,
  SignupApiResponse,
} from "./auth.api.response";

const doGetOAuthProvider = async (
  props: GetOAuthProviderRequestProps
): Promise<OAuthProviderResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    GET_OAUTH_PROVIDERS_URL_V1;

  try {
    const provider: string | undefined = props.provider;
    const queryParams: Record<string, string> = {};

    if (provider) {
      queryParams.provider = provider;
    }

    const response = await axiosInstance.get(url, {
      params: queryParams,
    });

    return {
      httpCode: response.status,
      success: response.data.success,
      clients: response.data.clients,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    return {
      httpCode: 500,
      success: false,
      message: "Failed to fetch OAuth information. Please try again later",
    };
  }
};

const doOAuthCallback = async (
  props: OAuthCallbackRequest
): Promise<OAuthCallbackResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    OAUTH_CALLBACK_URL_V1;

  const requestBody = {
    auth_code: props.authCode,
    provider: props.provider,
    state: props.state,
    scope: props.scope,
  };

  try {
    const callbackResponse = await axiosInstance.post(url, requestBody);

    return {
      httpCode: callbackResponse.status,
      success: callbackResponse.data.success,
      user_id: callbackResponse.data.user_id,
      auth_token: callbackResponse.data.auth_token,
      email: callbackResponse.data.email,
      name: callbackResponse.data.name,
      is_new_user: callbackResponse.data.is_new_user,
      message: callbackResponse.data.Message,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    return {
      httpCode: err?.response?.status ?? 500,
      success: false,
      message:
        err.response?.data?.message ??
        "Failed to Login using OAuth. Please try again later",
    };
  }
};

const doSignup = async (
  props: SignupApiRequestProps
): Promise<SignupApiResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    SIGNUP_API_URL_V1;

  const requestBody = {
    name: props.name.trim(),
    email: props.email.trim(),
    password: props.password.trim(),
    confirm_password: props.confirmPassword.trim(),
  };

  try {
    const signupApiResponse = await axiosInstance.post(url, requestBody);

    return {
      httpCode: signupApiResponse.status,
      message: signupApiResponse.data.message,
      success: signupApiResponse.status === 201,
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
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    LOGIN_API_URL_V1;

  const requestBody = {
    email: props.email,
    password: props.password,
  };

  try {
    const loginApiResponse = await axiosInstance.post(url, requestBody);

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
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    LOGOUT_API_URL_V1;

  const requestBody = {
    auth_token: props.authToken,
    user_id: props.userId,
  };

  try {
    const logoutApiResponse = await axiosInstance.post(url, requestBody);

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
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    FORGOT_PASSWORD_API_URL_V1;

  const requestBody = {
    email: props.email,
  };

  try {
    const forgotPasswordApiResponse = await axiosInstance.post(
      url,
      requestBody
    );

    return {
      httpCode: forgotPasswordApiResponse.status,
      message: forgotPasswordApiResponse.data.message,
      success: forgotPasswordApiResponse.data.status_code === 200,
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
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765") +
    RESET_PASSWORD_API_URL_V1;

  const requestBody = {
    email: props.email,
    token: props.token,
    password: props.password,
    confirm_password: props.confirmPassword,
  };

  try {
    const resetPasswordApiResponse = await axiosInstance.post(url, requestBody);

    return {
      httpCode: resetPasswordApiResponse.status,
      message: resetPasswordApiResponse.data.message,
      success: resetPasswordApiResponse.status === 200,
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

export {
  doForgotPassword,
  doGetOAuthProvider,
  doLogin,
  doLogout,
  doOAuthCallback,
  doResetPassword,
  doSignup,
};
