import "./RegularButton.css";

interface ButtonProps {
  content: string | any;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isHidden?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  reference?: React.RefObject<HTMLButtonElement>;
}

const RegularButton = (props: ButtonProps) => {
  return (
    <button
      ref={props.reference}
      className={props.className}
      onClick={props.onClick}
      type={props.type}
      style={{
        visibility: props.isHidden ? "hidden" : "visible",
      }}
    >
      {props.content}
    </button>
  );
};

export default RegularButton;
