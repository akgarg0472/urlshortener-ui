import "./RegularButton.css";

interface ButtonProps {
  text: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isHidden?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const RegularButton = (props: ButtonProps) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      type={props.type}
      style={{
        visibility: props.isHidden ? "hidden" : "visible",
      }}
    >
      {props.text}
    </button>
  );
};

export default RegularButton;
