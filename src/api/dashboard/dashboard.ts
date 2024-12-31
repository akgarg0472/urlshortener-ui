import { AxiosResponse } from "axios";
import {
  DASHBOARD_DEVICE_METRICS_API_URL_V1,
  DASHBOARD_MY_LINKS_API_URL_V1,
  DASHBOARD_SUMMARY_API_URL_V1,
  DASHBOARD_URL_METRICS_API_URL_V1,
  GET_TOP_POPULAR_URLS_V1,
  GET_URL_GEOGRAPHICAL_DATA_V1,
} from "../../api.endpoint.constants";
import {
  getCurrentDayStartTimeInMs,
  getOneWeekOldTimeInMsFromCurrentDate,
} from "../../utils/datetimeutils";
import {
  axiosNwErrorResponse,
  errorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import { ApiErrorResponse, axiosInstance } from "../base";
import {
  DashboardApiResponse,
  DashboardStatisticsApiResponse,
  MyLinksApiResponse,
  UrlMetricApiResponse,
} from "./dashboard.api.response";

export const getDashboard = async (
  props: DashboardSummaryApiRequest
): Promise<DashboardApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + DASHBOARD_SUMMARY_API_URL_V1;

  try {
    const dashboardSummaryApiResponse = await axiosInstance.get(url, {
      params: {
        userId: props.userId,
        endTime: props.endTime,
        startTime: props.startTime,
        currentDayStartTime: getCurrentDayStartTimeInMs(),
        currentTime: new Date().getTime(),
        oneWeekOldTime: getOneWeekOldTimeInMsFromCurrentDate(),
      },
      headers: {
        "X-USER-ID": props.userId,
        Authorization: `Bearer ${props.authToken}`,
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
  authToken: string;
}): Promise<MyLinksApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + DASHBOARD_MY_LINKS_API_URL_V1;

  try {
    const myLinksApiResponse = await axiosInstance.get(url, {
      params: {
        userId: props.userId,
        limit: props.limit,
        offset: props.offset,
      },
      headers: {
        "X-USER-ID": props.userId,
        Authorization: `Bearer ${props.authToken}`,
      },
    });

    return {
      httpCode: myLinksApiResponse.status,
      next_offset: myLinksApiResponse.data.next_offset,
      success: myLinksApiResponse.status === 200,
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
  authToken: string;
}): Promise<UrlMetricApiResponse> => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + DASHBOARD_URL_METRICS_API_URL_V1;

  try {
    const urlMetricsApiResponse = await axiosInstance.get(url, {
      params: {
        userId: props.userId,
        shortUrl: props.shortUrl,
        startTime: props.startTime,
        endTime: props.endTime,
        limit: props.limit,
      },
      headers: {
        "X-USER-ID": props.userId,
        Authorization: `Bearer ${props.authToken}`,
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

export const getDashboardStatistics = async (
  props: DashboardStatisticsRequest
): Promise<DashboardStatisticsApiResponse> => {
  try {
    const result = await Promise.all([
      popularUrlsPromise(props.popularUrlParam),
      geographicalApiPromise(props.geographicalParams),
      getDeviceMetricsStats(props.geographicalParams),
    ]);

    const isSuccessResponse =
      result[0].status === 200 &&
      result[1].status === 200 &&
      result[2].status === 200;

    return {
      success: isSuccessResponse,
      httpCode: isSuccessResponse ? 200 : 500,
      popularUrls: { ...result[0].data, success: true },
      geographicalStats: { ...result[1].data, success: true },
      deviceMetrics: { ...result[2].data, success: true },
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      const axiosNetworkErrorResponse: ApiErrorResponse =
        axiosNwErrorResponse();

      return {
        success: axiosNetworkErrorResponse.success,
        httpCode: axiosNetworkErrorResponse.httpCode,
        message: axiosNetworkErrorResponse.message,
      };
    }

    if (err.response && err.response.data) {
      const errResp = errorResponse(err);

      return {
        success: errResp.success,
        httpCode: errResp.httpCode,
        message: errResp.message,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Error fetching statistics data",
    };
  }
};

const geographicalApiPromise = (
  geographicRequest: UrlGeographicalRequest
): Promise<AxiosResponse> => {
  const geographicalStatsApiUrl =
    process.env.REACT_APP_BACKEND_BASE_URL + GET_URL_GEOGRAPHICAL_DATA_V1;

  const geographicalApiPromiseResponse = axiosInstance.get(
    geographicalStatsApiUrl,
    {
      params: {
        userId: geographicRequest.userId,
        startTime: geographicRequest.startTime,
        endTime: geographicRequest.endTime,
      },
      headers: {
        "X-USER-ID": geographicRequest.userId,
        Authorization: `Bearer ${geographicRequest.authToken}`,
      },
    }
  );

  return geographicalApiPromiseResponse;
};

const getDeviceMetricsStats = (
  props: DeviceMetricsApiRequest
): Promise<AxiosResponse> => {
  const deviceStatsApiUrl =
    process.env.REACT_APP_BACKEND_BASE_URL +
    DASHBOARD_DEVICE_METRICS_API_URL_V1;

  const deviceMetricsApiResponse = axiosInstance.get(deviceStatsApiUrl, {
    params: {
      userId: props.userId,
      startTime: props.startTime,
      endTime: props.endTime,
    },
    headers: {
      "X-USER-ID": props.userId,
      Authorization: `Bearer ${props.authToken}`,
    },
  });

  return deviceMetricsApiResponse;
};

const popularUrlsPromise = (
  popularUrlRequest: TopPopularUrlRequest
): Promise<AxiosResponse> => {
  const popularUrlsApiUrl =
    process.env.REACT_APP_BACKEND_BASE_URL + GET_TOP_POPULAR_URLS_V1;

  const popularUrlApiResponse = axiosInstance.get(popularUrlsApiUrl, {
    params: {
      userId: popularUrlRequest.userId,
      sortOrder: popularUrlRequest.sortOrder,
      limit: popularUrlRequest.limit,
      startTime: popularUrlRequest.startTime,
      endTime: popularUrlRequest.endTime,
    },
    headers: {
      "X-USER-ID": popularUrlRequest.userId,
      Authorization: `Bearer ${popularUrlRequest.authToken}`,
    },
  });

  return popularUrlApiResponse;
};
