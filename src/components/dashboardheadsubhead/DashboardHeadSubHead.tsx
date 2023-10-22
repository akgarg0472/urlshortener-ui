import React from "react";
import "./DashboardHeadSubHead.css";

interface DashboardHeadSubHeadProps {
  heading: string;
  subheading: string;
}

const DashboardHeadSubHead = (props: DashboardHeadSubHeadProps) => {
  return (
    <React.Fragment>
      <div className="dash__head__subhead__container">
        <div className="heading">{props.heading}</div>
        <div className="subheading">{props.subheading}</div>
      </div>
    </React.Fragment>
  );
};

export default DashboardHeadSubHead;
