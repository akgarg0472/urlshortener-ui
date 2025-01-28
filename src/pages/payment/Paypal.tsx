import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  cancelPaypalPayment,
  getPaymentDetail,
} from "../../api/payment/payment";
import {
  GetPaymentDetailRequest,
  PaypalCancelPaymentRequest,
} from "../../api/payment/payment.api.request";
import {
  PaymentDetail,
  PaymentStatus,
} from "../../api/payment/payment.api.response";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import { DASHBOARD_URL } from "../../constants";
import useAuth from "../../hooks/useAuth";

enum PaypalCallbackStatus {
  CANCEL = "cancel",
  SUCCESS = "success",
}

const Paypal = () => {
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

    const request: GetPaymentDetailRequest = {
      userId: getUserId()!,
      authToken: getAuthToken()!,
      paymentId: paymentId,
    };

    Loader.showLoader();
    const response = await getPaymentDetail(request);
    Loader.hideLoader();

    if (!response.success) {
      navigate(DASHBOARD_URL, { replace: true });
    } else if (response.payment_detail) {
      const paymentDetail: PaymentDetail = response.payment_detail;

      if (
        paymentDetail.payment_status.toString() !==
        PaymentStatus[PaymentStatus.COMPLETED]
      ) {
        Modal.showModal({
          icon: ModalIcon.SUCCESS,
          message:
            "Your payment is received successfully and changes will be reflected in your account shortly.",
          onClose() {
            navigate(DASHBOARD_URL, { replace: true });
          },
        });
      } else {
        navigate(DASHBOARD_URL, { replace: true });
      }
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

export default Paypal;
