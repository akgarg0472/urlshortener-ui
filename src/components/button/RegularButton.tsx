interface ButtonProps {
  text: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isHidden?: boolean;
}

const RegularButton = (props: ButtonProps) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      style={{
        visibility: props.isHidden ? "hidden" : "visible",
      }}
    >
      {props.text}
    </button>
  );
};

export default RegularButton;
