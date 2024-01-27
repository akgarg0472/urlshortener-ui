// Auth API endpoints
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
export const DASHBOARD_GET_PROFILE_API_URL_V1 = "/api/v1/profile/$profileId";
export const DASHBOARD_UPDATE_PROFILE_API_URL_V1 = "/api/v1/profile/$profileId";
export const DASHBOARD_UPDATE_PASSWORD_API_URL_V1 =
  "/api/v1/profile/$profileId/password";
export const DASHBOARD_DELETE_PROFILE_API_URL_V1 = "/api/v1/profile/$profileId";

export const GET_TOP_POPULAR_URLS_V1 = "/api/v1/statistics/popular-urls";
export const GET_URL_GEOGRAPHICAL_DATA_V1 =
  "/api/v1/statistics/geographical-metrics";
export const GENERATE_SHORT_URL_API_URL_V1 = "/api/v1/urlshortener";
