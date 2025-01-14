import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import RegularButton from "../button/RegularButton";
import InputField from "../inputfield/InputField";
import { InputFieldType } from "../inputfield/InputField.enums";
import InternalLoader from "../loader/internal-loader/InternalLoader";
import { InternalLoaderSize } from "../loader/Loader.enums";
import Modal from "../modal/Modal";
import { ModalIcon } from "../modal/Modal.enums";

import { GenerateUrlResponse } from "../../api/dashboard/dashboard.api.response";
import { generateShortUrl } from "../../api/url/url";
import { isValidAndFutureMillisecond } from "../../utils/datetimeutils";
import "./CreateUrlModal.css";

const CreateUrlModal = (props: CreateUrlModalProps) => {
  const { getUserId, getAuthToken } = useAuth();

  const generateShortUrlButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<number | null>(null);

  const handleGenerateShortUrlButtonClick = async () => {
    if (!originalUrl) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: "ERROR",
        message: "Please provide valid URL",
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
      Modal.showModal({
        icon: ModalIcon.ERROR,
        title: "ERROR",
        message: apiResponse.message ?? "Error generating short URL",
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
            <div className="title">Generate Short URL</div>
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
            <div className="input__fields__container">
              <InputField
                id="create__short__url__IF"
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter Original URL"
                text={originalUrl}
                type={InputFieldType.TEXT}
                title="Original URL"
                isRequired={true}
              />

              <InputField
                id="short__url__expiration__IF"
                onChange={(e) => {
                  setExpirationDate(new Date(e.target.value).getTime());
                }}
                placeholder="Expiration Time"
                text={originalUrl}
                type={InputFieldType.DATE_TIME}
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
          </div>
        </dialog>
      </div>
    </React.Fragment>
  );
};

export default CreateUrlModal;
