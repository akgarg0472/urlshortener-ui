import React from "react";

import {
  HOME_COMPARE_PLAN,
  HOME_COMPARE_PLAN_SUBHEAD,
} from "../../../constants";
import { PricePlanComparison } from "../../../utils/data";
import HomeHeading from "../../home-heading/HomeHeading";

import "./ComparePack.css";
import { CheckIcon } from "./icons/CheckIcon";
import { CrossIcon } from "./icons/CrossIcon";

const ComparePack = (props: { comparisons: PricePlanComparison }) => {
  return (
    <React.Fragment>
      <div className="compare__plans__container">
        <HomeHeading
          title={HOME_COMPARE_PLAN}
          subtitle={HOME_COMPARE_PLAN_SUBHEAD}
          darkMode={true}
        />

        <div className="plans__table__container">
          <table className="plans__table">
            <thead>
              <tr>
                {props.comparisons.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {props.comparisons.rows.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {row.map((r, idx) => {
                      if (!r) {
                        return (
                          <td key={idx}>
                            <CrossIcon />
                          </td>
                        );
                      }

                      if (typeof r === "boolean") {
                        if (!r) {
                          return (
                            <td key={idx}>
                              <CrossIcon />
                            </td>
                          );
                        } else {
                          return (
                            <td key={idx}>
                              <CheckIcon />
                            </td>
                          );
                        }
                      } else if (typeof r === "string") {
                        return (
                          <td key={idx}>
                            {r
                              .split(" ")
                              .map(
                                (s) =>
                                  s.substring(0, 1).toUpperCase() +
                                  s.substring(1)
                              )
                              .join(" ")}
                          </td>
                        );
                      }

                      return <td key={idx}>{r}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ComparePack;
