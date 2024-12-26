export interface DashboardApiStat {
  key: string;
  value: string;
  suffix: string;
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

export interface USURL {
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
  original_url: string;
}
