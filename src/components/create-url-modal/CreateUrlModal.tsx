import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import RegularButton from "../button/RegularButton";
import InputField from "../inputfield/InputField";
import InternalLoader from "../loader/internal-loader/InternalLoader";
import Modal from "../modal/Modal";

import "./CreateUrlModal.css";
import { ModalIcon } from "../modal/Modal.enums";
import { InputFieldType } from "../inputfield/InputField.enums";
import { InternalLoaderSize } from "../loader/Loader.enums";

const CreateUrlModal = (props: CreateUrlModalProps) => {
  const { getUserId } = useAuth();

  const generateShortUrlButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");

  const handleGenerateShortUrlButtonClick = () => {
    setLoading(true);

    if (generateShortUrlButtonRef.current) {
      generateShortUrlButtonRef.current.disabled = true;
      generateShortUrlButtonRef.current.classList.add("uss__button__disabled");
    }

    setTimeout(() => {
      setLoading(false);

      if (generateShortUrlButtonRef.current) {
        generateShortUrlButtonRef.current.disabled = false;
        generateShortUrlButtonRef.current.classList.remove(
          "uss__button__disabled"
        );
      }

      Modal.showModal({
        icon: ModalIcon.SUCCESS,
        title: "Success",
        message: "Short URL generated successfully",
      });
    }, 5000);
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
            <InputField
              id="create__short__url__IF"
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter Original URL"
              text={originalUrl}
              type={InputFieldType.TEXT}
              title="Original URL"
            />

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
