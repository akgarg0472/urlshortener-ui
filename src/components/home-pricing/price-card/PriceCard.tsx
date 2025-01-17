import React from "react";
import Swal from "sweetalert2";
import RegularButton from "../../button/RegularButton";
import "./PriceCard.css";
import PlanFeature from "./plan-feature/PlanFeature";

type PlanProps = {
  name: string;
  price: string;
  validity: string;
  currency: string;
  features: string[];
  selected: boolean;
  description: string;
  defaultPack: boolean;
};

const PriceCard = (plan: PlanProps) => {
  return (
    <React.Fragment>
      <div
        className={`price__card ${
          plan.selected ? "price__card__selected" : ""
        }`}
        title={plan.description}
      >
        <span className="plan__name">{plan.name}</span>
        <div className="price">
          <span className="amount">
            {plan.currency}
            {plan.price}
          </span>
          <span className="duration">/{plan.validity}</span>
        </div>

        <div className="features__container">
          {plan.features.map((feature) => (
            <PlanFeature key={feature} text={feature} />
          ))}
        </div>

        <div className="get__started__btn__container">
          <RegularButton
            className="get__started__btn"
            content="Get Started"
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "Launching soon",
                text: "We'll be launching this feature very soon. Stay tuned!",
              })
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PriceCard;
