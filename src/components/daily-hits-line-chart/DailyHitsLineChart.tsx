import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { generateChartBgAndBorderColorArrays } from "../../utils/colorutils";
import { convertTimestampToDateAndShortMonth } from "../../utils/datetimeutils";

import "./DailyHitsLineChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const DailyHitsLineChart = (props: DailyHitsLineChartProps) => {
  const [bgColor, setBgColor] = React.useState("");
  const [borderColor, setBorderColor] = React.useState("");

  useEffect(() => {
    const colors = generateChartBgAndBorderColorArrays(1);
    setBgColor(colors.backgroundColor[0]);
    setBorderColor(colors.borderColor[0]);
  }, []);

  return (
    <React.Fragment>
      <div className="daily__hits__line__chart__container">
        <Line
          id={`id__${props.datasetLabel}`}
          data={{
            labels: props.data.map((item) =>
              convertTimestampToDateAndShortMonth(item.timestamp)
            ),
            datasets: [
              {
                label: props.datasetLabel,
                data: props.data.map((item) => item.hits),
                borderColor: borderColor ? borderColor : "rgb(53, 162, 235)",
                backgroundColor: bgColor ? bgColor : "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
          options={{
            maintainAspectRatio: true,
            responsive: true,
          }}
        />
      </div>
    </React.Fragment>
  );
};
