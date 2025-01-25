import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  cancelPaypalPayment,
  capturePaypalOrder,
} from "../../api/payment/payment";
import {
  PaypalCancelPaymentRequest,
  PaypalCaptureOrderRequest,
} from "../../api/payment/payment.api.request";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import { DASHBOARD_URL } from "../../constants";
import useAuth from "../../hooks/useAuth";

enum PaypalCallbackStatus {
  CANCEL = "cancel",
  SUCCESS = "success",
}

export const Paypal = () => {
  const [searchParams] = useSearchParams();
  const { getUserId, getAuthToken } = useAuth();
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    switch (status) {
      case PaypalCallbackStatus.SUCCESS:
        handleSuccess();
        break;

      case PaypalCallbackStatus.CANCEL:
        handleCancel();
        break;

      default:
        navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const handleSuccess = async () => {
    const paymentId = searchParams.get("token")!;
    const payerId = searchParams.get("PayerID")!;

    const request: PaypalCaptureOrderRequest = {
      userId: getUserId()!,
      authToken: getAuthToken()!,
      paymentId: paymentId,
      payerId: payerId,
    };

    Loader.showLoader();
    const response = await capturePaypalOrder(request);

    console.log(JSON.stringify(response, null, 2));

    Loader.hideLoader();

    if (!response.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: response.errors ?? response.message,
        onClose() {
          navigate(DASHBOARD_URL, { replace: true });
        },
      });
    } else {
      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        title: "Payment successful",
        message: response.message,
        onClose() {
          navigate(DASHBOARD_URL, { replace: true });
        },
      });
    }
  };

  const handleCancel = async () => {
    const paymentId = searchParams.get("token");

    const request: PaypalCancelPaymentRequest = {
      userId: getUserId()!,
      paymentId: paymentId!,
      authToken: getAuthToken()!,
    };

    Loader.showLoader();
    await cancelPaypalPayment(request);
    Loader.hideLoader();

    Modal.showModal({
      icon: ModalIcon.INFO,
      message: "Your payment has been cancelled",
      onClose() {
        navigate(DASHBOARD_URL, { replace: true });
      },
    });
  };

  return <React.Fragment></React.Fragment>;
};
