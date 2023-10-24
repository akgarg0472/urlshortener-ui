import React, { useEffect } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import { DASH_PROFILE_HEAD, DASH_PROFILE_SUBHEAD } from "../../utils/constants";
import "./Dashboard.css";

const DashboardProfile = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <DashboardHeadSubHead
            heading={DASH_PROFILE_HEAD}
            subheading={DASH_PROFILE_SUBHEAD}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardProfile;
