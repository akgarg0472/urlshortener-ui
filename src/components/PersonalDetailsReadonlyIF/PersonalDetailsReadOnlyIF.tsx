import React from "react";
import "./PersonalDetailsReadOnlyIF.css";

interface PersonalDetailsReadOnlyIFProps {
  title: string;
  text: string;
  className?: string;
  id: string;
  style?: React.CSSProperties;
}

const PersonalDetailsReadOnlyIF = (props: PersonalDetailsReadOnlyIFProps) => {
  return (
    <React.Fragment>
      <div
        className={`personal__details__readonly__input__field__container ${
          props.className ? props.className : ""
        }`}
        style={props.style}
      >
        <label className="input__field__label" htmlFor={props.id}>
          {props.title}
        </label>

        <div className={`input__field`} id={props.id}>
          {props.text}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalDetailsReadOnlyIF;
