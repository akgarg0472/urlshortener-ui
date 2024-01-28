import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { generateChartBgAndHoverColorArrays } from "../../utils/colorutils";
import "./PieChart.css";
import { Continent, Country } from "../../api/dashboard/dashboard.api.modal";

interface PieChartProps {
  data: Country[] | Continent[] | any[];
  datasetLabel: string;
  legendPosition: "top" | "bottom" | "left" | "right";
  borderWidth?: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props: PieChartProps) => {
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
      <div className="pie__chart__container">
        <Pie
          id={`id__${props.datasetLabel}`}
          data={{
            labels: props.data.map((item) => item.name),
            datasets: [
              {
                data: props.data.map((item) => item.hits_count),
                backgroundColor: bgColors,
                hoverBackgroundColor: hoverBgColors,
                borderWidth: props.borderWidth ? props.borderWidth : 2,
              },
            ],
          }}
          options={{
            // responsive: true,
            // maintainAspectRatio: true,
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

export default PieChart;
