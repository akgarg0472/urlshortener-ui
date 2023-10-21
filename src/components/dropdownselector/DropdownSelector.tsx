import React from "react";
import "./DropdownSelector.css";

interface DropdownSelectorProps {
  onChange: (value: string) => void;
  value: string;
  classes?: string;
  type: DropdownType;
  style?: React.CSSProperties;
  title: string;
  id: string;
  isRequired?: boolean;
}

export enum DropdownType {
  COUNTRY,
  GENDER,
}

interface DropdownDataType {
  title: string;
  value: string;
}

const DropdownSelector = (props: DropdownSelectorProps) => {
  const countries: DropdownDataType[] = [
    { title: "Select a country", value: "null" },
    { title: "Australia", value: "Australia" },
    { title: "Brazil", value: "Brazil" },
    { title: "Canada", value: "Canada" },
    { title: "China", value: "China" },
    { title: "France", value: "France" },
    { title: "India", value: "India" },
    { title: "Italy", value: "Italy" },
    { title: "Mexico", value: "Mexico" },
    { title: "New Zealand", value: "New Zealand" },
    { title: "Russia", value: "Russia" },
    { title: "South Africa", value: "South Africa" },
    { title: "Spain", value: "Spain" },
    { title: "Sweden", value: "Sweden" },
    { title: "United Kingdom", value: "United Kingdom" },
    { title: "United States", value: "United States" },
  ];

  const genders: DropdownDataType[] = [
    { title: "Select Gender", value: "null" },
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
  ];

  const getDataArray = (type: DropdownType): DropdownDataType[] => {
    switch (type) {
      case DropdownType.COUNTRY:
        return countries;

      case DropdownType.GENDER:
        return genders;
    }
  };

  return (
    <React.Fragment>
      <div
        className={`dropdown__container ${props.classes}`}
        style={props.style}
      >
        <label className="dropdown__label" htmlFor={props.id}>
          {props.title}{" "}
          {props.isRequired ? <span style={{ color: "red" }}>*</span> : ""}
        </label>

        <select
          className={`dropdown__select ${props.classes}`}
          id={props.id}
          onChange={(event) => props.onChange(event.target.value)}
          value={props.value}
        >
          {getDataArray(props.type).map((data, index) => {
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
