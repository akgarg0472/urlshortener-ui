import { Info } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { getUsageStatistics } from "../../api/dashboard/dashboard";
import { GenerateUrlResponse } from "../../api/dashboard/dashboard.api.response";
import { GetSubscriptionRequest } from "../../api/subscription/subs.api.request";
import { GetSubscriptionResponse } from "../../api/subscription/subs.api.response";
import { getActiveSubscription } from "../../api/subscription/subscription";
import { generateShortUrl } from "../../api/url/url";
import useAuth from "../../hooks/useAuth";
import { isValidAndFutureMillisecond } from "../../utils/datetimeutils";
import { getEnv } from "../../utils/envutils";
import { getAllowedCustomAlias } from "../../utils/subscriptonUtils";
import { isAlphanumericString, isValidURL } from "../../utils/validationutils";
import RegularButton from "../button/RegularButton";
import InputField from "../inputfield/InputField";
import { InputFieldType } from "../inputfield/InputField.enums";
import InternalLoader from "../loader/internal-loader/InternalLoader";
import { InternalLoaderSize } from "../loader/Loader.enums";
import Modal from "../modal/Modal";
import { ModalIcon } from "../modal/Modal.enums";
import { CreateUrlSuccess } from "./create-url-success/CreateUrlSuccess";

import "./CreateUrlModal.css";

interface CreateUrlModalProps {
  onClose: () => void;
}

const CreateUrlModal = (props: CreateUrlModalProps) => {
  const { getUserId } = useAuth();

  const generateShortUrlButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [customAlias, setCustomAlias] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<number | null>(null);
  const [showCustomAlias, setShowCustomAlias] = useState<boolean>(true);
  const [enableCustomAlias, setEnableCustomAlias] = useState<boolean>(false);
  const [fetchingUsage, setFetchingUsage] = useState<boolean>(true);
  const [customAliasThresholdCrossed, setCustomAliasThresholdCrossed] =
    useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomAliasUsage();
    // eslint-disable-next-line
  }, []);

  const fetchActiveSubscription = async (
    userId: string
  ): Promise<GetSubscriptionResponse> => {
    const request: GetSubscriptionRequest = {
      userId: userId,
    };
    return await getActiveSubscription(request);
  };

  const fetchCustomAliasUsage = async () => {
    const userId: string = getUserId()!;
    const subscription = await fetchActiveSubscription(userId);

    if (!subscription.success || !subscription.subscription) {
      setShowCustomAlias(false);
      setEnableCustomAlias(false);
      setFetchingUsage(false);
      return;
    }

    const request: MetricUsageRequest = {
      metricName: "customAlias",
      userId: userId,
      startTime: subscription.subscription.activated_at,
      endTime: Date.now(),
    };

    const response = await getUsageStatistics(request);

    if (response.success && response.value !== undefined) {
      const allowedCustomAlias: number = getAllowedCustomAlias(userId);

      if (allowedCustomAlias !== -1) {
        if (allowedCustomAlias > response.value) {
          setEnableCustomAlias(true);
        } else {
          setCustomAliasThresholdCrossed(true);
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

    if (customAlias && !isAlphanumericString(customAlias)) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: "ERROR",
        message: "Custom alias should be alphanumeric only",
      });
      return;
    }

    if (customAlias && customAlias.length > 10) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: "ERROR",
        message: "Custom alias length should be less or equal to 10",
      });
      return;
    }

    const userId = getUserId();

    if (!userId) {
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
      const prefixUrl = getEnv(
        "REACT_APP_PREFIX_URL_FOR_SHORT_URL",
        "http://localhost:3000/"
      );

      const formattedUrl = prefixUrl.endsWith("/")
        ? prefixUrl
        : `${prefixUrl}/`;

      setShortUrl(`${formattedUrl}${apiResponse.short_url!}`);
    } else {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message:
          apiResponse.message ??
          apiResponse.errors ??
          "Error generating short URL",
      });
    }
  };

  return (
    <React.Fragment>
      {shortUrl ? (
        <CreateUrlSuccess
          shortUrl={shortUrl}
          onClose={() => {
            props.onClose();
          }}
        />
      ) : (
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

                    {showCustomAlias && (
                      <InputField
                        id="custom__alias__IF"
                        onChange={(e) => setCustomAlias(e.target.value)}
                        placeholder="Enter Custom alias"
                        text={customAlias}
                        type={InputFieldType.TEXT}
                        title="Custom Short URL"
                        style={{
                          width: "100%",
                        }}
                        isRequired={false}
                        disabled={!enableCustomAlias}
                        aboutIcon={<Info />}
                        aboutIconTitle="Enter a custom short URL for easy access to this link. (Optional)"
                      />
                    )}

                    {customAliasThresholdCrossed ? (
                      <div className="custom__alias__quota__exceeded">
                        <span>
                          Custom alias quota exceeded. Please upgrade your plan
                          to use this feature.
                        </span>
                      </div>
                    ) : null}

                    <InputField
                      id="short__url__expiration__IF"
                      onChange={(e) => {
                        setExpirationDate(new Date(e.target.value).getTime());
                        e.currentTarget.blur();
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
                        <InternalLoader size={InternalLoaderSize.EXTRA_SMALL} />
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
      )}
    </React.Fragment>
  );
};

export default CreateUrlModal;
