import React from "react";
import "./PriceCard.css";
import PlanFeature from "./plan-feature/PlanFeature";
import RegularButton from "../../button/RegularButton";
import Swal from "sweetalert2";

type PlanProps = {
  name: string;
  price: string;
  currency: string;
  features: string[];
  selected: boolean;
};

const PriceCard = (plan: PlanProps) => {
  return (
    <React.Fragment>
      <div
        className={`price__card ${
          plan.selected ? "price__card__selected" : ""
        }`}
      >
        <span className="plan__name">{plan.name}</span>
        <div className="price">
          <span className="amount">
            {plan.currency}
            {plan.price}
          </span>
          <span className="duration">/month</span>
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
