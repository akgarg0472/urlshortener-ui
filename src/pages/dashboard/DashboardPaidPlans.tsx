import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/dashboard-navbar/DashboardNavbar";
import DashboardHeadSubHead from "../../components/dashboardheadsubhead/DashboardHeadSubHead";
import { DASH_PAID_PLANS_HEAD, DASH_PAID_PLANS_SUBHEAD } from "../../constants";
import PaidPlan from "../../components/paid-plan/PaidPlan";
import { PaidPlanData, dummyPremiumPlans } from "../../utils/data";
import InternalLoader from "../../components/loader/internal-loader/InternalLoader";

import "./Dashboard.css";

const DashboardPaidPlans = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [plans, setPlans] = useState<PaidPlanData[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);

    setTimeout(() => {
      setPlans(dummyPremiumPlans);
      setLoading(false);
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="dashboard__page">
        <DashboardNavbar />

        <div className="dashboard__page__content">
          <DashboardHeadSubHead
            heading={DASH_PAID_PLANS_HEAD}
            subheading={DASH_PAID_PLANS_SUBHEAD}
          />

          <div className="plans__contains">
            {loading ? (
              <InternalLoader />
            ) : (
              plans.map((plan) => (
                <PaidPlan
                  key={plan.id}
                  id={plan.id}
                  heading={plan.heading}
                  summary={plan.summary}
                  points={plan.points}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPaidPlans;
