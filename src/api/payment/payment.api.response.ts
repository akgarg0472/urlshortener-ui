export type PaypalCreateOrderResponse = {
  httpCode: number;
  message: string;
  success: boolean;
  payment_id?: string;
  approval_url?: string;
  errors?: any;
};

export type PaypalCaptureOrderResponse = {
  httpCode: number;
  message: string;
  success: boolean;
  errors?: any;
};
