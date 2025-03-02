interface DashboardSummaryApiRequest {
  userId: string;
  startTime: number;
  endTime: number;
}

interface TopPopularUrlRequest {
  userId: string;
  sortOrder: "desc" | "asc";
  limit: number;
  endTime: number;
  startTime: number;
}

interface UrlGeographicalRequest {
  userId: string;
  startTime: number;
  endTime: number;
}

interface DeviceMetricsApiRequest {
  userId: string;
  startTime: number;
  endTime: number;
}

interface DashboardStatisticsRequest {
  popularUrlParam: TopPopularUrlRequest;
  geographicalParams: UrlGeographicalRequest | null;
  deviceMetricsParam?: DeviceMetricsApiRequest | null;
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

interface MetricUsageRequest {
  userId: string;
  metricName: string;
  startTime: number;
  endTime: number;
}
