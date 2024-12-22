interface DashboardSummaryApiRequest {
  userId: string;
  startTime: number;
  endTime: number;
  authToken?: string;
}

interface TopPopularUrlRequest {
  userId: string;
  sortOrder: "desc" | "asc";
  limit: number;
  endTime: number;
  startTime: number;
  authToken: string;
}

interface UrlGeographicalRequest {
  userId: string;
  startTime: number;
  endTime: number;
  authToken: string;
}

interface DeviceMetricsApiRequest {
  userId: string;
  startTime: number;
  endTime: number;
  authToken: string;
}

interface DashboardStatisticsRequest {
  geographicalParams: UrlGeographicalRequest;
  popularUrlParam: TopPopularUrlRequest;
  deviceMetricsParam: DeviceMetricsApiRequest;
}

interface UpdateProfileRequest {
  profile_picture?: File;
  name?: string;
  bio?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  business_details?: string;
}
