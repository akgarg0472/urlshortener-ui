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

export interface DashboardApiResponse extends ApiResponse {
  lifetime_stats: DashboardApiStat[];
  current_day_stats: DashboardApiStat[];
  continents: Continent[];
  countries: Country[];
  prev_seven_days_hits: PrevSevenDaysHit[];
}
