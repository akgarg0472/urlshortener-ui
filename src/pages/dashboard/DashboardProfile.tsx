import React, { useEffect } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import "./Dashboard.css";

const DashboardProfile = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content"></div>
      </div>
    </React.Fragment>
  );
};

export default DashboardProfile;
