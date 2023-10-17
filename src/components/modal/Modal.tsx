import "./Modal.css";

interface ModalProps {
  icon: ModalIcon;
  title?: string;
  message?: string;
}

export enum ModalIcon {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

const Modal = () => {
  const modal__container__id = "url__shortener__modal__container";
  const modal__id = "url__shortener__modal";
  const modal__btn__id = "url__shortener__modal__button";

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
    }
  };

  const createModal = (props: ModalProps): HTMLDivElement => {
    modal = document.createElement("div");
    modal.id = modal__container__id;
    modal.classList.add("modal__overlay");

    modal.innerHTML = `
      <dialog class='modal__dialog' id=${modal__id}>
        <img class="modal__icon" src='./assets/icons/error.png' />
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
        <button class="modal__button ${getButtonColorClass(
          props.icon
        )}" id='url__shortener__modal__button'>OK</button>
      </dialog>
    `;

    modal.onkeydown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        closeModal();
      }
    };

    return modal;
  };

  const showModal = (props: ModalProps) => {
    const modal: HTMLDivElement = createModal(props);
    document.body.appendChild(modal);
    modalDialog = document.getElementById(modal__id);
    const modalButton: HTMLElement | null =
      document.getElementById(modal__btn__id);

    if (modalDialog != null) {
      modalDialog?.showModal();
    }

    if (modalButton != null) {
      modalButton.onclick = () => {
        closeModal();
      };
    }
  };

  return { showModal };
};

export default Modal();
