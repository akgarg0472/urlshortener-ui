import React from "react";
import "./DashboardHeadSubHead.css";

interface DashboardHeadSubHeadProps {
  heading?: string;
  subheading?: string;
  centered?: boolean;
}

const DashboardHeadSubHead = (props: DashboardHeadSubHeadProps) => {
  return (
    <React.Fragment>
      <div className="dash__head__subhead__container">
        {props.heading ? (
          <div className={`heading ${props.centered ? "text__centered" : ""}`}>
            {props.heading}
          </div>
        ) : null}
        {props.subheading ? (
          <div
            className={`subheading ${props.centered ? "text__centered" : ""}`}
          >
            {props.subheading}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default DashboardHeadSubHead;
