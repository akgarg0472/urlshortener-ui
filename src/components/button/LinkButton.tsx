import { Link } from "react-router-dom";
import "./LinkButton.css";

interface ButtonProps {
  text: string;
  className?: string;
  onClickLink: string;
}

const LinkButton = (props: ButtonProps) => {
  return (
    <Link className={`link__button ${props.className}`} to={props.onClickLink}>
      {props.text}
    </Link>
  );
};

export default LinkButton;
