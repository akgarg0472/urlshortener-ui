// Auth API endpoints
export const GET_OAUTH_PROVIDERS_URL_V1: string =
  "/api/v1/auth/oauth/providers";
export const OAUTH_CALLBACK_URL_V1: string = "/api/v1/auth/oauth/callbacks";
export const SIGNUP_API_URL_V1: string = "/api/v1/auth/signup";
export const LOGIN_API_URL_V1: string = "/api/v1/auth/login";
export const LOGOUT_API_URL_V1: string = "/api/v1/auth/logout";
export const FORGOT_PASSWORD_API_URL_V1 = "/api/v1/auth/forgot-password";
export const RESET_PASSWORD_API_URL_V1 = "/api/v1/auth/reset-password";

// Dashboard API endpoints
export const DASHBOARD_SUMMARY_API_URL_V1 =
  "/api/v1/statistics/dashboard-summary";
export const DASHBOARD_MY_LINKS_API_URL_V1 =
  "/api/v1/statistics/generated-urls";
export const DASHBOARD_URL_METRICS_API_URL_V1 =
  "/api/v1/statistics/url-metrics";
export const DASHBOARD_DEVICE_METRICS_API_URL_V1 =
  "/api/v1/statistics/device-metrics";
export const GET_TOP_POPULAR_URLS_V1 = "/api/v1/statistics/popular-urls";
export const GET_URL_GEOGRAPHICAL_DATA_V1 =
  "/api/v1/statistics/geographical-metrics";
export const GET_METRIC_USAGE_URL_V1 = "/api/v1/statistics/usage";
export const GENERATE_SHORT_URL_API_URL_V1 = "/api/v1/urlshortener";
export const DASHBOARD_GET_PROFILE_API_URL_V1 = "/api/v1/profiles/$profileId";
export const DASHBOARD_UPDATE_PROFILE_API_URL_V1 =
  "/api/v1/profiles/$profileId";
export const DASHBOARD_UPDATE_PASSWORD_API_URL_V1 =
  "/api/v1/profiles/$profileId/password";
export const DASHBOARD_DELETE_PROFILE_API_URL_V1 =
  "/api/v1/profiles/$profileId";
export const DASHBOARD_GET_ACTIVE_SUBSCRIPTION_API_URL_V1: string =
  "/api/v1/subscriptions/active";
export const DASHBOARD_GET_ALL_SUBSCRIPTION_API_URL_V1: string =
  "/api/v1/subscriptions";
export const GET_ALL_SUBSCRIPTION_PACKS_URL_V1: string =
  "/api/v1/subscriptions/packs";
export const CREATE_PAYMENT_ORDER_PAYPAL: string =
  "/api/v1/payments/paypal/order";
export const GET_PAYMENT_DETAIL_URL_v1: string = "/api/v1/payments/";
export const CANCEL_PAYMENT_ORDER_PAYPAL: string =
  "/api/v1/payments/paypal/cancel";
export const PAYMENT_HISTORY_URL_V1: string = "/api/v1/payments/history";
