import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPaypalOrder } from "../../../api/payment/payment";
import { PaypalCreateOrderResponse } from "../../../api/payment/payment.api.response";
import { LOGIN_URL, SUBSCRIPTION_PLANS_URL } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import { getCurrencySymbol } from "../../../utils/priceutils";
import { getActiveSubscriptionPackId } from "../../../utils/subscriptonUtils";
import RegularButton from "../../button/RegularButton";
import Loader from "../../loader/Loader";
import { LoaderSpeed } from "../../loader/Loader.enums";
import Modal from "../../modal/Modal";
import { ModalIcon } from "../../modal/Modal.enums";
import PlanFeature from "./plan-feature/PlanFeature";

import "./PriceCard.css";

type PlanProps = {
  name: string;
  packId: string;
  price: string;
  validity: string;
  currency: string;
  features: string[];
  selected: boolean;
  description: string;
  defaultPack: boolean;
};

const PriceCard = (plan: PlanProps) => {
  const { isUserLoggedIn, getUserId, getName, getEmail } = useAuth();
  const [activePackId, setActivePackId] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<string>("Get Started");
  const navigate = useNavigate();

  useEffect(() => {
    setActivePackId(
      isUserLoggedIn() ? getActiveSubscriptionPackId(getUserId()!) : null
    );
    setButtonText(isUserLoggedIn() ? "Buy Now" : "Get Started");
    // eslint-disable-next-line
  }, []);

  const handleButtonClick = async () => {
    if (!isUserLoggedIn()) {
      navigate(`${LOGIN_URL}?redirectTo=${SUBSCRIPTION_PLANS_URL}`, {
        replace: true,
      });
      return;
    }

    Loader.showLoader({
      speed: LoaderSpeed.HIGH,
    });

    const apiResponse: PaypalCreateOrderResponse = await createPaypalOrder({
      amount: plan.price,
      currencyCode: plan.currency,
      description: "Test payment",
      packId: plan.packId,
      paymentMethod: "Card",
      userId: getUserId()!,
      name: getName()!,
      email: getEmail(),
    });

    Loader.hideLoader();

    if (!apiResponse.success) {
      Modal.showModal({
        icon: ModalIcon.ERROR,
        message: apiResponse.errors ?? apiResponse.message,
      });
      return;
    }

    if (apiResponse.approval_url) {
      window.location.href = apiResponse.approval_url;
    }
  };

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
            {getCurrencySymbol(plan.currency)}
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
            content={plan.packId === activePackId ? "Activated" : buttonText}
            onClick={handleButtonClick}
            isDisabled={plan.defaultPack || activePackId === plan.packId}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PriceCard;
