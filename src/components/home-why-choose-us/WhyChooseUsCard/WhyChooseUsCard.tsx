import React from "react";

import "./WhyChooseUsCard.css";

const WhyChooseUsCard = (props: WhyChooseUsCardProps) => {
  return (
    <React.Fragment>
      <div
        className={`why__choose__us__card ${
          props.rightBorder ? "wcus__right__border" : ""
        }`}
      >
        <img className="icon" src={props.icon} alt={`${props.title} icon`} />
        <h2 className="title">{props.title}</h2>
        <p className="description">{props.description}</p>
      </div>
    </React.Fragment>
  );
};

export default WhyChooseUsCard;
