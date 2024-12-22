import React from "react";

import "./HomePricing.css";
import HomeHeading from "../home-heading/HomeHeading";
import { HOME_PRICING, HOME_PRICING_DESC } from "../../constants";
import { homePricingPlans } from "../../utils/data";
import PriceCard from "./price-card/PriceCard";

const HomePricing = () => {
  return (
    <React.Fragment>
      <div className="home__pricing__container">
        <HomeHeading title={HOME_PRICING} subtitle={HOME_PRICING_DESC} />

        <div className="plans__container">
          {homePricingPlans.map((plan) => (
            <PriceCard
              key={plan.id}
              name={plan.name}
              currency={plan.currency}
              price={plan.price}
              features={plan.features}
              selected={plan.selected}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePricing;
