import React from "react";
import { useNavigate } from "react-router-dom";

import "./UpgradePlan.css";

interface UpgradePlanProps {
  blurredContent: React.ReactNode;
}

const UpgradePlan: React.FC<UpgradePlanProps> = ({ blurredContent }) => {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate("/plans");
  };

  return (
    <div className="upgrade__plan__container">
      <div className="blurred__section">{blurredContent}</div>
      <div className="content__overlay">
        <div className="body">
          <span>Premium Feature</span>
          <button onClick={handleUpgradeClick}>Upgrade Plan</button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
