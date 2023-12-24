interface ModalProps {
  icon: ModalIcon;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  confirmText?: string;
  onClose?: () => void;
}
