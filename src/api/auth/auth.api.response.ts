import { ApiResponse } from "../base";

export interface LoginApiResponse extends ApiResponse {
  message: string;
  token?: string;
  userId?: string;
  name?: string;
  errors?: string;
}

export interface SignupApiResponse extends ApiResponse {
  errors?: string;
}

export interface ForgotPasswordApiResponse extends ApiResponse {
  message: string;
}

export interface ResetPasswordApiResponse extends ApiResponse {
  message: string;
}

export interface LogoutApiResponse extends ApiResponse {
  message: string;
  errors?: string;
}
