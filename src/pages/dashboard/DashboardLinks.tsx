import React, { useEffect } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import "./Dashboard.css";

const DashboardLinks = () => {
  useEffect(() => {
    document.title = "My Links";
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />
      </div>
    </React.Fragment>
  );
};

export default DashboardLinks;
