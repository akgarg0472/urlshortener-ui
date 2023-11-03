import React from "react";
import "./DashboardStatsHeading.css";

interface DashboardStatsHeadingProps {
  heading: string;
  className?: string;
}

const DashboardStatsHeading = (props: DashboardStatsHeadingProps) => {
  return (
    <React.Fragment>
      <div
        className={`dashboard__stats__heading__container ${
          props.className ? props.className : ""
        }`}
      >
        {props.heading}
      </div>
    </React.Fragment>
  );
};

export default DashboardStatsHeading;
