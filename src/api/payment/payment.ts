import axios from "axios";
import { PAYMENT_GET_PUBLIC_KEY_API_URL_V1 } from "../../api.endpoint.constants";

export const getPublicApiKey = async (paymentGateway: string) => {
  const url =
    process.env.REACT_APP_BACKEND_BASE_URL + PAYMENT_GET_PUBLIC_KEY_API_URL_V1;

  try {
    const getPublicKeyResponse = await axios.get(url, {
      params: {
        gateway: paymentGateway,
      },
    });

    console.log(getPublicKeyResponse.data);
  } catch (err: any) {
    console.log(err);
  }
};
