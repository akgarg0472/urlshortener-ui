import React, { useState } from "react";
import RegularButton from "../button/RegularButton";

import "./PaidPlan.css";
import { getPublicApiKey } from "../../api/payment/payment";

const PaidPlan = (props: PaidPlanProps) => {
  const [apiOperation, setApiOperation] = useState<boolean>(false);

  const handleButtonClick = async (e: React.MouseEvent) => {
    setApiOperation(true);
    setApiOperation(true);
    await getPublicApiKey("stripe");
    setApiOperation(false);
  };

  return (
    <React.Fragment>
      <div className="plan__card">
        <h2>{props.heading}</h2>
        <h4>{props.summary}</h4>

        <div>
          {props.points.map((point, idx) => (
            <p key={`${props.id}-${idx}`}>{point}</p>
          ))}
        </div>

        <RegularButton
          className=""
          content="Subscribe"
          onClick={handleButtonClick}
          isDisabled={apiOperation}
        />
      </div>
    </React.Fragment>
  );
};

export default PaidPlan;
