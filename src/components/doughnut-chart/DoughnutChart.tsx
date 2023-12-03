import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { generateChartBgAndHoverColorArrays } from "../../utils/colorutils";

import "./DoughnutChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: DoughnutChartData[];
  datasetLabel: string;
  legendPosition: "top" | "bottom" | "left" | "right";
  borderWidth?: number;
}

interface DoughnutChartData {
  label: string;
  value: string | number;
}

const DoughnutChart = (props: DoughnutChartProps) => {
  const [bgColors, setBgColors] = useState([] as string[]);
  const [hoverBgColors, setHoverBgColors] = useState([] as string[]);

  useEffect(() => {
    const { backgroundColor, hoverBackgroundColor } =
      generateChartBgAndHoverColorArrays(props.data.length);
    setBgColors(backgroundColor);
    setHoverBgColors(hoverBackgroundColor);
  }, [props.data]);

  return (
    <React.Fragment>
      <div className="doughnut__chart__container">
        <Doughnut
          id={`id__${props.datasetLabel}`}
          data={{
            labels: props.data.map((item) => item.label),
            datasets: [
              {
                data: props.data.map((item) => item.value),
                backgroundColor: bgColors,
                hoverBackgroundColor: hoverBgColors,
                borderWidth: props.borderWidth ? props.borderWidth : 2,
              },
            ],
          }}
          options={{
            interaction: {
              mode: "nearest",
            },
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: true,
                position: props.legendPosition,
              },
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default DoughnutChart;
