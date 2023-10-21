import "./Modal.css";

interface ModalProps {
  icon: ModalIcon;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  confirmText?: string;
}

export enum ModalIcon {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  CONFIRMATION = "confirmation",
}

const Modal = () => {
  const modal__container__id = "url__shortener__modal__container";
  const modal__id = "url__shortener__modal";
  const modal__ok__btn__id = "url__shortener__modal__button__ok";
  const modal__cancel__btn__id = "url__shortener__modal__button__cancel";
  const modal__confirm__btn__id = "url__shortener__modal__button__confirm";

  let modal: HTMLDivElement;
  let modalDialog: any;

  const closeModal = () => {
    if (modalDialog !== null) {
      modalDialog.close();
      modal.remove();
    }
  };

  const getButtonColorClass = (icon: ModalIcon): string => {
    switch (icon) {
      case ModalIcon.ERROR:
        return "modal__btn__error";
      case ModalIcon.SUCCESS:
        return "modal__btn__success";
      case ModalIcon.INFO:
        return "modal__btn__info";
      case ModalIcon.WARNING:
        return "modal__btn__warning";
      case ModalIcon.CONFIRMATION:
        return "modal__btn__confirmation";
    }
  };

  const getIconSrc = (icon: ModalIcon): string => {
    switch (icon) {
      case ModalIcon.ERROR:
        return "./assets/icons/error.png";
      case ModalIcon.SUCCESS:
        return "./assets/icons/success.png";
      case ModalIcon.INFO:
        return "./assets/icons/info.png";
      case ModalIcon.WARNING:
        return "./assets/icons/warning.png";
      case ModalIcon.CONFIRMATION:
        return "./assets/icons/confirmation.png";
    }
  };

  const isShowOkButton = (props: ModalProps): boolean => {
    return props.icon !== ModalIcon.CONFIRMATION;
  };

  const createModal = (props: ModalProps): HTMLDivElement => {
    modal = document.createElement("div");
    modal.classList.add("modal__overlay");
    modal.id = modal__container__id;

    modal.innerHTML = `
      <dialog class='modal__dialog' id=${modal__id}>
        <img class="modal__icon" src=${getIconSrc(props.icon)} />
        ${
          props.title
            ? "<div class='modal__title'>" + props.title + "</div>"
            : ""
        }
        ${
          props.message
            ? "<div class='modal__message'>" + props.message + "</div>"
            : ""
        }
            
        <div class="modal__btns__container">
          ${
            isShowOkButton(props)
              ? `<button class="modal__button ${getButtonColorClass(
                  props.icon
                )}" id=${modal__ok__btn__id}>OK</button>`
              : ""
          }

          ${
            props.icon === ModalIcon.CONFIRMATION
              ? `<button class="modal__button modal__button__cancel" id=${modal__cancel__btn__id}>${
                  props.cancelText ? props.cancelText : "Cancel"
                }</button>`
              : ""
          }

          ${
            props.icon === ModalIcon.CONFIRMATION
              ? `<button class="modal__button modal__button__confirm" id=${modal__confirm__btn__id}>${
                  props.confirmText ? props.confirmText : "Confirm"
                }</button>`
              : ""
          }
        </div>

      </dialog>
    `;

    modal.onkeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    return modal;
  };

  const showModal = (props: ModalProps) => {
    const modal: HTMLDivElement = createModal(props);
    document.body.appendChild(modal);
    modalDialog = document.getElementById(modal__id);

    const modalOkButton: HTMLElement | null = document.querySelector(
      `#${modal__ok__btn__id}`
    );

    const modalCancelButton: HTMLElement | null = document.querySelector(
      `#${modal__cancel__btn__id}`
    );

    const modalConfirmButton: HTMLElement | null = document.querySelector(
      `#${modal__confirm__btn__id}`
    );

    if (modalOkButton != null) {
      modalOkButton.onclick = (e) => {
        closeModal();
      };
    }

    if (modalCancelButton != null) {
      modalCancelButton.onclick = (e) => {
        closeModal();
        if (props.onCancel) {
          props.onCancel();
        }
      };
    }

    if (modalConfirmButton != null) {
      modalConfirmButton.onclick = (e) => {
        closeModal();
        if (props.onConfirm) {
          props.onConfirm();
        }
      };
    }

    if (modalDialog != null) {
      modalDialog.showModal();
    }
  };

  return { showModal, closeModal };
};

export default Modal();
