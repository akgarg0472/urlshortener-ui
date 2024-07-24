import axios from "axios";

export interface ApiResponse {
  httpCode: number;
  message?: string;
  success: boolean;
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
