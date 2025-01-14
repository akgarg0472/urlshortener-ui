import {
  DASHBOARD_GET_ACTIVE_SUBSCRIPTION_API_URL_V1,
  DASHBOARD_GET_ALL_SUBSCRIPTION_API_URL_V1,
} from "../../api.endpoint.constants";
import { getEnv } from "../../utils/envutils";
import {
  axiosNwErrorResponse,
  errorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import { ApiErrorResponse, axiosInstance } from "../base";
import { GetSubscriptionRequest } from "./subs.api.request";
import {
  getAllSubscriptionsResponse,
  GetSubscriptionResponse,
} from "./subs.api.response";

export const getActiveSubscription = async (
  request: GetSubscriptionRequest
): Promise<GetSubscriptionResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + DASHBOARD_GET_ACTIVE_SUBSCRIPTION_API_URL_V1;

  try {
    const apiResponse = await axiosInstance.get(url, {
      params: {
        userId: request.userId,
      },
      headers: {
        "X-USER-ID": request.userId,
        Authorization: `Bearer ${request.authToken}`,
      },
    });

    return {
      httpCode: apiResponse.status,
      success: apiResponse.status === 200,
      message: apiResponse.data.message,
      subscription: apiResponse.data.subscription,
      pack: apiResponse.data.pack,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      const axiosNetworkErrorResponse: ApiErrorResponse =
        axiosNwErrorResponse();

      return {
        success: axiosNetworkErrorResponse.success,
        httpCode: axiosNetworkErrorResponse.httpCode,
        message: axiosNetworkErrorResponse.message,
        subscription: null,
        pack: null,
      };
    }

    if (err.response && err.response.data) {
      const errResp = errorResponse(err);

      return {
        success: errResp.success,
        httpCode: errResp.httpCode,
        message: errResp.message,
        subscription: null,
        pack: null,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Failed to retrieve subscription details",
      subscription: null,
      pack: null,
    };
  }
};

export const getAllSubscriptions = async (
  request: GetSubscriptionRequest
): Promise<getAllSubscriptionsResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + DASHBOARD_GET_ALL_SUBSCRIPTION_API_URL_V1;

  try {
    const apiResponse = await axiosInstance.get(url, {
      params: {
        userId: request.userId,
      },
      headers: {
        "X-USER-ID": request.userId,
        Authorization: `Bearer ${request.authToken}`,
      },
    });

    return {
      httpCode: apiResponse.status,
      success: apiResponse.status === 200,
      message: apiResponse.data.message,
      subscriptions: apiResponse.data.subscriptions,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      const axiosNetworkErrorResponse: ApiErrorResponse =
        axiosNwErrorResponse();

      return {
        success: axiosNetworkErrorResponse.success,
        httpCode: axiosNetworkErrorResponse.httpCode,
        message: axiosNetworkErrorResponse.message,
        subscriptions: null,
      };
    }

    if (err.response && err.response.data) {
      const errResp = errorResponse(err);

      return {
        success: errResp.success,
        httpCode: errResp.httpCode,
        message: errResp.message,
        subscriptions: null,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Failed to retrieve subscription details",
      subscriptions: null,
    };
  }
};
