import React from "react";
import "./DashboardOverviewStats.css";
import IconStats from "./stats-with-icon/IconStats";

interface DashboardOverviewStatsProps {
  headingText: string;
  data: Stat[];
}

interface Stat {
  icon: string;
  label: string;
  value: string;
}

const DashboardOverviewStats = (props: DashboardOverviewStatsProps) => {
  return (
    <React.Fragment>
      <div className="dashboard__stats__overview">
        <div className="heading__txt">{props.headingText}</div>

        <div className="stats__container">
          {props.data.map((stat: Stat, index: number) => (
            <IconStats
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              key={index}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardOverviewStats;
