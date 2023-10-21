import React, { useEffect } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import "./Dashboard.css";

const DashboardStatistics = () => {
  useEffect(() => {
    document.title = "Statistics";
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />
      </div>
    </React.Fragment>
  );
};

export default DashboardStatistics;
