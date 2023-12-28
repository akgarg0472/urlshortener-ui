import axios from "axios";
import {
  ApiErrorResponse,
  DashboardApiResponse,
  DeviceMetricsApiResponse,
  GeographicalApiResponse,
  MyLinksApiResponse,
  PopularURLApiResponse,
  UrlMetricApiResponse,
} from "./apiModals";
import {
  DASHBOARD_MY_LINKS_API_URL_V1,
  DASHBOARD_SUMMARY_API_URL_V1,
  DASHBOARD_URL_METRICS_API_URL_V1,
} from "../api.endpoint.constants";
import {
  getCurrentDayStartTimeInMs,
  getOneWeekOldTimeInMsFromCurrentDate,
} from "../utils/datetimeutils";
import {
  axiosNwErrorResponse,
  errorResponse,
  isAxiosNetworkError,
} from "../utils/errorutils";

export const getDashboard = async (
  props: DashboardSummaryApiRequest
): Promise<DashboardApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + DASHBOARD_SUMMARY_API_URL_V1;

  try {
    const dashboardSummaryApiResponse = await axios.get(url, {
      params: {
        userId: props.userId,
        endTime: props.endTime,
        startTime: props.startTime,
        currentDayStartTime: getCurrentDayStartTimeInMs(),
        currentTime: new Date().getTime(),
        oneWeekOldTime: getOneWeekOldTimeInMsFromCurrentDate(),
      },
    });

    return {
      httpCode: dashboardSummaryApiResponse.status,
      continents: dashboardSummaryApiResponse.data.continents,
      countries: dashboardSummaryApiResponse.data.countries,
      current_day_stats: dashboardSummaryApiResponse.data.current_day_stats,
      lifetime_stats: dashboardSummaryApiResponse.data.lifetime_stats,
      prev_seven_days_hits:
        dashboardSummaryApiResponse.data.prev_seven_days_hits,
      success: dashboardSummaryApiResponse.data.status_code === 200,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      const axiosNetworkErrorResponse: ApiErrorResponse =
        axiosNwErrorResponse();

      return {
        success: axiosNetworkErrorResponse.success,
        httpCode: axiosNetworkErrorResponse.httpCode,
        message: axiosNetworkErrorResponse.message,
        continents: [],
        countries: [],
        current_day_stats: [],
        lifetime_stats: [],
        prev_seven_days_hits: [],
      };
    }

    if (err.response && err.response.data) {
      const errResp = errorResponse(err);

      return {
        success: errResp.success,
        httpCode: errResp.httpCode,
        message: errResp.message,
        continents: [],
        countries: [],
        current_day_stats: [],
        lifetime_stats: [],
        prev_seven_days_hits: [],
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Dashboard Fetch Failed",
      continents: [],
      countries: [],
      current_day_stats: [],
      lifetime_stats: [],
      prev_seven_days_hits: [],
    };
  }
};

export const getMyLinks = async (props: {
  userId: string;
  limit: number;
  offset: number;
}): Promise<MyLinksApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + DASHBOARD_MY_LINKS_API_URL_V1;

  try {
    const myLinksApiResponse = await axios.get(url, {
      params: {
        userId: props.userId,
        limit: props.limit,
        offset: props.offset,
      },
    });

    return {
      httpCode: myLinksApiResponse.status,
      next_offset: myLinksApiResponse.data.next_offset,
      success: myLinksApiResponse.data.status_code === 200,
      total_records: myLinksApiResponse.data.total_records,
      urls: myLinksApiResponse.data.urls,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      const axiosNetworkErrorResponse: ApiErrorResponse =
        axiosNwErrorResponse();

      return {
        success: axiosNetworkErrorResponse.success,
        httpCode: axiosNetworkErrorResponse.httpCode,
        message: axiosNetworkErrorResponse.message,
        next_offset: -1,
        total_records: -1,
        urls: [],
      };
    }

    if (err.response && err.response.data) {
      const errResp = errorResponse(err);

      return {
        success: errResp.success,
        httpCode: errResp.httpCode,
        message: errResp.message,
        next_offset: -1,
        total_records: -1,
        urls: [],
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "My Links Fetch Failed",
      next_offset: -1,
      total_records: -1,
      urls: [],
    };
  }
};

export const getUrlMetrics = async (props: {
  userId: string;
  startTime: number;
  endTime: number;
  shortUrl: string;
  limit: number;
}): Promise<UrlMetricApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + DASHBOARD_URL_METRICS_API_URL_V1;

  try {
    const urlMetricsApiResponse = await axios.get(url, {
      params: {
        userId: props.userId,
        shortUrl: props.shortUrl,
        startTime: props.startTime,
        endTime: props.endTime,
        limit: props.limit,
      },
    });

    return {
      httpCode: urlMetricsApiResponse.status,
      avg_redirect_duration: urlMetricsApiResponse.data.avg_redirect_duration,
      latest_hits: urlMetricsApiResponse.data.latest_hits,
      total_hits: urlMetricsApiResponse.data.total_hits,
      success: urlMetricsApiResponse.data.status_code === 200,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      const axiosNetworkErrorResponse: ApiErrorResponse =
        axiosNwErrorResponse();

      return {
        success: axiosNetworkErrorResponse.success,
        httpCode: axiosNetworkErrorResponse.httpCode,
        message: axiosNetworkErrorResponse.message,
        avg_redirect_duration: -1,
        latest_hits: [],
        total_hits: -1,
      };
    }

    if (err.response && err.response.data) {
      const errResp = errorResponse(err);

      return {
        success: errResp.success,
        httpCode: errResp.httpCode,
        message: errResp.message,
        avg_redirect_duration: -1,
        latest_hits: [],
        total_hits: -1,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Url Metrics Fetch Failed",
      avg_redirect_duration: -1,
      latest_hits: [],
      total_hits: -1,
    };
  }
};

export const getGeographicalStats = (props: {
  userId: string;
}): GeographicalApiResponse => {
  return {
    httpCode: 200,
    success: true,
    continents: [
      {
        name: "North America",
        hits_count: 13,
        countries: [
          {
            name: "United States",
            hits_count: 12,
            cities: [
              {
                name: "unidentified",
                hits_count: 10,
              },
              {
                name: "Kennett Square",
                hits_count: 1,
              },
              {
                name: "San Antonio",
                hits_count: 1,
              },
            ],
          },
          {
            name: "Canada",
            hits_count: 1,
            cities: [
              {
                name: "unidentified",
                hits_count: 1,
              },
            ],
          },
        ],
      },
      {
        name: "Asia",
        hits_count: 4,
        countries: [
          {
            name: "China",
            hits_count: 1,
            cities: [
              {
                name: "unidentified",
                hits_count: 1,
              },
            ],
          },
          {
            name: "Indonesia",
            hits_count: 1,
            cities: [
              {
                name: "unidentified",
                hits_count: 1,
              },
            ],
          },
          {
            name: "Singapore",
            hits_count: 1,
            cities: [
              {
                name: "unidentified",
                hits_count: 1,
              },
            ],
          },
          {
            name: "Taiwan",
            hits_count: 1,
            cities: [
              {
                name: "unidentified",
                hits_count: 1,
              },
            ],
          },
        ],
      },
      {
        name: "Europe",
        hits_count: 2,
        countries: [
          {
            name: "France",
            hits_count: 1,
            cities: [
              {
                name: "Bourg-la-Reine",
                hits_count: 1,
              },
            ],
          },
          {
            name: "Switzerland",
            hits_count: 1,
            cities: [
              {
                name: "unidentified",
                hits_count: 1,
              },
            ],
          },
        ],
      },
      {
        name: "unidentified",
        hits_count: 2,
        countries: [
          {
            name: "unidentified",
            hits_count: 2,
            cities: [
              {
                name: "unidentified",
                hits_count: 2,
              },
            ],
          },
        ],
      },
      {
        name: "South America",
        hits_count: 1,
        countries: [
          {
            name: "Brazil",
            hits_count: 1,
            cities: [
              {
                name: "unidentified",
                hits_count: 1,
              },
            ],
          },
        ],
      },
    ],
    countries: [
      {
        name: "United States",
        hits_count: 12,
        cities: [
          {
            name: "unidentified",
            hits_count: 10,
          },
          {
            name: "Kennett Square",
            hits_count: 1,
          },
          {
            name: "San Antonio",
            hits_count: 1,
          },
        ],
      },
      {
        name: "Canada",
        hits_count: 1,
        cities: [
          {
            name: "unidentified",
            hits_count: 1,
          },
        ],
      },
      {
        name: "China",
        hits_count: 1,
        cities: [
          {
            name: "unidentified",
            hits_count: 1,
          },
        ],
      },
      {
        name: "Indonesia",
        hits_count: 1,
        cities: [
          {
            name: "unidentified",
            hits_count: 1,
          },
        ],
      },
      {
        name: "Singapore",
        hits_count: 1,
        cities: [
          {
            name: "unidentified",
            hits_count: 1,
          },
        ],
      },
      {
        name: "Taiwan",
        hits_count: 1,
        cities: [
          {
            name: "unidentified",
            hits_count: 1,
          },
        ],
      },
      {
        name: "France",
        hits_count: 1,
        cities: [
          {
            name: "Bourg-la-Reine",
            hits_count: 1,
          },
        ],
      },
      {
        name: "Switzerland",
        hits_count: 1,
        cities: [
          {
            name: "unidentified",
            hits_count: 1,
          },
        ],
      },
      {
        name: "unidentified",
        hits_count: 2,
        cities: [
          {
            name: "unidentified",
            hits_count: 2,
          },
        ],
      },
      {
        name: "Brazil",
        hits_count: 1,
        cities: [
          {
            name: "unidentified",
            hits_count: 1,
          },
        ],
      },
    ],
  };
};

export const getDeviceMetricsStats = (props: {
  userId: string;
}): DeviceMetricsApiResponse => {
  return {
    httpCode: 200,
    success: true,
    os_browsers: [
      {
        os_name: "Windows",
        hits_count: 12,
        browsers: [
          {
            name: "IE",
            hits_count: 5,
          },
          {
            name: "Opera",
            hits_count: 3,
          },
          {
            name: "Chrome",
            hits_count: 2,
          },
          {
            name: "Safari",
            hits_count: 2,
          },
        ],
      },
      {
        os_name: "Linux",
        hits_count: 6,
        browsers: [
          {
            name: "Opera",
            hits_count: 5,
          },
          {
            name: "Chrome",
            hits_count: 1,
          },
        ],
      },
      {
        os_name: "Mac OS",
        hits_count: 4,
        browsers: [
          {
            name: "Opera",
            hits_count: 2,
          },
          {
            name: "Firefox",
            hits_count: 1,
          },
          {
            name: "Safari",
            hits_count: 1,
          },
        ],
      },
    ],
    browsers: [
      {
        name: "IE",
        hits_count: 5,
      },
      {
        name: "Opera",
        hits_count: 10,
      },
      {
        name: "Chrome",
        hits_count: 3,
      },
      {
        name: "Safari",
        hits_count: 3,
      },
      {
        name: "Firefox",
        hits_count: 1,
      },
    ],
    oss: [
      {
        name: "Windows",
        hits_count: 12,
      },
      {
        name: "Linux",
        hits_count: 6,
      },
      {
        name: "Mac OS",
        hits_count: 4,
      },
    ],
  };
};

export const getPopularURLStats = (props: {
  userId: string;
}): PopularURLApiResponse => {
  return {
    httpCode: 200,
    success: true,
    popular_urls: [
      {
        short_url: "8nJ2GDC",
        hits_count: 35,
      },
      {
        short_url: "u2rGaOw",
        hits_count: 33,
      },
      {
        short_url: "7FO5bt8",
        hits_count: 32,
      },
      {
        short_url: "u6yV36W",
        hits_count: 32,
      },
      {
        short_url: "Rmm6gGY",
        hits_count: 30,
      },
    ],
  };
};
