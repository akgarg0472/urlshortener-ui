import React from "react";
import { HOME_STATISTICS, HOME_STATISTICS_DESC } from "../../constants";
import { homeStatistics, liveDataStatistics } from "../../utils/data";
import HomeHeading from "../home-heading/HomeHeading";
import LiveStatsCard from "./live-stats-card/LiveStatsCard";
import StatsCard from "./stats-card/StatsCard";

import "./HomeStatistics.css";

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

        <div className="stats__cards__container live__stats__card__container live__stats__card">
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
