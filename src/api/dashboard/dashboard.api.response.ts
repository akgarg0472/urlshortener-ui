import { ApiResponse } from "../base";
import {
  Browser,
  Continent,
  Country,
  DashboardApiStat,
  LatestHit,
  OS,
  OSBrowser,
  PopularURL,
  PrevSevenDaysHit,
  USURL,
} from "./dashboard.api.modal";

export interface GenerateUrlResponse extends ApiResponse {
  short_url?: string;
  original_url?: string;
}

export interface DashboardApiResponse extends ApiResponse {
  lifetime_stats: DashboardApiStat[];
  current_day_stats: DashboardApiStat[];
  prev_day_stats: DashboardApiStat[];
  prev_seven_days_hits: PrevSevenDaysHit[];
  success: boolean;
}

export interface MyLinksApiResponse extends ApiResponse {
  total_records: number;
  next_offset: number;
  urls: USURL[];
}

export interface UrlMetricApiResponse extends ApiResponse {
  total_hits: number;
  avg_redirect_duration: number;
  latest_hits: LatestHit[];
  errors?: any;
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

export interface DashboardStatisticsApiResponse extends ApiResponse {
  popularUrls?: PopularURLApiResponse;
  geographicalStats?: GeographicalApiResponse;
  deviceMetrics?: DeviceMetricsApiResponse;
}

export type CustomAliasUsageResponse = {
  httpCode: number;
  message?: string;
  success: boolean;
  errors?: any;
  key?: string;
  value?: number;
};
