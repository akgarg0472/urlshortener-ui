import React from "react";
import "./HorizontalInputField.css";

interface InputFieldProps {
  title: string;
  text: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  className?: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const HorizontalInputField = (props: InputFieldProps) => {
  return (
    <React.Fragment>
      <div
        className={`horizontal__input__field__container ${
          props.className ? props.className : ""
        }`}
        style={props.style}
      >
        <label className="input__field__label" htmlFor={props.id}>
          {props.title}
          {props.isRequired ? (
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          ) : (
            ""
          )}
        </label>

        <input
          className={`input__field`}
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          placeholder={props.placeholder}
          value={props.text}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              props.onKeyDown && props.onKeyDown(event);
            }
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default HorizontalInputField;
