import { ApiResponse } from "../base";

export interface LoginApiResponse extends ApiResponse {
  message: string;
  userId?: string;
  name?: string;
  login_type?: string;
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

export interface OAuthClient {
  provider: string;
  client_id: string;
  base_url: string;
  redirect_uri: string;
  access_type: string;
  scope: string;
}

export interface OAuthProviderResponse extends ApiResponse {
  clients?: OAuthClient[];
}

export interface OAuthCallbackResponse extends ApiResponse {
  user_id?: string;
  email?: string;
  name?: string;
  is_new_user?: boolean;
  message?: string;
  login_type?: string;
}
