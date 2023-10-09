import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  className: string;
  onClickLink: string;
}

const LinkButton = (props: ButtonProps) => {
  return (
    <Link className={props.className} to={props.onClickLink}>
      {props.text}
    </Link>
  );
};

export default LinkButton;
