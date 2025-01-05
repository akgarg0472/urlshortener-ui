import React, { useEffect, useState } from "react";

import { calculatePercentChange } from "../../utils/percentageChangeUtils";
import "./DashboardStat.css";

type DashboardStatsProps = {
  title: string;
  value: string | number;
  suffix?: string;
  prevDayValue?: string;
};

const DashboardStat = (props: DashboardStatsProps) => {
  const [percentChange, setPercentChange] = useState<string | null>(null);
  const [percentChangeDirection, setPercentChangeDirection] =
    useState<number>(0);
  const [percentageChangeClassName, setPercentChangeClassName] =
    useState<string>("");

  useEffect(() => {
    const percentageCalculationResult = calculatePercentChange(
      props.value,
      props.prevDayValue
    );

    if (percentageCalculationResult) {
      setPercentChange(percentageCalculationResult.percentage);
      setPercentChangeDirection(percentageCalculationResult.direction);
      setPercentChangeClassName(
        percentageCalculationResult.direction === 0
          ? "percentage__no__change"
          : percentageCalculationResult.direction < 0
            ? "percentage__change__decrease"
            : "percentage__change__increase"
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard__stats__container">
        <div className="title__pc__container">
          <div className="title">{props.title}</div>

          {percentChange && (
            <div className={`percentage__change ${percentageChangeClassName}`}>
              <span className="percentage">{percentChange}</span>

              {percentChangeDirection >= 0 ? (
                <span className="direction__arrow">&#x2191;</span>
              ) : (
                <span className="direction__arrow">&#x2193;</span>
              )}
            </div>
          )}
        </div>

        <div className="value__container">
          <span>{props.value}</span>
          {props.suffix && <span>{props.suffix}</span>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardStat;
