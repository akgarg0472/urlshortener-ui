import React from "react";

import "./StatsCard.css";

type StatsCardProps = {
  metric: string;
  title: string;
  icon: string;
  iconBgColor: string;
};

const StatsCard = (props: StatsCardProps) => {
  return (
    <React.Fragment>
      <div className="stats__card">
        <span className="metric">{props.metric}</span>
        <span className="title">{props.title}</span>
        <div
          className="icon"
          style={{
            backgroundColor: props.iconBgColor,
          }}
          dangerouslySetInnerHTML={{
            __html: props.icon,
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default StatsCard;
