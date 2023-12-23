interface LinkButtonProps {
  text: string;
  className?: string;
  onClickLink: string;
  target?: string;
  referrerPolicy:
    | ""
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
}

interface RegularButtonProps {
  content: string | any;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isHidden?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  reference?: React.RefObject<HTMLButtonElement>;
}
