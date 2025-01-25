import {
  CANCEL_PAYMENT_ORDER_PAYPAL,
  CAPTURE_PAYMENT_ORDER_PAYPAL,
  CREATE_PAYMENT_ORDER_PAYPAL,
} from "../../api.endpoint.constants";
import { getEnv } from "../../utils/envutils";
import {
  axiosNwErrorResponse,
  isAxiosNetworkError,
} from "../../utils/errorutils";
import { axiosInstance } from "../base";
import {
  PaypalCancelPaymentRequest,
  PaypalCaptureOrderRequest,
  PaypalCreateOrderRequest,
} from "./payment.api.request";
import {
  PaypalCaptureOrderResponse,
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

export const capturePaypalOrder = async (
  request: PaypalCaptureOrderRequest
): Promise<PaypalCaptureOrderResponse> => {
  const url =
    getEnv("REACT_APP_BACKEND_BASE_URL", "http://127.0.0.1:8765").replace(
      /\/+$/,
      ""
    ) + CAPTURE_PAYMENT_ORDER_PAYPAL;

  try {
    const apiResponse = await axiosInstance.post(
      url,
      {
        payment_id: request.paymentId,
        payer_id: request.payerId,
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
      success: apiResponse.status === 200,
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

      let errors = "Capture order request failed";

      if (err.response.status === 400) {
        if (typeof response.errors === "object" && response.errors !== null) {
          console.log(response.errors);
          errors = `${Object.values(response.errors).join(", ")}`;
        } else if (typeof response.errors === "string") {
          errors = response.errors;
        }
      } else {
        errors = response.errors;
      }

      return {
        success: false,
        message: response.message,
        httpCode: response.error_code || response.status_code,
        errors: errors,
      };
    }

    return {
      success: false,
      httpCode: 500,
      message: "Capture payment request Failed",
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
  } catch (err: any) {
    // do nothing
  }
};
