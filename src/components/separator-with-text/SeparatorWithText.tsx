import "./SeparatorWithText.css";

const SeparatorWithText = (props: { text: string }) => {
  return (
    <div className="separator_with_text">
      <hr className="separator_with_text_line" />
      <span>{props.text}</span>
      <hr className="separator_with_text_line" />
    </div>
  );
};

export default SeparatorWithText;
