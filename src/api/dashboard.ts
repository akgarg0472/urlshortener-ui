import axios, { AxiosResponse } from "axios";
import {
  ApiErrorResponse,
  DashboardApiResponse,
  DashboardStatisticsApiResponse,
  DeviceMetricsApiResponse,
  GeographicalApiResponse,
  MyLinksApiResponse,
  PopularURLApiResponse,
  UrlMetricApiResponse,
} from "./apiModals";
import {
  DASHBOARD_DEVICE_METRICS_API_URL_V1,
  DASHBOARD_MY_LINKS_API_URL_V1,
  DASHBOARD_SUMMARY_API_URL_V1,
  DASHBOARD_UPDATE_PROFILE_API_URL_V1,
  DASHBOARD_URL_METRICS_API_URL_V1,
  GET_TOP_POPULAR_URLS_V1,
  GET_URL_GEOGRAPHICAL_DATA_V1,
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

    const errorHttpCode: number =
      err.response && err.response.data ? err.response.data.status_code : 500;

    return {
      success: false,
      httpCode: errorHttpCode,
      message:
        errorHttpCode === 400
          ? "Invalid Request. Please try again"
          : `Error Fetching Statistics Data`,
    };
  }
};

const geographicalApiPromise = (
  geographicRequest: UrlGeographicalRequest
): Promise<AxiosResponse> => {
  const geographicalStatsApiUrl =
    process.env.REACT_APP_BACKEND_BASE_URL + GET_URL_GEOGRAPHICAL_DATA_V1;

  const geographicalApiPromiseResponse = axios.get(geographicalStatsApiUrl, {
    params: {
      userId: geographicRequest.userId,
      startTime: geographicRequest.startTime,
      endTime: geographicRequest.endTime,
    },
  });

  return geographicalApiPromiseResponse;
};

const getDeviceMetricsStats = (
  props: DeviceMetricsApiRequest
): Promise<AxiosResponse> => {
  const deviceStatsApiUrl =
    process.env.REACT_APP_BACKEND_BASE_URL +
    DASHBOARD_DEVICE_METRICS_API_URL_V1;

  const deviceMetricsApiResponse = axios.get(deviceStatsApiUrl, {
    params: {
      userId: props.userId,
      startTime: props.startTime,
      endTime: props.endTime,
    },
  });

  return deviceMetricsApiResponse;
};

const popularUrlsPromise = (
  popularUrlRequest: TopPopularUrlRequest
): Promise<AxiosResponse> => {
  const popularUrlsApiUrl =
    process.env.REACT_APP_BACKEND_BASE_URL + GET_TOP_POPULAR_URLS_V1;

  const popularUrlApiResponse = axios.get(popularUrlsApiUrl, {
    params: {
      userId: popularUrlRequest.userId,
      sortOrder: popularUrlRequest.sortOrder,
      limit: popularUrlRequest.limit,
      startTime: popularUrlRequest.startTime,
      endTime: popularUrlRequest.endTime,
    },
  });

  return popularUrlApiResponse;
};
