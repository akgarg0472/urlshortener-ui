export type PaypalCreateOrderRequest = {
  userId: string;
  authToken: string;
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
  authToken: string;
  paymentId: string;
};

export type PaypalCancelPaymentRequest = {
  userId: string;
  authToken: string;
  paymentId: string;
};

export type PaymentHistoryRequest = {
  userId: string;
  authToken: string;
};
