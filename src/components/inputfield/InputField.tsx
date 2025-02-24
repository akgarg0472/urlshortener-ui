import React from "react";
import { InputFieldType } from "./InputField.enums";

import "./InputField.css";

const InputField = (props: InputFieldProps) => {
  const getInputType = (type: InputFieldType) => {
    switch (type) {
      case InputFieldType.TEXT:
        return "text";
      case InputFieldType.PASSWORD:
        return "password";
      case InputFieldType.EMAIL:
        return "email";
      case InputFieldType.DATE_TIME:
        return "datetime-local";
    }
  };

  const conditionalProps =
    props.type !== InputFieldType.DATE_TIME ? { value: props.text } : {};

  return (
    <React.Fragment>
      <div
        className={`input__field__container ${
          props.className ? props.className : ""
        }`}
        style={props.style}
      >
        <div className="input__field__label__container">
          <label className="input__field__label" htmlFor={props.id}>
            {props.title}
            {props.isRequired ? (
              <span
                style={{
                  color: "red",
                }}
              >
                &nbsp;*
              </span>
            ) : (
              ""
            )}
          </label>

          {props.aboutIcon ? (
            <div
              className="input__field__label__icon"
              title={props.aboutIconTitle}
            >
              {props.aboutIcon}
            </div>
          ) : null}
        </div>

        <input
          className={`input__field`}
          id={props.id}
          style={props.inputFieldStyle}
          type={getInputType(props.type)}
          onChange={props.onChange}
          placeholder={props.placeholder}
          onKeyDown={(event) => {
            if (event.key === "Enter" && props.onKeyDown) {
              props.onKeyDown(event);
            }
          }}
          disabled={props.disabled}
          {...conditionalProps}
        />
      </div>
    </React.Fragment>
  );
};

export default InputField;
