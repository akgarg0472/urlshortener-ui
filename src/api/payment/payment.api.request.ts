export type PaypalCreateOrderRequest = {
  userId: string;
  currencyCode: string;
  amount: string;
  paymentMethod: string;
  packId: string;
  description: string;
  email: string | null;
  name: string;
};

export type GetPaymentDetailRequest = {
  userId: string;
  paymentId: string;
};

export type PaypalCancelPaymentRequest = {
  userId: string;
  paymentId: string;
};

export type PaymentHistoryRequest = {
  userId: string;
};
