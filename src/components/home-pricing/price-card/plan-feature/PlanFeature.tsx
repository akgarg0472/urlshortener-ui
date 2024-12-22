import React from "react";
import "./PlanFeature.css";

const PlanFeature = (props: { text: string }) => {
  return (
    <React.Fragment>
      <div className="plan__feature">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#35ab3f"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>

        <span>{props.text}</span>
      </div>
    </React.Fragment>
  );
};

export default PlanFeature;
