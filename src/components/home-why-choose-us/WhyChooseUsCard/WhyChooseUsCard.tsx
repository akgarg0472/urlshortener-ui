import React from "react";

import "./WhyChooseUsCard.css";

const WhyChooseUsCard = (props: WhyChooseUsCardProps) => {
  return (
    <React.Fragment>
      <div className="why__choose__us__card">
        <div
          className="icon"
          style={{
            backgroundColor: props.iconBgColor,
          }}
          dangerouslySetInnerHTML={{
            __html: props.icon,
          }}
        />

        <h2 className="title">{props.title}</h2>
        <p className="description">{props.description}</p>
      </div>
    </React.Fragment>
  );
};

export default WhyChooseUsCard;
