import axios, { InternalAxiosRequestConfig } from "axios";
import { generateRequestId } from "../utils/requestIdGenerator";

export interface ApiResponse {
  httpCode: number;
  message?: string;
  success: boolean;
  errors?: any;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  httpCode: number;
  errors?: any;
}

export const axiosInstance = axios.create({
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers["X-Request-ID"] = generateRequestId();
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
