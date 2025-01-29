export type PaypalCreateOrderResponse = {
  httpCode: number;
  message: string;
  success: boolean;
  payment_id?: string;
  approval_url?: string;
  errors?: any;
};

export type GetPaymentDetailResponse = {
  httpCode: number;
  message: string;
  success: boolean;
  payment_detail?: PaymentDetail;
};

export type PaymentHistoryResponse = {
  message: string;
  success: boolean;
  payments?: PaymentDetail[];
};

export type CancelPaymentResponse = {
  success: boolean;
  message: string;
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
