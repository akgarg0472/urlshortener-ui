import React, { useEffect, useRef, useState } from "react";
import { getUsageStatistics } from "../../api/dashboard/dashboard";
import { GenerateUrlResponse } from "../../api/dashboard/dashboard.api.response";
import { GetSubscriptionRequest } from "../../api/subscription/subs.api.request";
import { GetSubscriptionResponse } from "../../api/subscription/subs.api.response";
import { getActiveSubscription } from "../../api/subscription/subscription";
import { generateShortUrl } from "../../api/url/url";
import useAuth from "../../hooks/useAuth";
import { isValidAndFutureMillisecond } from "../../utils/datetimeutils";
import RegularButton from "../button/RegularButton";
import InputField from "../inputfield/InputField";
import { InputFieldType } from "../inputfield/InputField.enums";
import InternalLoader from "../loader/internal-loader/InternalLoader";
import { InternalLoaderSize } from "../loader/Loader.enums";
import Modal from "../modal/Modal";
import { ModalIcon } from "../modal/Modal.enums";

import { getAllowedCustomAlias } from "../../utils/subscriptonUtils";
import { isValidURL } from "../../utils/validationutils";
import "./CreateUrlModal.css";

const CreateUrlModal = (props: CreateUrlModalProps) => {
  const { getUserId, getAuthToken } = useAuth();

  const generateShortUrlButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [customAlias, setCustomAlias] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<number | null>(null);
  const [showCustomAlias, setShowCustomAlias] = useState<boolean>(false);
  const [fetchingUsage, setFetchingUsage] = useState<boolean>(true);

  useEffect(() => {
    fetchCustomAliasUsage();
    // eslint-disable-next-line
  }, []);

  const fetchActiveSubscription =
    async (): Promise<GetSubscriptionResponse> => {
      const request: GetSubscriptionRequest = {
        userId: getUserId()!,
        authToken: getAuthToken()!,
      };
      return await getActiveSubscription(request);
    };

  const fetchCustomAliasUsage = async () => {
    const subscription = await fetchActiveSubscription();
    const userId: string = getUserId()!;

    if (subscription.success && subscription.subscription) {
      const request: MetricUsageRequest = {
        metricName: "customAlias",
        userId: userId,
        authToken: getAuthToken()!,
        startTime: subscription.subscription.activated_at,
        endTime: Date.now(),
      };
      const response = await getUsageStatistics(request);

      if (response.success && response.value !== undefined) {
        const allowedCustomAlias: number = getAllowedCustomAlias(userId);

        if (allowedCustomAlias > response.value) {
          setShowCustomAlias(true);
        }
      }
    }

    setFetchingUsage(false);
  };

  const handleGenerateShortUrlButtonClick = async () => {
    if (!isValidURL(originalUrl)) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: "ERROR",
        message: "Please provide valid original URL",
      });
      return;
    }

    if (!isValidAndFutureMillisecond(expirationDate)) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: "ERROR",
        message: "Please provide a valid future expiration date and time",
      });
      return;
    }

    const userId = getUserId();
    const authToken = getAuthToken();

    if (!userId || !authToken) {
      return;
    }

    setLoading(true);

    if (generateShortUrlButtonRef.current) {
      generateShortUrlButtonRef.current.disabled = true;
      generateShortUrlButtonRef.current.classList.add("uss__button__disabled");
    }

    const apiResponse: GenerateUrlResponse = await generateShortUrl({
      originalUrl: originalUrl,
      expirationTime: expirationDate,
      userId: userId,
      authToken: authToken,
      customAlias: customAlias && customAlias !== "" ? customAlias : null,
    });

    setLoading(false);

    if (generateShortUrlButtonRef.current) {
      generateShortUrlButtonRef.current.disabled = false;
      generateShortUrlButtonRef.current.classList.remove(
        "uss__button__disabled"
      );
    }

    if (apiResponse.success) {
      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        title: "Success",
        message: "Short URL generated successfully",
        onClose() {
          props.onClose();
        },
      });
    } else {
      console.log(JSON.stringify(apiResponse, null, 2));
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message:
          apiResponse.errors ??
          apiResponse.message ??
          "Error generating short URL",
        onClose() {
          props.onClose();
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div className="modal__overlay create__short__url__modal__overlay">
        <dialog
          className="create__short__url__modal__dialog"
          open
          onKeyDown={(event: React.KeyboardEvent<HTMLDialogElement>) => {
            if (event.key === "Escape") {
              props.onClose();
            }
          }}
        >
          <div className="create__short__url__dialog__title__container">
            <div className="title">Create Short URL</div>
            <div
              className="close__button__container"
              onClick={() => {
                props.onClose();
              }}
              title="Close"
            >
              <img
                src="/assets/icons/close.png"
                alt="url__metric__dialog__close__btn"
              />
            </div>
          </div>

          <div className="short__url__dialog__container">
            {fetchingUsage ? (
              <InternalLoader />
            ) : (
              <React.Fragment>
                <div className="input__fields__container">
                  <InputField
                    id="create__short__url__IF"
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter Original URL"
                    text={originalUrl}
                    type={InputFieldType.TEXT}
                    title="Original URL"
                    style={{
                      width: "100%",
                    }}
                    isRequired={true}
                  />

                  {showCustomAlias ? (
                    <InputField
                      id="custom__alias__IF"
                      onChange={(e) => setCustomAlias(e.target.value)}
                      placeholder="Enter Custom alias"
                      text={customAlias}
                      type={InputFieldType.TEXT}
                      title="Custom alias"
                      style={{
                        width: "100%",
                      }}
                      isRequired={false}
                    />
                  ) : null}

                  <InputField
                    id="short__url__expiration__IF"
                    onChange={(e) => {
                      setExpirationDate(new Date(e.target.value).getTime());
                    }}
                    placeholder="Expiration Time"
                    text={originalUrl}
                    type={InputFieldType.DATE_TIME}
                    style={{
                      width: "100%",
                    }}
                    title="Expiration Time"
                  />
                </div>

                <RegularButton
                  reference={generateShortUrlButtonRef}
                  content={
                    loading ? (
                      <InternalLoader size={InternalLoaderSize.SMALL} />
                    ) : (
                      "Generate Short URL"
                    )
                  }
                  type="button"
                  onClick={handleGenerateShortUrlButtonClick}
                  className="generate__short__url__btn"
                />
              </React.Fragment>
            )}
          </div>
        </dialog>
      </div>
    </React.Fragment>
  );
};

export default CreateUrlModal;
