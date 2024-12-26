import React from "react";
import "./DashboardStat.css";

type DashboardStatsProps = {
  title: string;
  value: string | number;
  suffix?: string;
};

const DashboardStat = (props: DashboardStatsProps) => {
  return (
    <React.Fragment>
      <div className="dashboard__stats__container">
        <div className="title">{props.title}</div>
        <div className="value__container">
          <span>{props.value}</span>
          {props.suffix && <span>{props.suffix}</span>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardStat;
