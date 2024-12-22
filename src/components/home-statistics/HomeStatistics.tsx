import React from "react";
import HomeHeading from "../home-heading/HomeHeading";
import { HOME_STATISTICS, HOME_STATISTICS_DESC } from "../../constants";

import "./HomeStatistics.css";
import { homeStatistics, liveDataStatistics } from "../../utils/data";
import StatsCard from "./stats-card/StatsCard";
import LiveStatsCard from "./live-stats-card/LiveStatsCard";

const HomeStatistics = () => {
  return (
    <React.Fragment>
      <div className="home__statistics__container">
        <HomeHeading
          title={HOME_STATISTICS}
          subtitle={HOME_STATISTICS_DESC}
          darkMode={true}
        />
        <div className="stats__cards__container">
          {homeStatistics.map((stats) => (
            <StatsCard
              key={stats.id}
              title={stats.title}
              metric={stats.metric}
              icon={stats.icon}
              iconBgColor={stats.iconBgColor}
            />
          ))}
        </div>

        <div className="stats__cards__container live__stats__card">
          {liveDataStatistics.map((stats) => (
            <LiveStatsCard
              key={stats.id}
              title={stats.title}
              metric={stats.metric}
              iconBgColor={stats.iconColor}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeStatistics;
