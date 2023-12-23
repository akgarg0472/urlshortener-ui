import React from "react";
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
    }
  };

  return (
    <React.Fragment>
      <div
        className={`input__field__container ${
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
          type={getInputType(props.type)}
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

export default InputField;
