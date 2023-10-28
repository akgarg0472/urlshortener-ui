import React from "react";
import "./DropdownSelector.css";

interface DropdownSelectorProps {
  onChange: (value: string) => void;
  value: string;
  classes?: string;
  style?: React.CSSProperties;
  title: string;
  id: string;
  isRequired?: boolean;
  isOneLiner?: boolean;
  dropdownValues: DropdownDataType[];
  height?: DropdownSelectorHeight;
}

export interface DropdownDataType {
  title: string;
  value: string;
}

export enum DropdownSelectorHeight {
  LOW = "dropdown__container__low",
  MEDIUM = "dropdown__container__medium",
  HIGH = "dropdown__container__high",
}

const DropdownSelector = (props: DropdownSelectorProps) => {
  const getDropdownHeight = () => {
    switch (props.height) {
      case DropdownSelectorHeight.LOW:
        return DropdownSelectorHeight.LOW;
      case DropdownSelectorHeight.MEDIUM:
        return DropdownSelectorHeight.MEDIUM;
      case DropdownSelectorHeight.HIGH:
        return DropdownSelectorHeight.HIGH;
      default:
        return DropdownSelectorHeight.MEDIUM;
    }
  };

  return (
    <React.Fragment>
      <div
        className={`dropdown__container ${props.classes ? props.classes : ""} ${
          props.isOneLiner ? "dropdown__container__one__liner" : ""
        }`}
        style={props.style}
      >
        <label className="dropdown__label" htmlFor={props.id}>
          {props.title}{" "}
          {props.isRequired ? <span style={{ color: "red" }}>*</span> : ""}
        </label>

        <select
          className={`dropdown__select ${
            props.classes ? props.classes : ""
          } ${getDropdownHeight()}`}
          id={props.id}
          onChange={(event) => props.onChange(event.target.value)}
          value={props.value}
        >
          {props.dropdownValues.map((data, index) => {
            return (
              <option key={`dropdown__option__${index}`} value={data.value}>
                {data.title}
              </option>
            );
          })}
        </select>
      </div>
    </React.Fragment>
  );
};

export default DropdownSelector;
