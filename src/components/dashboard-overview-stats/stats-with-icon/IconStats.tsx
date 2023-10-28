import React from "react";
import "./IconStats.css";

const IconStats = (props: {
  icon: string;
  label: string;
  value: string | number;
}) => {
  return (
    <React.Fragment>
      <div className="icon__stats__container">
        <div className="img__container">
          <img src={props.icon} alt={`${props.label}__icon`} />
        </div>

        <div className="data__stats__container">
          <div className="value__cont">{props.value}</div>
          <div className="label__cont">{props.label}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IconStats;
