import React from "react";
import "./DashboardOverviewStats.css";

interface DashboardOverviewStatsProps {
  headingText: string;
}

const DashboardOverviewStats = (props: DashboardOverviewStatsProps) => {
  return (
    <React.Fragment>
      <div className="dashboard__stats__overview">
        <div className="heading__txt">{props.headingText}</div>
      </div>
    </React.Fragment>
  );
};

export default DashboardOverviewStats;
