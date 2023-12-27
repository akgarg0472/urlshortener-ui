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
  DASHBOARD_STATISTICS_URL,
  DASHBOARD_SUMMARY_API_URL_V1,
} from "../api.constants";
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

    console.log(dashboardSummaryApiResponse.data);

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
    console.log(err);

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

export const myLinks = (props: {
  userId: string;
  limit: number;
  offset: number;
}): MyLinksApiResponse => {
  return {
    httpCode: 200,
    total_records: 11,
    next_offset: 1,
    urls: [
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx123",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx456",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx789",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx012",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
    ],
  };
};

export const urlMetrics = (props: {
  userId: string;
  startTime: number;
  endTime: number;
  shortUrl: string;
  limit: number;
}): UrlMetricApiResponse => {
  return {
    httpCode: 200,
    total_hits: 22,
    avg_redirect_duration: 2442.27,
    latest_hits: [
      {
        ip: "62.161.168.168",
        device_info: {
          browser: "IE",
          os: "Windows",
        },
        redirect_duration: 673,
        timestamp: 1694028145801,
        location: {
          country: "France",
          timezone: "Europe/Paris",
        },
      },
      {
        ip: "129.115.216.222",
        device_info: {
          browser: "Opera",
          os: "Mac OS",
        },
        redirect_duration: 823,
        timestamp: 1694028072656,
        location: {
          country: "United States",
          timezone: "America/Chicago",
        },
      },
      {
        ip: "47.122.194.116",
        device_info: {
          browser: "Opera",
          os: "Linux",
        },
        redirect_duration: 687,
        timestamp: 1694028070626,
        location: {
          country: "China",
          timezone: "Asia/Shanghai",
        },
      },
      {
        ip: "127.126.60.250",
        device_info: {
          browser: "Opera",
          os: "Windows",
        },
        redirect_duration: 2934,
        timestamp: 1694027974807,
        location: {
          country: "unidentified",
          timezone: "unidentified",
        },
      },
      {
        ip: "48.179.240.43",
        device_info: {
          browser: "Opera",
          os: "Windows",
        },
        redirect_duration: 3175,
        timestamp: 1694027974321,
        location: {
          country: "United States",
          timezone: "America/Chicago",
        },
      },
      {
        ip: "48.179.240.43",
        device_info: {
          browser: "Opera",
          os: "Windows",
        },
        redirect_duration: 3175,
        timestamp: 1694027974321,
        location: {
          country: "United States",
          timezone: "America/Chicago",
        },
      },
    ],
  };
};

export const geographicalStats = (props: {
  userId: string;
}): GeographicalApiResponse => {
  return {
    httpCode: 200,
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

export const deviceMetricsStats = (props: {
  userId: string;
}): DeviceMetricsApiResponse => {
  return {
    httpCode: 200,
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

export const popularURLStats = (props: {
  userId: string;
}): PopularURLApiResponse => {
  return {
    httpCode: 200,
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
