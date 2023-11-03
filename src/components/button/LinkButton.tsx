import { Link } from "react-router-dom";
import "./LinkButton.css";

interface ButtonProps {
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

const LinkButton = (props: ButtonProps) => {
  return (
    <Link
      className={`link__button ${props.className}`}
      to={props.onClickLink}
      target={props.target}
      referrerPolicy={props.referrerPolicy}
    >
      {props.text}
    </Link>
  );
};

export default LinkButton;
