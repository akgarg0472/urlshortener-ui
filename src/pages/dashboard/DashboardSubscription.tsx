import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetSubscriptionRequest } from "../../api/subscription/subs.api.request";
import {
  ActiveSubscription,
  getAllSubscriptionsResponse,
  GetSubscriptionResponse,
} from "../../api/subscription/subs.api.response";
import {
  getActiveSubscription,
  getAllSubscriptions,
} from "../../api/subscription/subscription";
import RegularButton from "../../components/button/RegularButton";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import KVPair from "../../components/KVPair/KVPair";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";
import { InternalLoaderSize } from "../../components/loader/Loader.enums";
import Modal from "../../components/modal/Modal";
import { ModalIcon } from "../../components/modal/Modal.enums";
import NoDataAvailable from "../../components/no-data-available/NoDataAvailable";
import { Subscription } from "../../components/subscription/Subscription";
import {
  DASH_ACTIVE_SUB_HEAD,
  DASH_ACTIVE_SUB_SUBHEAD,
  DASH_PAYMENT_HISTORY_HEAD,
  DASH_PAYMENT_HISTORY_SUBHEAD,
  DASH_SUBS_HISTORY_HEAD,
  DASH_SUBS_HISTORY_SUBHEAD,
  LOGIN_URL,
} from "../../constants";
import useAuth from "../../hooks/useAuth";
import { convertTimestampToDateTime } from "../../utils/datetimeutils";

import { fetchPaymentHistory } from "../../api/payment/payment";
import { PaymentHistoryRequest } from "../../api/payment/payment.api.request";
import {
  PaymentDetail,
  PaymentHistoryResponse,
} from "../../api/payment/payment.api.response";
import { Payment } from "../../components/payment/Payment";
import "./Dashboard.css";

type ActiveSubscriptionPack = {
  pack_id: string;
  pack_name: string;
  default_pack: boolean;
};

const DashboardSubscription = () => {
  const { getUserId, logout, getAuthToken } = useAuth();
  const navigate = useNavigate();

  const [activeSubscription, setActiveSubscription] =
    useState<ActiveSubscription | null>(null);
  const [activePack, setActivePack] = useState<ActiveSubscriptionPack | null>(
    null
  );
  const [showActiveSubsLoader, setShowActiveSubsLoader] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [
    showFetchSubscriptionHistoryButton,
    setShowFetchSubscriptionHistoryButton,
  ] = useState<boolean>(true);
  const [showSubsHistoryLoader, setShowSubHistoryLoader] =
    useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<
    ActiveSubscription[] | null
  >(null);

  const [showFetchPaymentHistoryButton, setShowFetchPaymentHistoryButton] =
    useState<boolean>(true);
  const [showPaymentHistoryLoader, setShowPaymentHistoryLoader] =
    useState<boolean>(false);
  const [payments, setPayments] = useState<PaymentDetail[] | null>(null);

  useEffect(() => {
    fetchActiveSubscription();
    // eslint-disable-next-line
  }, []);

  const fetchActiveSubscription = async () => {
    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    setErrorMessage(undefined);
    setShowActiveSubsLoader(true);

    const req: GetSubscriptionRequest = {
      userId: userId,
      authToken: authToken,
    };

    const response: GetSubscriptionResponse = await getActiveSubscription(req);

    setShowActiveSubsLoader(false);

    if (!response.success) {
      setErrorMessage(response.message);
      return;
    }

    setActiveSubscription((prev) => {
      if (response.subscription) {
        const subscription = response.subscription;

        if ("user_id" in subscription) {
          delete (subscription as { user_id?: unknown }).user_id;
        }

        if ("pack_id" in subscription) {
          delete (subscription as { pack_id?: unknown }).pack_id;
        }

        if ("status" in subscription) {
          delete (subscription as { status?: unknown }).status;
        }

        return subscription;
      }

      return prev;
    });

    setActivePack((prev) => {
      if (response.pack) {
        const pack = response.pack;

        if ("privileges" in pack) {
          delete (pack as { privileges?: unknown }).privileges;
        }

        if ("features" in pack) {
          delete (pack as { features?: unknown }).features;
        }

        return pack;
      }

      return prev;
    });
  };

  const fetchAllSubscriptionHistory = async () => {
    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      logout();
      navigate(LOGIN_URL, { replace: true });
      return;
    }

    setShowSubHistoryLoader(true);
    setShowFetchSubscriptionHistoryButton(false);

    const req: GetSubscriptionRequest = {
      userId: userId,
      authToken: authToken,
    };

    const response: getAllSubscriptionsResponse =
      await getAllSubscriptions(req);

    setShowSubHistoryLoader(false);

    if (!response.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: response.message ?? "Failed to fetch subscription details",
      });
      setShowFetchSubscriptionHistoryButton(true);
      return;
    }

    setSubscriptions((prev) => {
      if (response.subscriptions) {
        const subscriptions: ActiveSubscription[] = response.subscriptions;

        subscriptions.forEach((subscription) => {
          if ("user_id" in subscription) {
            delete (subscription as { user_id?: unknown }).user_id;
          }
        });

        return subscriptions;
      }

      return prev;
    });
  };

  const fetchAllPaymentHistory = async () => {
    const request: PaymentHistoryRequest = {
      userId: getUserId()!,
      authToken: getAuthToken()!,
    };

    setShowPaymentHistoryLoader(true);
    const response: PaymentHistoryResponse = await fetchPaymentHistory(request);
    setShowPaymentHistoryLoader(false);

    if (!response.success || !response.payments) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: response.message ?? "Failed to fetch payment history",
      });
      setShowFetchPaymentHistoryButton(true);
      return;
    }

    setPayments(response.payments);
    setShowFetchPaymentHistoryButton(false);
  };

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <div className="active__subscription__pack__details__container">
            <DashboardHeadSubHead
              heading={DASH_ACTIVE_SUB_HEAD}
              subheading={DASH_ACTIVE_SUB_SUBHEAD}
            />

            <div className="content">
              <div className="active__subs__details__container">
                {showActiveSubsLoader && (
                  <div
                    style={{
                      padding: "2rem 0",
                    }}
                  >
                    <InternalLoader size={InternalLoaderSize.SMALL} />
                  </div>
                )}

                {!showActiveSubsLoader ? (
                  activeSubscription ? (
                    Object.entries(activeSubscription).map((key) => {
                      const formattedKey = key[0]
                        .toString()
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");
                      const formattedValue =
                        typeof key[1] === "number"
                          ? convertTimestampToDateTime(key[1])
                          : key[1];

                      return (
                        <KVPair
                          _key={formattedKey}
                          key={key.toString()}
                          value={formattedValue}
                          style={{
                            width: "100%",
                          }}
                        />
                      );
                    })
                  ) : (
                    <NoDataAvailable text={errorMessage} />
                  )
                ) : null}
              </div>

              <div className="active__pack__details__container">
                {showActiveSubsLoader && (
                  <div
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <InternalLoader size={InternalLoaderSize.SMALL} />
                  </div>
                )}

                {!showActiveSubsLoader ? (
                  activePack ? (
                    Object.entries(activePack).map((key) => {
                      const formattedKey = key[0]
                        .toString()
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");
                      const formattedValue: any =
                        typeof key[1] === "number"
                          ? convertTimestampToDateTime(key[1])
                          : key[1].toString();

                      return (
                        <KVPair
                          _key={formattedKey}
                          key={key.toString()}
                          value={formattedValue}
                          style={{
                            width: "100%",
                          }}
                        />
                      );
                    })
                  ) : (
                    <NoDataAvailable text={errorMessage} />
                  )
                ) : null}
              </div>
            </div>
          </div>

          <div className="subscription__history__container">
            <DashboardHeadSubHead
              heading={DASH_SUBS_HISTORY_HEAD}
              subheading={DASH_SUBS_HISTORY_SUBHEAD}
            />

            {showSubsHistoryLoader && <InternalLoader />}

            <div className="content">
              {subscriptions &&
                subscriptions.map((subscription) => (
                  <Subscription
                    key={subscription.subscription_id}
                    {...subscription}
                  />
                ))}
            </div>

            {showFetchSubscriptionHistoryButton && (
              <RegularButton
                content="Fetch History"
                className="btn__fetch__subs__history"
                onClick={fetchAllSubscriptionHistory}
              />
            )}
          </div>

          <div className="payment__history__container">
            <DashboardHeadSubHead
              heading={DASH_PAYMENT_HISTORY_HEAD}
              subheading={DASH_PAYMENT_HISTORY_SUBHEAD}
            />

            {showPaymentHistoryLoader && <InternalLoader />}

            <div className="content">
              {payments &&
                payments.map((payment) => (
                  <Payment key={payment.id} {...payment} />
                ))}
            </div>

            {showFetchPaymentHistoryButton && (
              <RegularButton
                content="Fetch History"
                className="btn__fetch__payment__history"
                onClick={fetchAllPaymentHistory}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardSubscription;
