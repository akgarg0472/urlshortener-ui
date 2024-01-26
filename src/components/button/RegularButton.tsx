import "./RegularButton.css";

const RegularButton = (props: RegularButtonProps) => {
  return (
    <button
      ref={props.reference}
      className={`${props.className} ${
        props.isDisabled ? "disabled__reg__btn" : ""
      }`}
      onClick={props.onClick}
      type={props.type}
      style={{
        visibility: props.isHidden ? "hidden" : "visible",
      }}
      disabled={props.isDisabled}
    >
      {props.content}
    </button>
  );
};

export default RegularButton;
