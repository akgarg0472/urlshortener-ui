import React from "react";

import "./ChartPercentageStatsContainer.css";

type ChartPercentageStatsContainerProps = {
  data: { name: string; value: number }[];
};

const ChartPercentageStatsContainer = (
  props: ChartPercentageStatsContainerProps
) => {
  const totalValue = props.data.reduce((sum, item) => sum + item.value, 0);

  return (
    <React.Fragment>
      <div className="chart__percentage__stats__container">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Total</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>
            {props.data
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((d, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.value}</td>
                  <td>{((d.value / totalValue) * 100).toFixed(2)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default ChartPercentageStatsContainer;
