import "./RegularButton.css";

const RegularButton = (props: RegularButtonProps) => {
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
