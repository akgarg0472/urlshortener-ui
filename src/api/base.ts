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
