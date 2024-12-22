import React from "react";

type LiveStatsCardProps = {
  metric: string;
  title: string;
  iconBgColor: string;
};

const LiveStatsCard = (props: LiveStatsCardProps) => {
  return (
    <React.Fragment>
      <div className="stats__card">
        <span className="metric">{props.metric}</span>
        <div className="live__title">
          <span
            className="dot"
            style={{
              backgroundColor: props.iconBgColor,
            }}
          />
          <span className="title">{props.title}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LiveStatsCard;
