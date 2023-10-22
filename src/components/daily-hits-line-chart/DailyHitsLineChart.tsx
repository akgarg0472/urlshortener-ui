import React from "react";
import { Line } from "react-chartjs-2";
import { PrevSevenDaysHit } from "../../api/apiModals";
import { convertTimestampToDate } from "../../utils/datetimeutils";
import "./DailyHitsLineChart.css";

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

interface DailyHitsLineChartProps {
  data: PrevSevenDaysHit[];
  datasetLabel: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailyHitsLineChart = (props: DailyHitsLineChartProps) => {
  return (
    <React.Fragment>
      <div className="daily__hits__line__chart__container">
        <Line
          id={`id__${props.datasetLabel}`}
          data={{
            labels: props.data.map((item) =>
              convertTimestampToDate(item.timestamp)
            ),
            datasets: [
              {
                label: props.datasetLabel,
                data: props.data.map((item) => item.hits),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default DailyHitsLineChart;
