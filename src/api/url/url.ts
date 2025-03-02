import { GENERATE_SHORT_URL_API_URL_V1 } from "../../api.endpoint.constants";
import { getEnv } from "../../utils/envutils";
import {
  axiosNwErrorResponse,
  errorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import { ApiErrorResponse, axiosInstance } from "../base";
import { GenerateUrlResponse } from "../dashboard/dashboard.api.response";

export const generateShortUrl = async (
  props: GenerateUrlRequest
): Promise<GenerateUrlResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + GENERATE_SHORT_URL_API_URL_V1;

  try {
    const generateShortUrlResponse = await axiosInstance.post(
      url,
      {
        user_id: props.userId,
        original_url: props.originalUrl,
        expires_at: props.expirationTime,
        custom_alias: props.customAlias,
      },
      {
        headers: {
          "X-USER-ID": props.userId,
        },
      }
    );

    return {
      httpCode: generateShortUrlResponse.status,
      success: generateShortUrlResponse.status === 201,
      original_url: generateShortUrlResponse.data.original_url,
      short_url: generateShortUrlResponse.data.short_url,
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
        errors: err.response.data.errors,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Error Generating Short URL",
    };
  }
};
