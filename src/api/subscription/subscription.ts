import {
  DASHBOARD_GET_ACTIVE_SUBSCRIPTION_API_URL_V1,
  DASHBOARD_GET_ALL_SUBSCRIPTION_API_URL_V1,
  GET_ALL_SUBSCRIPTION_PACKS_URL_V1,
} from "../../api.endpoint.constants";
import { getEnv } from "../../utils/envutils";
import {
  axiosNwErrorResponse,
  errorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import {
  encryptActiveSubscriptionDetails,
  encryptSubscriptionPackAndComparison,
  getCachedActiveSubscriptionDetails,
  getCachedSubscriptionPacksAndComparison,
} from "../../utils/subscriptonUtils";
import { ApiErrorResponse, axiosInstance } from "../base";
import { GetSubscriptionRequest } from "./subs.api.request";
import {
  getAllSubscriptionsResponse,
  GetSubscriptionPacksResponse,
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
    const cachedData = getCachedActiveSubscriptionDetails(request.userId);

    if (cachedData) {
      return {
        httpCode: 200,
        success: true,
        message: "Active subscription fetched",
        subscription: cachedData.subscription,
        pack: cachedData.pack,
      };
    }

    const apiResponse = await axiosInstance.get(url, {
      params: {
        userId: request.userId,
      },
      headers: {
        "X-USER-ID": request.userId,
        Authorization: `Bearer ${request.authToken}`,
      },
    });

    encryptActiveSubscriptionDetails(
      apiResponse.data.subscription,
      apiResponse.data.pack
    );

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

export const getSubscriptionPacks = async (
  getComparison: boolean = false
): Promise<GetSubscriptionPacksResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + GET_ALL_SUBSCRIPTION_PACKS_URL_V1;

  try {
    // TODO: add caching layer
    const cachedValue = getCachedSubscriptionPacksAndComparison();

    if (cachedValue) {
      return {
        httpCode: 200,
        success: true,
        packs: cachedValue.packs,
        comparisons: cachedValue.comparisons,
        errors: null,
      };
    }

    const apiResponse = await axiosInstance.get(url, {
      params: {
        getComparison: getComparison,
      },
      headers: {
        "X-REQUEST-ID": 1,
      },
    });

    encryptSubscriptionPackAndComparison(
      apiResponse.data.packs,
      apiResponse.data.comparisons,
      getComparison ? 300 * 1000 : 30 * 1000
    );

    return {
      httpCode: apiResponse.status,
      success: apiResponse.status === 200,
      packs: apiResponse.data.packs,
      comparisons: apiResponse.data.comparisons,
      errors: apiResponse.data.errors,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      const axiosNetworkErrorResponse: ApiErrorResponse =
        axiosNwErrorResponse();

      return {
        success: axiosNetworkErrorResponse.success,
        httpCode: axiosNetworkErrorResponse.httpCode,
        message: axiosNetworkErrorResponse.message,
        packs: null,
        comparisons: null,
        errors: null,
      };
    }

    if (err.response && err.response.data) {
      const errResp = errorResponse(err);

      return {
        success: errResp.success,
        httpCode: errResp.httpCode,
        message: errResp.message,
        packs: null,
        comparisons: null,
        errors: null,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Failed to retrieve subscription details",
      packs: null,
      comparisons: null,
      errors: null,
    };
  }
};
