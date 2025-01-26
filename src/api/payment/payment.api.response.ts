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

export type PaymentHistoryResponse = {
  message: string;
  success: boolean;
  payments?: PaymentDetail[];
};

export type PaymentDetail = {
  id: string;
  pack_id: string;
  amount: number;
  payment_status: PaymentStatus;
  currency: string;
  payment_method: string;
  created_at: number;
  updated_at: number;
};

export enum PaymentStatus {
  CREATED,
  PROCESSING,
  COMPLETED,
  CANCELLED,
  FAILED,
}
