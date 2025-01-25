export type PaypalCreateOrderRequest = {
  userId: string;
  authToken: string;
  currencyCode: string;
  amount: string;
  paymentMethod: string;
  packId: string;
  description: string;
};

export type PaypalCaptureOrderRequest = {
  userId: string;
  authToken: string;
  paymentId: string;
  payerId: string;
};

export type PaypalCancelPaymentRequest = {
  userId: string;
  authToken: string;
  paymentId: string;
};
