import { StripeMakePaymentResponse } from "./apiModals";

const stripeMakePayment = (props: {
  amount: number;
  payment_method: string;
  description: string;
  user_id: string;
  receipt_email: string;
}): StripeMakePaymentResponse => {
  const requestBody = {
    ...props,
    payment_gateway: "stripe",
  };

  return {
    httpCode: 200,
    payment_client_secret: "this_is_some_sort_of_client_secret_1234",
  };
};

export { stripeMakePayment };
