import {
  CANCEL_PAYMENT_ORDER_PAYPAL,
  CREATE_PAYMENT_ORDER_PAYPAL,
  GET_PAYMENT_DETAIL_URL_v1,
  PAYMENT_HISTORY_URL_V1,
} from "../../api.endpoint.constants";
import { getEnv } from "../../utils/envutils";
import {
  axiosNwErrorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import { axiosInstance } from "../base";
import {
  GetPaymentDetailRequest,
  PaymentHistoryRequest,
  PaypalCancelPaymentRequest,
  PaypalCreateOrderRequest,
} from "./payment.api.request";
import {
  GetPaymentDetailResponse,
  PaymentHistoryResponse,
  PaypalCreateOrderResponse,
} from "./payment.api.response";

export const createPaypalOrder = async (
  request: PaypalCreateOrderRequest
): Promise<PaypalCreateOrderResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + CREATE_PAYMENT_ORDER_PAYPAL;

  try {
    const apiResponse = await axiosInstance.post(
      url,
      {
        user_id: request.userId,
        currency_code: request.currencyCode,
        amount: request.amount,
        payment_method: "Credit Card",
        pack_id: request.packId,
        description: request.description,
        email: request.email,
        name: request.name,
      },
      {
        headers: {
          "X-USER-ID": request.userId,
          Authorization: `Bearer ${request.authToken}`,
        },
      }
    );

    return {
      httpCode: apiResponse.status,
      message: apiResponse.data.message,
      success: apiResponse.status === 201,
      approval_url: apiResponse.data.approval_url,
      payment_id: apiResponse.data.payment_id,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      const response = err.response.data;

      if (err.response.status === 409) {
        return {
          success: false,
          errors: response.errors || response.message,
          httpCode: response.error_code || response.status_code,
          message: response.message,
        };
      }

      let errors = "Create order request failed";

      if (err.response.status === 400) {
        if (typeof response.errors === "object" && response.errors !== null) {
          errors = `Params ${Object.keys(response.errors).join(", ")} are missing`;
        } else if (typeof response.errors === "string") {
          errors = response.errors;
        }
      }

      return {
        success: false,
        message: response.message || response.error_message,
        httpCode: response.error_code || response.status_code,
        errors: errors,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Create payment request Failed",
    };
  }
};

export const getPaymentDetail = async (
  request: GetPaymentDetailRequest
): Promise<GetPaymentDetailResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + GET_PAYMENT_DETAIL_URL_v1;

  try {
    const apiResponse = await axiosInstance.get(url + request.paymentId, {
      headers: {
        "X-USER-ID": request.userId,
        Authorization: `Bearer ${request.authToken}`,
      },
    });

    return {
      httpCode: apiResponse.status,
      message: apiResponse.data.message,
      success: apiResponse.status === 200,
      payment_detail: apiResponse.data.payment_detail,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      const response = err.response.data;

      if (err.response.status === 409) {
        return {
          success: false,
          httpCode: response.error_code || response.status_code,
          message: response.message,
        };
      }

      return {
        success: false,
        message: response.message,
        httpCode: response.error_code || response.status_code,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Get Payment detail request Failed",
    };
  }
};

export const cancelPaypalPayment = async (
  request: PaypalCancelPaymentRequest
): Promise<void> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + CANCEL_PAYMENT_ORDER_PAYPAL;

  try {
    await axiosInstance.post(
      url,
      {
        user_id: request.userId,
        payment_id: request.paymentId,
      },
      {
        headers: {
          "X-USER-ID": request.userId,
          Authorization: `Bearer ${request.authToken}`,
        },
      }
    );
    // eslint-disable-next-line
  } catch {
    // do nothing
  }
};

export const fetchPaymentHistory = async (
  request: PaymentHistoryRequest
): Promise<PaymentHistoryResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + PAYMENT_HISTORY_URL_V1;

  try {
    const response = await axiosInstance.get(url, {
      headers: {
        "X-USER-ID": request.userId,
        Authorization: `Bearer ${request.authToken}`,
      },
      params: {
        userId: request.userId,
      },
    });

    return {
      success: response.status === 200,
      message: response.data.message,
      payments: response.data.payments,
    };
  } catch (err: any) {
    if (isAxiosNetworkError(err)) {
      return axiosNwErrorResponse();
    }

    if (err.response && err.response.data) {
      const response = err.response.data;

      if (err.response.status === 409) {
        return {
          success: false,
          message: response.message,
        };
      }

      return {
        success: false,
        message: response.message,
      };
    }

    return {
      success: false,
      message: "Capture payment request Failed",
    };
  }
};
