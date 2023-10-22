import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Continent, Country } from "../../api/apiModals";
import { generateBarChartColorArrays } from "../../utils/colorutils";
import "./PieChart.css";

interface PieChartProps {
  data: Country[] | Continent[];
  datasetLabel: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props: PieChartProps) => {
  const [bgColors, setBgColors] = useState([] as string[]);
  const [hoverBgColors, setHoverBgColors] = useState([] as string[]);

  useEffect(() => {
    const { backgroundColor, hoverBackgroundColor } =
      generateBarChartColorArrays(props.data.length);

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
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default PieChart;
