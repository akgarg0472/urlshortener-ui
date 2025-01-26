import axios, { InternalAxiosRequestConfig } from "axios";

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

const generateRequestId = (length: number = 16): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
