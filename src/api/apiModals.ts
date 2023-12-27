export interface ApiResponse {
  httpCode: number;
  message?: string;
}

export interface DashboardApiStat {
  key: string;
  value: string;
  icon: string;
}

export interface Continent {
  name: string;
  hits_count: number;
  countries?: Country[];
}

export interface Country {
  name: string;
  hits_count: number;
  cities?: City[];
}

export interface City {
  name: string;
  hits_count: number;
}

export interface PrevSevenDaysHit {
  timestamp: number;
  hits: number;
}

export interface URL {
  original_url: string;
  short_url: string;
  created_at: string;
  ip_address: string;
}

export interface LatestHit {
  ip: string;
  device_info: {
    browser: string;
    os: string;
  };
  redirect_duration: number;
  timestamp: number;
  location: {
    country: string;
    timezone: string;
  };
}

export interface OSBrowser {
  os_name: string;
  hits_count: number;
  browsers: Browser[];
}

export interface Browser {
  name: string;
  hits_count: number;
}

export interface OS {
  name: string;
  hits_count: number;
}

export interface PopularURL {
  short_url: string;
  hits_count: number;
}

export enum PaymentStatus {
  SUCCESS = "success",
  FAILED = "failed",
  PENDING = "pending",
  PROCESSING = "processing",
  CONFIRMATION_REQUIRED = "confirmation_required",
}

export interface DashboardApiResponse extends ApiResponse {
  lifetime_stats: DashboardApiStat[];
  current_day_stats: DashboardApiStat[];
  continents: Continent[];
  countries: Country[];
  prev_seven_days_hits: PrevSevenDaysHit[];
  success: boolean;
}

export interface MyLinksApiResponse extends ApiResponse {
  total_records: number;
  next_offset: number;
  urls: URL[];
}

export interface UrlMetricApiResponse extends ApiResponse {
  total_hits: number;
  avg_redirect_duration: number;
  latest_hits: LatestHit[];
}

export interface GeographicalApiResponse extends ApiResponse {
  countries: Country[];
  continents: Continent[];
}

export interface DeviceMetricsApiResponse extends ApiResponse {
  os_browsers: OSBrowser[];
  browsers: Browser[];
  oss: OS[];
}

export interface PopularURLApiResponse extends ApiResponse {
  popular_urls: PopularURL[];
}

export interface StripeMakePaymentResponse extends ApiResponse {
  payment_client_secret: string;
}

export interface VerifyPaymentResponse extends ApiResponse {
  message: string;
  payment_status: PaymentStatus;
}

export interface LoginApiResponse extends ApiResponse {
  success: boolean;
  message: string;
  token?: string;
  userId?: string;
  name?: string;
  errors?: string;
}

export interface SignupApiResponse extends ApiResponse {
  success: boolean;
  errors?: string;
}

export interface LogoutApiResponse extends ApiResponse {
  message: string;
  success: boolean;
  errors?: string;
}

export interface ForgotPasswordApiResponse extends ApiResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordApiResponse extends ApiResponse {
  success: boolean;
  message: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  httpCode: number;
}
