import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { generateChartBgAndHoverColorArrays } from "../../utils/colorutils";
import "./BarChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props: BarChartProps) => {
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
      <div className="bar__chart__container">
        <Bar
          id={`id__${props.datasetLabel}`}
          data={{
            labels: props.data.map((item) => item.label),
            datasets: [
              {
                label: props.datasetLabel,
                data: props.data.map((item) => item.value),
                backgroundColor: bgColors,
                hoverBackgroundColor: hoverBgColors,
                borderWidth: props.borderWidth ? props.borderWidth : 2,
              },
            ],
          }}
          options={{
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

export default BarChart;
