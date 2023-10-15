import React from "react";
import "./InputField.css";

interface InputFieldProps {
  title: string;
  text: string;
  type: InputFieldType;
  placeholder: string;
  className: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export enum InputFieldType {
  TEXT,
  PASSWORD,
}

const InputField = (props: InputFieldProps) => {
  return (
    <React.Fragment>
      <div
        className={`input__field__container ${props.className}`}
        style={props.style}
      >
        <label className="input__field__label" htmlFor={props.id}>
          {props.title}
        </label>

        <input
          className={`input__field`}
          id={props.id}
          type={props.type === InputFieldType.TEXT ? "text" : "password"}
          onChange={props.onChange}
          placeholder={props.placeholder}
          value={props.text}
        />
      </div>
    </React.Fragment>
  );
};

export default InputField;
