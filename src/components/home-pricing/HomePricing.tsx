import React, { useEffect, useState } from "react";

import { GetSubscriptionPacksResponse } from "../../api/subscription/subs.api.response";
import { getSubscriptionPacks } from "../../api/subscription/subscription";
import { HOME_PRICING, HOME_PRICING_DESC } from "../../constants";
import {
  homePricingPlans,
  PricePlanComparison,
  PricingPlan,
  pricingPlanComparison,
} from "../../utils/data";
import { getCurrencySymbol } from "../../utils/priceutils";
import HomeHeading from "../home-heading/HomeHeading";
import ComparePack from "./compare-pack/ComparePacks";
import PriceCard from "./price-card/PriceCard";

import "./HomePricing.css";

const HomePricing = (props: { showComparePlans?: boolean }) => {
  const [subscriptionPacks, setSubscriptionPacks] = useState<PricingPlan[]>([]);
  const [packComparison, setPackComparison] = useState<PricePlanComparison>({
    headers: [],
    rows: [],
  });

  useEffect(() => {
    fetchSubscriptionPacks();
    // eslint-disable-next-line
  }, []);

  const fetchSubscriptionPacks = async () => {
    const apiResponse: GetSubscriptionPacksResponse =
      await getSubscriptionPacks(props.showComparePlans);

    if (
      !apiResponse.success ||
      !apiResponse.packs ||
      !apiResponse.comparisons
    ) {
      setSubscriptionPacks(homePricingPlans);
      setPackComparison(pricingPlanComparison);
      return;
    }

    setSubscriptionPacks(
      apiResponse.packs.map((p) => {
        const pack: PricingPlan = {
          id: p.id,
          name: p.name,
          description: p.description,
          currency: getCurrencySymbol(p.currency),
          features: p.features,
          price: p.price.toString(),
          selected: p.selected,
          validity: p.validity === "month" ? "month" : "annual",
          default_plan: p.default_pack,
        };
        return pack;
      })
    );

    setPackComparison(apiResponse.comparisons);
  };

  return (
    <React.Fragment>
      <div className="home__pricing__container">
        <HomeHeading title={HOME_PRICING} subtitle={HOME_PRICING_DESC} />

        <div className="plans__container">
          {subscriptionPacks.map((plan) => (
            <PriceCard
              key={plan.id}
              name={plan.name}
              currency={plan.currency}
              price={plan.price}
              validity={plan.validity}
              features={plan.features}
              selected={plan.selected}
              description={plan.description}
              defaultPack={plan.default_plan}
            />
          ))}
        </div>

        <div className="mbg__container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="rgb(34, 197, 94)"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>

          <span>30-day money-back guarantee</span>
        </div>
      </div>

      {props.showComparePlans && <ComparePack comparisons={packComparison} />}
    </React.Fragment>
  );
};

export default HomePricing;
