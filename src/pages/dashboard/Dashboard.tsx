import React, { useEffect } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardOverviewStats from "../../components/dashboard-overview-stats/DashboardOverviewStats";
import useAuth from "../../hooks/useAuth";
import { getCurrentDateTime } from "../../utils/apputils";
import "./Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const { getName } = useAuth();

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <div className="main__dashboard__heading">
            <div className="welcome__text">Welcome,</div>
            <div className="name__heading">{getName()}</div>
          </div>

          <div className="heading__time__section">
            <div className="heading">Dashboard</div>
            <div className="timestamp">{getCurrentDateTime()}</div>
          </div>

          <div className="stats__overview__container">
            <DashboardOverviewStats headingText="Today's Stats" />
            <DashboardOverviewStats headingText="Lifetime Stats" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
