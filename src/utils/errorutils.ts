import axios from "axios";
import { ApiErrorResponse } from "../api/apiModals";

export const isAxiosNetworkError = (err: Error): boolean => {
  return axios.isAxiosError(err) && err.code === "ERR_NETWORK" && !err.response;
};

export const axiosNwErrorResponse = (): ApiErrorResponse => {
  return {
    success: false,
    message: "Service temporarily unavailable",
    httpCode: 503,
  };
};

export const errorResponse = (err: any): ApiErrorResponse => {
  const response = err.response.data;

  return {
    success: false,
    message: response.message || response.error_message,
    httpCode: response.error_code || response.status_code,
  };
};
