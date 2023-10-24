export interface ApiResponse {
  httpCode: number;
}

export interface DashboardApiStat {
  key: string;
  value: string;
  icon: string;
}

export interface Continent {
  name: string;
  hits_count: number;
}

export interface Country {
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

export interface DashboardApiResponse extends ApiResponse {
  lifetime_stats: DashboardApiStat[];
  current_day_stats: DashboardApiStat[];
  continents: Continent[];
  countries: Country[];
  prev_seven_days_hits: PrevSevenDaysHit[];
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
