import { Link } from "react-router-dom";
import "./LinkButton.css";

const LinkButton = (props: LinkButtonProps) => {
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
