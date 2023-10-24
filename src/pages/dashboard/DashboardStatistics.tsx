import React, { useEffect } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import {
  DASH_STATISTICS_HEAD,
  DASH_STATISTICS_SUBHEAD,
} from "../../utils/constants";
import "./Dashboard.css";

const DashboardStatistics = () => {
  useEffect(() => {
    document.title = "Statistics";
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <DashboardHeadSubHead
            heading={DASH_STATISTICS_HEAD}
            subheading={DASH_STATISTICS_SUBHEAD}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardStatistics;
