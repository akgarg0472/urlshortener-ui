interface SignupApiRequestProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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

interface GetOAuthProviderRequestProps {
  provider?: string;
}

interface OAuthCallbackRequest {
  state: string;
  authCode: string;
  scope: string;
  provider: string;
}
