import React from "react";
import HomeNavbar from "../../components/home-navbar/HomeNavbar";
import HomePricing from "../../components/home-pricing/HomePricing";

const SubscriptionPage = () => {
  return (
    <React.Fragment>
      <HomeNavbar />
      <HomePricing showComparePlans={true} />
    </React.Fragment>
  );
};

export default SubscriptionPage;
